module.exports = {
  apps: [
    {
      name: "urbanesta-frontend",
      script: "node",
      args: ".next/standalone/server.js",
      cwd: process.cwd(),
      env: {
        PORT: 3012,
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1"
      },
      env_production: {
        PORT: 3012,
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1"
      },
      // Load environment variables from .env.production if it exists
      env_file: ".env.production",
      // PM2 configuration
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      // Restart configuration
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
      // Health monitoring
      health_check_grace_period: 3000,
      // Process management
      kill_timeout: 5000,
      listen_timeout: 3000,
      // Auto restart on file changes (disabled for production)
      ignore_watch: ["node_modules", "logs", ".git"],
    }
  ]
};
