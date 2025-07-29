module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "backend",
      cwd: "./api",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "ai",
      cwd: "./ai",
      script: "python3",
      args: "app.py",
      env: {
        PORT: 8000,
        PYTHONPATH: "/workspace",
      },
    },
  ],
};
