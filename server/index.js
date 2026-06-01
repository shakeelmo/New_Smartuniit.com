import compression from "compression";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import express from "express";

const app = express();
const port = Number(process.env.PORT || 4179);
const rootDir = path.resolve(process.cwd());
const dataDir = process.env.DATA_DIR || path.join(rootDir, "data");
const contentPath = path.join(dataDir, "content.json");
const leadsPath = path.join(dataDir, "leads.json");
const distDir = path.join(rootDir, "dist");
const adminUser = process.env.ADMIN_USER || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin");
const adminSecret = process.env.ADMIN_SECRET || crypto.randomBytes(32).toString("hex");

app.use(compression());
app.use(express.json({ limit: "1mb" }));

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await ensureDataDir();
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sign(payload) {
  return crypto.createHmac("sha256", adminSecret).update(payload).digest("base64url");
}

function createToken(username) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      exp: Date.now() + 1000 * 60 * 60 * 12
    })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  if (signature !== sign(payload)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!verifyToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "new-smartuniit", time: new Date().toISOString() });
});

app.get("/api/content", async (_req, res) => {
  try {
    const content = await fs.readFile(contentPath, "utf8");
    res.type("json").send(content);
  } catch {
    res.status(404).json({ error: "No custom content saved yet" });
  }
});

app.put("/api/content", requireAdmin, async (req, res) => {
  const content = req.body;
  if (!content?.hero?.title || !Array.isArray(content?.services) || !Array.isArray(content?.posts)) {
    return res.status(400).json({ error: "Invalid content payload" });
  }
  await writeJson(contentPath, content);
  res.json({ ok: true });
});

app.post("/api/leads", async (req, res) => {
  const lead = req.body || {};
  const required = ["name", "company", "email", "phone", "service"];
  const missing = required.filter((field) => !String(lead[field] || "").trim());
  if (missing.length) {
    return res.status(400).json({ error: `Missing ${missing.join(", ")}` });
  }
  const leads = await readJson(leadsPath, []);
  const savedLead = {
    id: crypto.randomUUID(),
    name: String(lead.name).slice(0, 160),
    company: String(lead.company).slice(0, 160),
    email: String(lead.email).slice(0, 200),
    phone: String(lead.phone).slice(0, 80),
    service: String(lead.service).slice(0, 160),
    message: String(lead.message || "").slice(0, 3000),
    createdAt: new Date().toISOString()
  };
  leads.unshift(savedLead);
  await writeJson(leadsPath, leads.slice(0, 1000));
  res.status(201).json({ ok: true, id: savedLead.id });
});

app.post("/api/admin/login", (req, res) => {
  if (!adminPassword) {
    return res.status(503).json({ error: "ADMIN_PASSWORD is not configured" });
  }
  const { username, password } = req.body || {};
  if (username === adminUser && password === adminPassword) {
    return res.json({ token: createToken(username) });
  }
  res.status(401).json({ error: "Invalid username or password" });
});

app.get("/api/admin/leads", requireAdmin, async (_req, res) => {
  res.json(await readJson(leadsPath, []));
});

app.use(express.static(distDir, { maxAge: "1h", etag: true }));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, "127.0.0.1", () => {
  console.log(`new-smartuniit listening on http://127.0.0.1:${port}`);
});
