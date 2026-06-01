module.exports = {
  apps: [
    {
      name: "new-smartuniit",
      script: "server/index.js",
      cwd: "/opt/new-smartuniit",
      env: {
        NODE_ENV: "production",
        PORT: "4179",
        DATA_DIR: "/opt/new-smartuniit/data"
      }
    }
  ]
};
