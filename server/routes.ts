import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  insertContactSchema, 
  insertBookingSchema, 
  insertMemberNoteSchema,
  insertClassSchema,
  insertClassScheduleSchema 
} from "@shared/schema";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission (backward compatibility)
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      await storage.createContact(contactData);
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

  // Chatbot booking request
  app.post("/api/chatbot/booking", async (req, res) => {
    try {
      const { customerName, customerEmail, customerPhone, discipline, preferredTime, message } = req.body;
      
      // Create a booking request through contact form
      const bookingContact = await storage.createContact({
        name: customerName,
        email: customerEmail,
        phone: customerPhone || '',
        discipline: discipline,
        message: `RESERVA VIA CHATBOT - Horario preferido: ${preferredTime}\nMensaje: ${message || 'Sin mensaje adicional'}`
      });

      res.status(201).json({ 
        success: true,
        message: "Solicitud de reserva enviada exitosamente", 
        bookingId: bookingContact.id,
        confirmationMessage: `¡Perfecto! Tu solicitud de reserva ha sido enviada.\n\n📋 Detalles:\n• Disciplina: ${discipline}\n• Horario: ${preferredTime}\n• Contacto: ${customerEmail}\n\nTe contactaremos en menos de 24 horas para confirmar tu clase gratuita. ¡Nos vemos pronto en Kaizen! 🥋`
      });
    } catch (error: any) {
      console.error("Error creating booking:", error);
      res.status(400).json({ success: false, message: "Error al procesar la reserva", error: error.message });
    }
  });

  // Class management routes
  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ message: "Error fetching classes" });
    }
  });

  app.get("/api/classes/:id", async (req, res) => {
    try {
      const classId = parseInt(req.params.id);
      const classData = await storage.getClass(classId);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      console.error("Error fetching class:", error);
      res.status(500).json({ message: "Error fetching class" });
    }
  });

  app.post("/api/classes", isAuthenticated, async (req, res) => {
    try {
      const classData = insertClassSchema.parse(req.body);
      const newClass = await storage.createClass(classData);
      res.json(newClass);
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(400).json({ message: "Error creating class" });
    }
  });

  // Class schedules routes
  app.get("/api/schedules", async (req, res) => {
    try {
      const classId = req.query.classId ? parseInt(req.query.classId as string) : undefined;
      const schedules = await storage.getClassSchedules(classId);
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      res.status(500).json({ message: "Error fetching schedules" });
    }
  });

  app.get("/api/schedules/day/:day", async (req, res) => {
    try {
      const dayOfWeek = parseInt(req.params.day);
      const schedules = await storage.getSchedulesByDay(dayOfWeek);
      res.json(schedules);
    } catch (error) {
      console.error("Error fetching day schedules:", error);
      res.status(500).json({ message: "Error fetching day schedules" });
    }
  });

  app.post("/api/schedules", isAuthenticated, async (req, res) => {
    try {
      const scheduleData = insertClassScheduleSchema.parse(req.body);
      const newSchedule = await storage.createClassSchedule(scheduleData);
      res.json(newSchedule);
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(400).json({ message: "Error creating schedule" });
    }
  });

  // Booking routes
  app.get("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookingData = insertBookingSchema.parse({ ...req.body, userId });
      
      // Check capacity before booking
      const existingBookings = await storage.getClassBookings(
        bookingData.scheduleId, 
        bookingData.bookingDate
      );
      
      // You could add capacity check here
      const newBooking = await storage.createBooking(bookingData);
      res.json(newBooking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ message: "Error creating booking" });
    }
  });

  app.delete("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const success = await storage.cancelBooking(bookingId);
      if (success) {
        res.json({ message: "Booking cancelled successfully" });
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ message: "Error cancelling booking" });
    }
  });

  // Gym capacity routes
  app.get("/api/capacity", async (req, res) => {
    try {
      const capacity = await storage.getCurrentCapacity();
      res.json(capacity || { currentCount: 0, maxCapacity: 50 });
    } catch (error) {
      console.error("Error fetching capacity:", error);
      res.status(500).json({ message: "Error fetching capacity" });
    }
  });

  app.post("/api/capacity", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const capacityData = { ...req.body, updatedBy: userId };
      const newCapacity = await storage.updateCapacity(capacityData);
      res.json(newCapacity);
    } catch (error) {
      console.error("Error updating capacity:", error);
      res.status(400).json({ message: "Error updating capacity" });
    }
  });

  // Member notes routes
  app.get("/api/members/:memberId/notes", isAuthenticated, async (req, res) => {
    try {
      const memberId = req.params.memberId;
      const notes = await storage.getMemberNotes(memberId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching member notes:", error);
      res.status(500).json({ message: "Error fetching member notes" });
    }
  });

  app.post("/api/members/:memberId/notes", isAuthenticated, async (req: any, res) => {
    try {
      const memberId = req.params.memberId;
      const authorId = req.user.claims.sub;
      const noteData = insertMemberNoteSchema.parse({ 
        ...req.body, 
        memberId, 
        authorId 
      });
      const newNote = await storage.createMemberNote(noteData);
      res.json(newNote);
    } catch (error) {
      console.error("Error creating member note:", error);
      res.status(400).json({ message: "Error creating member note" });
    }
  });

  // Check-in routes
  app.get("/api/checkins", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const checkIns = await storage.getMemberCheckIns(userId);
      res.json(checkIns);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
      res.status(500).json({ message: "Error fetching check-ins" });
    }
  });

  app.post("/api/checkins", isAuthenticated, async (req: any, res) => {
    try {
      const memberId = req.user.claims.sub;
      const checkInData = { ...req.body, memberId };
      const newCheckIn = await storage.createCheckIn(checkInData);
      res.json(newCheckIn);
    } catch (error) {
      console.error("Error creating check-in:", error);
      res.status(400).json({ message: "Error creating check-in" });
    }
  });

  app.patch("/api/checkins/:id/checkout", isAuthenticated, async (req, res) => {
    try {
      const checkInId = parseInt(req.params.id);
      const success = await storage.updateCheckOut(checkInId);
      if (success) {
        res.json({ message: "Check-out updated successfully" });
      } else {
        res.status(404).json({ message: "Check-in not found" });
      }
    } catch (error) {
      console.error("Error updating check-out:", error);
      res.status(500).json({ message: "Error updating check-out" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
