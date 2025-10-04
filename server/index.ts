import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

(async () => {
  await initializeData();
  
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

async function initializeData() {
  const existingItems = await storage.menuItems.getAll();
  if (existingItems.length === 0) {
    const menuData = [
      {
        name: "Tacos Classique",
        description: "Viande hachée, fromage, salade, tomates, sauce fromagère",
        price: 8.50,
        category: "tacos" as const,
        imageUrl: "/src/assets/food-tacos-grid.jpg",
        isAvailable: true,
        rating: 4.5,
        reviewCount: 123
      },
      {
        name: "Tacos Poulet",
        description: "Poulet grillé, fromage, légumes frais, sauce andalouse",
        price: 9.00,
        category: "tacos" as const,
        imageUrl: "/src/assets/food-tacos-grid.jpg",
        isAvailable: true,
        rating: 4.7,
        reviewCount: 156
      },
      {
        name: "Burger Classique",
        description: "Bœuf, fromage, salade, tomates, oignons, sauce burger",
        price: 10.50,
        category: "burgers" as const,
        imageUrl: "/src/assets/food-burger.jpg",
        isAvailable: true,
        rating: 4.3,
        reviewCount: 89
      },
      {
        name: "Salade César",
        description: "Poulet grillé, parmesan, croûtons, sauce césar",
        price: 9.50,
        category: "salads" as const,
        imageUrl: "/src/assets/food-salad.jpg",
        isAvailable: true,
        rating: 4.2,
        reviewCount: 67
      },
      {
        name: "Frites Chargées",
        description: "Frites croustillantes avec fromage fondu et bacon",
        price: 6.50,
        category: "desserts" as const,
        imageUrl: "/src/assets/food-fries-loaded.jpg",
        isAvailable: true,
        rating: 4.6,
        reviewCount: 145
      },
      {
        name: "Burrito Bowl",
        description: "Riz, haricots, poulet, guacamole, fromage, salsa",
        price: 11.00,
        category: "burgers" as const,
        imageUrl: "/src/assets/food-burrito.jpg",
        isAvailable: true,
        rating: 4.8,
        reviewCount: 201
      }
    ];

    for (const item of menuData) {
      await storage.menuItems.create(item);
    }

    await storage.restaurants.create({
      name: "Tacos Avenue - Paris Centre",
      address: "123 Boulevard Saint-Germain, 75006 Paris",
      phone: "+33 1 42 34 56 78",
      isActive: true
    });

    console.log("✓ Initialized menu items and restaurant data");
  }
}
