import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  insertContactSchema, 
  insertBookingSchema, 
  insertMemberNoteSchema,
  insertClassSchema,
  insertClassScheduleSchema,
  insertProductSchema,
  insertOrderSchema,
  insertSpaceRentalSchema,
  insertSpaceBookingSchema,
  insertDailyAttendanceSchema,
  insertCommunityPostSchema,
  insertPostLikeSchema,
  insertMemberAchievementSchema
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

  // E-commerce routes
  
  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Error fetching product" });
    }
  });

  app.post("/api/products", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Error creating product" });
    }
  });

  app.patch("/api/products/:id", isAuthenticated, async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const updateData = req.body;
      const product = await storage.updateProduct(productId, updateData);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ message: "Error updating product" });
    }
  });

  // Orders routes
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ message: "Error creating order" });
    }
  });

  // Space rental routes
  app.get("/api/space-rentals", async (req, res) => {
    try {
      const rentals = await storage.getSpaceRentals();
      res.json(rentals);
    } catch (error) {
      console.error("Error fetching space rentals:", error);
      res.status(500).json({ message: "Error fetching space rentals" });
    }
  });

  app.post("/api/space-rentals", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertSpaceRentalSchema.parse(req.body);
      const rental = await storage.createSpaceRental(validatedData);
      res.status(201).json(rental);
    } catch (error) {
      console.error("Error creating space rental:", error);
      res.status(400).json({ message: "Error creating space rental" });
    }
  });

  // Space booking routes
  app.get("/api/space-bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserSpaceBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching space bookings:", error);
      res.status(500).json({ message: "Error fetching space bookings" });
    }
  });

  app.post("/api/space-bookings", async (req, res) => {
    try {
      const validatedData = insertSpaceBookingSchema.parse(req.body);
      const booking = await storage.createSpaceBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating space booking:", error);
      res.status(400).json({ message: "Error creating space booking" });
    }
  });

  // Community features API routes

  // Daily attendance routes
  app.get("/api/attendance/today", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const attendance = await storage.getDailyAttendance(today);
      const count = await storage.getTodayAttendanceCount();
      res.json({ attendance, count });
    } catch (error) {
      console.error("Error fetching today's attendance:", error);
      res.status(500).json({ message: "Error fetching attendance" });
    }
  });

  app.get("/api/attendance/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = new Date().toISOString().split('T')[0];
      const attendance = await storage.getUserDailyAttendance(userId, today);
      res.json(attendance);
    } catch (error) {
      console.error("Error fetching user attendance:", error);
      res.status(500).json({ message: "Error fetching user attendance" });
    }
  });

  app.post("/api/attendance", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const attendanceData = { ...req.body, userId };
      const attendance = await storage.createDailyAttendance(attendanceData);
      res.status(201).json(attendance);
    } catch (error) {
      console.error("Error creating attendance:", error);
      res.status(400).json({ message: "Error creating attendance" });
    }
  });

  app.patch("/api/attendance/:id", isAuthenticated, async (req, res) => {
    try {
      const attendanceId = parseInt(req.params.id);
      const updateData = req.body;
      const attendance = await storage.updateDailyAttendance(attendanceId, updateData);
      if (attendance) {
        res.json(attendance);
      } else {
        res.status(404).json({ message: "Attendance record not found" });
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(400).json({ message: "Error updating attendance" });
    }
  });

  // Community posts routes
  app.get("/api/community/posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const posts = await storage.getCommunityPosts(limit);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching community posts:", error);
      res.status(500).json({ message: "Error fetching community posts" });
    }
  });

  app.get("/api/community/posts/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const posts = await storage.getUserCommunityPosts(userId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ message: "Error fetching user posts" });
    }
  });

  app.post("/api/community/posts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postData = { ...req.body, userId };
      const post = await storage.createCommunityPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating community post:", error);
      res.status(400).json({ message: "Error creating community post" });
    }
  });

  // Post likes routes
  app.get("/api/community/posts/:id/likes", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const likes = await storage.getPostLikes(postId);
      res.json(likes);
    } catch (error) {
      console.error("Error fetching post likes:", error);
      res.status(500).json({ message: "Error fetching post likes" });
    }
  });

  app.post("/api/community/posts/:id/like", isAuthenticated, async (req: any, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      const like = await storage.createPostLike({ postId, userId });
      res.status(201).json(like);
    } catch (error) {
      console.error("Error creating post like:", error);
      res.status(400).json({ message: "Error creating post like" });
    }
  });

  app.delete("/api/community/posts/:id/like", isAuthenticated, async (req: any, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      const success = await storage.removePostLike(postId, userId);
      if (success) {
        res.json({ message: "Like removed successfully" });
      } else {
        res.status(404).json({ message: "Like not found" });
      }
    } catch (error) {
      console.error("Error removing post like:", error);
      res.status(500).json({ message: "Error removing post like" });
    }
  });

  // Member achievements routes
  app.get("/api/achievements", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Error fetching achievements" });
    }
  });

  // Leaderboard route
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getWeeklyLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Error fetching leaderboard" });
    }
  });

  // Mobile-specific API routes

  // Today's schedule for mobile
  app.get("/api/mobile/schedule/today", isAuthenticated, async (req: any, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const schedules = await storage.getSchedulesByDay(new Date().getDay());
      
      // Add booking status and spots left (simplified)
      const schedulesWithBooking = schedules.map(schedule => ({
        id: schedule.id,
        discipline: schedule.class?.name || 'General',
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        instructor: schedule.instructor || 'Instructor',
        isBooked: false, // TODO: Check user bookings
        spotsLeft: Math.max(0, (schedule.maxCapacity || 20) - (schedule.currentBookings || 0))
      }));

      res.json(schedulesWithBooking);
    } catch (error) {
      console.error("Error fetching mobile schedule:", error);
      res.status(500).json({ message: "Error fetching schedule" });
    }
  });

  // Current gym count for mobile
  app.get("/api/mobile/gym/count", async (req, res) => {
    try {
      const count = await storage.getTodayAttendanceCount();
      res.json({ count, capacity: 50 });
    } catch (error) {
      console.error("Error fetching gym count:", error);
      res.status(500).json({ count: 0, capacity: 50 });
    }
  });

  // User streak and stats
  app.get("/api/mobile/user/streak", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const checkIns = await storage.getMemberCheckIns(userId, 30);
      
      // Calculate streak (simplified)
      let streak = 0;
      const sortedCheckIns = checkIns.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Count consecutive days (simplified calculation)
      for (const checkIn of sortedCheckIns) {
        const checkInDate = new Date(checkIn.createdAt).toDateString();
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - streak);
        
        if (checkInDate === expectedDate.toDateString()) {
          streak++;
        } else {
          break;
        }
      }

      res.json({ 
        streak, 
        totalClasses: checkIns.length 
      });
    } catch (error) {
      console.error("Error fetching user streak:", error);
      res.status(500).json({ streak: 0, totalClasses: 0 });
    }
  });

  // Discipline motivation messages
  app.get("/api/mobile/motivation/:discipline", async (req, res) => {
    try {
      const { discipline } = req.params;
      
      // Kaizen Burgos personalized motivation messages by discipline
      const motivationMessages: Record<string, any[]> = {
        'BJJ': [
          { message: "¡El tatami de Kaizen te espera! Hora de fluir 🌊", emoji: "🥋", type: "motivational" },
          { message: "Osss! El arte suave burgalés conquista al fuerte 💪", emoji: "🥋", type: "philosophy" },
          { message: "¡En Kaizen no hay límites! A por esas sumisiones 🔥", emoji: "🥋", type: "technique" },
          { message: "¿Listo para la guerra de ajedrez en el tatami de Burgos? ♟️", emoji: "🥋", type: "funny" },
          { message: "¡Hoy alguien va a 'dormir' en KaizenAcademy! 😴", emoji: "🥋", type: "funny" },
          { message: "¡Que fluya el jiu-jitsu burgalés! 改善", emoji: "🥋", type: "motivational" }
        ],
        'MMA': [
          { message: "¡Kaizen MMA: Sé agua, sé fuego, sé todo! 🔥", emoji: "🥊", type: "motivational" },
          { message: "El espíritu guerrero de Burgos te llama 🛡️", emoji: "🥊", type: "motivational" },
          { message: "En Kaizen: Striking + Grappling = Dominación total 💥", emoji: "🥊", type: "technique" },
          { message: "¿Listo para ser una máquina de pelear burgalesa? 🤖", emoji: "🥊", type: "funny" },
          { message: "¡A mezclar estilos como los campeones de Kaizen! 🎧", emoji: "🥊", type: "funny" },
          { message: "¡Kaizen改善: Mejora continua en combate! 🚀", emoji: "🥊", type: "philosophy" }
        ],
        'Kickboxing': [
          { message: "¡Tus piernas son las armas letales de Kaizen! 🦵", emoji: "🦵", type: "motivational" },
          { message: "Velocidad + Potencia = KO estilo Burgos 💥", emoji: "🦵", type: "technique" },
          { message: "¡Dale caña a esos paos en Kaizen! 🔨", emoji: "🦵", type: "motivational" },
          { message: "¿Preparado para hacer música con tus patadas burgalesas? 🎵", emoji: "🦵", type: "funny" },
          { message: "¡Hoy vas a 'barrer' el tatami de Kaizen! 🧹", emoji: "🦵", type: "funny" },
          { message: "¡El poder del kick burgalés! 改善", emoji: "🦵", type: "motivational" }
        ],
        'Boxeo': [
          { message: "¡Float like a butterfly, sting like a bee... en Kaizen! 🦋", emoji: "👊", type: "motivational" },
          { message: "Jab, Cross, Hook... ¡El dulce arte de Burgos! 🎶", emoji: "👊", type: "technique" },
          { message: "El ring de Kaizen es tu escenario, ¡brilla! ✨", emoji: "👊", type: "motivational" },
          { message: "¿Listo para tocar la campanilla en KaizenAcademy? 🔔", emoji: "👊", type: "funny" },
          { message: "¡Hoy los guantes de Kaizen van a 'hablar'! 🗣️", emoji: "👊", type: "funny" },
          { message: "¡El noble arte en la ciudad de Burgos! 改善", emoji: "👊", type: "philosophy" }
        ]
      };

      const messages = motivationMessages[discipline] || motivationMessages['BJJ'];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      res.json({
        id: Date.now(),
        discipline,
        ...randomMessage
      });
    } catch (error) {
      console.error("Error fetching motivation:", error);
      res.status(500).json({ message: "Error fetching motivation" });
    }
  });

  // Upcoming class with pre-class motivation
  app.get("/api/mobile/upcoming-class", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const now = new Date();
      const schedules = await storage.getSchedulesByDay(now.getDay());
      
      // Find next class in the next 2 hours
      const upcomingClasses = schedules.filter(schedule => {
        const [hours, minutes] = schedule.startTime.split(':');
        const classTime = new Date();
        classTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const timeDiff = classTime.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        return minutesDiff > 0 && minutesDiff <= 120; // Next 2 hours
      });

      if (upcomingClasses.length === 0) {
        return res.json(null);
      }

      const nextClass = upcomingClasses[0];
      const [hours, minutes] = nextClass.startTime.split(':');
      const classTime = new Date();
      classTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const timeUntil = Math.round((classTime.getTime() - now.getTime()) / (1000 * 60));

      // Kaizen Burgos pre-class motivation messages
      const preClassMessages: Record<string, string[]> = {
        'BJJ': [
          "¡El tatami de Kaizen te llama! Hora de fluir 🌊",
          "¿Listo para la guerra dulce burgalesa? ⚔️",
          "¡A conquistar posiciones en KaizenAcademy! 🏰",
          "El jiu-jitsu de Burgos no espera, ¡vamos! 🚀",
          "¡Tu clase de BJJ en Kaizen está a punto de empezar! 改善"
        ],
        'MMA': [
          "¡Guerrero de Kaizen, la batalla comienza pronto! ⚔️",
          "¡Tiempo de mezclar artes marciales en Burgos! 🥊",
          "El octágono mental de Kaizen ya está listo 🔥",
          "¡A por la dominación total estilo KaizenAcademy! 💪",
          "¡Tu clase de MMA en Kaizen está por comenzar! 改善"
        ],
        'Kickboxing': [
          "¡Tus piernas están listas para la acción en Kaizen! 🦵",
          "¿Preparado para hacer ruido en Burgos? 💥",
          "¡Los paos de Kaizen no saben lo que les espera! 🎯",
          "¡Dale caña con esas patadas burgalesas! 🔥",
          "¡Tu clase de Kickboxing en KaizenAcademy empieza ya! 改善"
        ],
        'Boxeo': [
          "¡Los guantes de Kaizen esperan tus puños! 👊",
          "¿Listo para el dulce arte burgalés? 🥊",
          "¡Float and sting en KaizenAcademy, campéon! 🦋",
          "El ring de Kaizen es tuyo, ¡tómalo! 👑",
          "¡Tu clase de Boxeo en Burgos está a punto de empezar! 改善"
        ]
      };

      const discipline = nextClass.class?.name || 'General';
      const messages = preClassMessages[discipline] || preClassMessages['BJJ'];
      const motivationMessage = timeUntil <= 60 ? {
        id: Date.now(),
        discipline,
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: discipline === 'BJJ' ? '🥋' : discipline === 'MMA' ? '🥊' : discipline === 'Kickboxing' ? '🦵' : '👊',
        type: 'pre_class'
      } : undefined;

      res.json({
        class: {
          id: nextClass.id,
          discipline,
          startTime: nextClass.startTime,
          endTime: nextClass.endTime,
          instructor: nextClass.instructor || 'Instructor',
          isBooked: false,
          spotsLeft: Math.max(0, (nextClass.maxCapacity || 20) - (nextClass.currentBookings || 0))
        },
        timeUntil,
        message: motivationMessage
      });
    } catch (error) {
      console.error("Error fetching upcoming class:", error);
      res.status(500).json({ message: "Error fetching upcoming class" });
    }
  });

  // Mobile attendance confirmation
  app.post("/api/mobile/attendance/confirm", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { classId, discipline } = req.body;
      const today = new Date().toISOString().split('T')[0];

      // Create or update attendance record
      const attendance = await storage.createDailyAttendance({
        userId,
        date: today,
        isGoing: true,
        disciplines: [discipline]
      });

      // Funny confirmation messages
      const confirmationMessages: Record<string, string[]> = {
        'BJJ': [
          "¡Osss! El tatami te extrañaba 🥋",
          "¡Confirmado! A por esas sumisiones 🔥",
          "¡El arte suave te espera! 🌊"
        ],
        'MMA': [
          "¡Guerrero confirmado! 💪",
          "¡El octágono te llama! 🥊",
          "¡A mezclar estilos! 🔥"
        ],
        'Kickboxing': [
          "¡Confirmado! Tus piernas están listas 🦵",
          "¡Los paos tiemblan! 💥",
          "¡Dale caña! 🔨"
        ],
        'Boxeo': [
          "¡Float and sting confirmado! 🥊",
          "¡Los guantes te esperan! 👊",
          "¡Sweet science time! 🎯"
        ]
      };

      const messages = confirmationMessages[discipline] || confirmationMessages['BJJ'];
      const message = messages[Math.floor(Math.random() * messages.length)];

      res.json({ 
        success: true, 
        message,
        attendance 
      });
    } catch (error) {
      console.error("Error confirming attendance:", error);
      res.status(400).json({ message: "Error confirming attendance" });
    }
  });

  // Mobile-friendly gym photos
  app.get("/api/mobile/photos", async (req, res) => {
    try {
      // Return sample gym photos data for mobile
      const samplePhotos = [
        {
          id: 1,
          title: "Entrenamiento BJJ",
          description: "Sesión intensa de Brazilian Jiu-Jitsu",
          imageUrl: "/api/placeholder/gym-bjj-training.jpg",
          category: "training",
          discipline: "BJJ",
          likes: 15,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Clase de MMA",
          description: "Entrenamiento mixto de MMA",
          imageUrl: "/api/placeholder/gym-mma-training.jpg",
          category: "training", 
          discipline: "MMA",
          likes: 23,
          createdAt: new Date().toISOString()
        }
      ];
      
      res.json(samplePhotos);
    } catch (error) {
      console.error("Error fetching mobile photos:", error);
      res.status(500).json({ message: "Error fetching photos" });
    }
  });

  // Create demo user for testing
  app.post("/api/auth/create-demo", async (req, res) => {
    try {
      // Demo credentials for testing KaizenApp
      const demoUser = {
        username: "kaizen_demo",
        password: "burgos2025",
        email: "demo@kaizenburgos.com",
        firstName: "Demo",
        lastName: "User",
        phone: "+34662323282",
        preferredDisciplines: ["BJJ", "MMA"],
        membershipType: "monthly",
        membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };

      // Check if demo user already exists
      const existingUser = await storage.getUserByUsername(demoUser.username);
      if (existingUser) {
        return res.json({ 
          message: "Demo user already exists",
          credentials: {
            username: "kaizen_demo",
            password: "burgos2025"
          }
        });
      }

      // Create the demo user
      const hashedPassword = await hashPassword(demoUser.password);
      const newUser = await storage.createUser({
        username: demoUser.username,
        password: hashedPassword,
        email: demoUser.email,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        phone: demoUser.phone,
        preferredDisciplines: demoUser.preferredDisciplines,
        membershipType: demoUser.membershipType,
        membershipExpiry: demoUser.membershipExpiry
      });

      res.json({ 
        message: "Demo user created successfully",
        credentials: {
          username: "kaizen_demo",
          password: "burgos2025"
        }
      });
    } catch (error: any) {
      console.error('Create demo user error:', error);
      res.status(500).json({ message: 'Error creating demo user' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
