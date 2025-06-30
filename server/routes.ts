import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // In a real implementation, you would save to database
      // For now, we'll just log the contact submission
      console.log("Contact form submission:", contactData);
      
      // Here you would typically:
      // 1. Save to database using storage.createContact(contactData)
      // 2. Send confirmation email
      // 3. Notify gym staff
      
      res.json({ 
        success: true, 
        message: "Mensaje enviado correctamente. Te contactaremos pronto." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
