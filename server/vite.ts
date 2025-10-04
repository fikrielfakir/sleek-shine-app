import type { Express } from "express";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";
import express from "express";

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "spa",
  });

  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = require("path").resolve(__dirname, "..", "dist");
  
  if (!require("fs").existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(require("path").resolve(distPath, "index.html"));
  });
}
