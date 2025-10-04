import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema, insertOrderSchema, insertOrderItemSchema, insertUserSchema } from "../shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  app.get("/api/menu", async (_req, res) => {
    const items = await storage.menuItems.getAll();
    res.json(items);
  });

  app.get("/api/menu/category/:category", async (req, res) => {
    const items = await storage.menuItems.getByCategory(req.params.category);
    res.json(items);
  });

  app.get("/api/menu/:id", async (req, res) => {
    const item = await storage.menuItems.getById(parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(item);
  });

  app.post("/api/menu", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.menuItems.create(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  app.patch("/api/menu/:id", async (req, res) => {
    try {
      const item = await storage.menuItems.update(parseInt(req.params.id), req.body);
      if (!item) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  app.delete("/api/menu/:id", async (req, res) => {
    const success = await storage.menuItems.delete(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(204).send();
  });

  app.get("/api/orders", async (_req, res) => {
    const orders = await storage.orders.getAll();
    res.json(orders);
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.orders.getById(parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const items = await storage.orderItems.getByOrderId(order.id);
    res.json({ ...order, items });
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { items, ...orderData } = req.body;
      const validatedOrder = insertOrderSchema.parse(orderData);
      
      const order = await storage.orders.create(validatedOrder);
      
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.orderItems.create({
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
            notes: item.notes
          });
        }
      }

      const orderItems = await storage.orderItems.getByOrderId(order.id);
      res.status(201).json({ ...order, items: orderItems });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const order = await storage.orders.updateStatus(parseInt(req.params.id), status);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  });

  app.get("/api/restaurants", async (_req, res) => {
    const restaurants = await storage.restaurants.getAll();
    res.json(restaurants);
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await storage.users.getByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    res.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    });
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.users.getByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.users.create(validatedData);
      res.status(201).json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role 
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.get("/api/analytics/sales", async (_req, res) => {
    const orders = await storage.orders.getAll();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const completedOrders = orders.filter(o => o.status === "completed").length;
    const avgOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;

    res.json({
      totalRevenue,
      totalOrders: orders.length,
      completedOrders,
      avgOrderValue,
      ordersByStatus: orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
