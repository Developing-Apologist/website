const { defineConfig } = require("cypress");
const { spawn } = require("child_process");
const http = require("http");
const https = require("https");
const { URL } = require("url");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    video: false,
    async setupNodeEvents(on, config) {
      let serverProcess;
      let serverReadyPromise;

      const waitForServer = (targetUrl, timeout = 60000) => {
        const started = Date.now();
        const url = new URL(targetUrl);
        const client = url.protocol === "https:" ? https : http;

        return new Promise((resolve, reject) => {
          const tryConnect = () => {
            const req = client.get(
              {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname === "" ? "/" : url.pathname,
                timeout: 2000,
              },
              (res) => {
                res.resume();
                resolve();
              }
            );

            req.on("error", () => {
              if (Date.now() - started > timeout) {
                reject(new Error(`Timed out waiting for ${targetUrl}`));
              } else {
                setTimeout(tryConnect, 750);
              }
            });
          };

          tryConnect();
        });
      };

      const startServer = async () => {
        if (serverReadyPromise) {
          return serverReadyPromise;
        }

        const baseUrl = config.baseUrl || "http://localhost:8080";

        serverReadyPromise = new Promise((resolve, reject) => {
          serverProcess = spawn("npm", ["run", "start"], {
            stdio: "inherit",
            shell: process.platform === "win32",
            env: { ...process.env },
          });

          serverProcess.once("error", (err) => {
            reject(err);
          });

          waitForServer(baseUrl)
            .then(resolve)
            .catch((err) => {
              reject(err);
            });
        });

        return serverReadyPromise;
      };

      const stopServer = async () => {
        if (!serverProcess) {
          return;
        }

        await new Promise((resolve) => {
          const killTimer = setTimeout(resolve, 5000);

          serverProcess.once("exit", () => {
            clearTimeout(killTimer);
            resolve();
          });

          serverProcess.kill("SIGTERM");
        });

        serverProcess = undefined;
        serverReadyPromise = undefined;
      };

      await startServer();

      on("after:run", async () => {
        await stopServer();
      });

      process.on("exit", () => {
        if (serverProcess) {
          serverProcess.kill("SIGTERM");
        }
      });

      process.on("SIGINT", () => {
        if (serverProcess) {
          serverProcess.kill("SIGTERM");
        }
        process.exit();
      });

      return config;
    },
  },
});
