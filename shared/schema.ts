import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  boolean,
  serial,
  time,
  date,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: varchar("phone"),
  membershipType: varchar("membership_type").default("individual"), // individual, monthly, trimestral
  membershipExpiry: date("membership_expiry"),
  emergencyContact: varchar("emergency_contact"),
  medicalNotes: text("medical_notes"),
  preferredDisciplines: varchar("preferred_disciplines").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Classes/Disciplines table
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(), // MMA, BJJ, Boxing, etc.
  description: text("description"),
  instructor: varchar("instructor").notNull(),
  duration: integer("duration").notNull(), // minutes
  maxCapacity: integer("max_capacity").notNull(),
  difficulty: varchar("difficulty").notNull(), // beginner, intermediate, advanced
  equipment: varchar("equipment").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Class schedules table
export const classSchedules = pgTable("class_schedules", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => classes.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday, 1=Monday, etc.
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  scheduleId: integer("schedule_id").references(() => classSchedules.id).notNull(),
  bookingDate: date("booking_date").notNull(),
  status: varchar("status").default("confirmed"), // confirmed, cancelled, completed
  attendanceStatus: varchar("attendance_status").default("pending"), // pending, present, absent
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gym capacity tracking
export const gymCapacity = pgTable("gym_capacity", {
  id: serial("id").primaryKey(),
  currentCount: integer("current_count").default(0),
  maxCapacity: integer("max_capacity").default(50),
  lastUpdated: timestamp("last_updated").defaultNow(),
  updatedBy: varchar("updated_by").references(() => users.id),
});

// Member notes (for gym staff)
export const memberNotes = pgTable("member_notes", {
  id: serial("id").primaryKey(),
  memberId: varchar("member_id").references(() => users.id).notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  type: varchar("type").default("general"), // general, progress, medical, disciplinary
  isPrivate: boolean("is_private").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Member check-ins (for tracking gym visits)
export const memberCheckIns = pgTable("member_check_ins", {
  id: serial("id").primaryKey(),
  memberId: varchar("member_id").references(() => users.id).notNull(),
  checkInTime: timestamp("check_in_time").defaultNow(),
  checkOutTime: timestamp("check_out_time"),
  classId: integer("class_id").references(() => classes.id),
  notes: text("notes"),
});

// Keep contacts table for backward compatibility
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  discipline: text("discipline"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// E-commerce Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'clothing', 'equipment', 'kimono'
  subcategory: text("subcategory"), // 't-shirt', 'shorts', 'gloves', etc.
  sizes: text("sizes").array(), // ['S', 'M', 'L', 'XL'] for clothing
  colors: text("colors").array(), // available colors
  imageUrl: text("image_url"),
  inStock: integer("in_stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'delivered', 'cancelled'
  paymentMethod: text("payment_method"), // 'cash', 'pix', 'card'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Order Items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  size: text("size"),
  color: text("color"),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
});

// Space Rental Services
export const spaceRentals = pgTable("space_rentals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  pricePerHour: numeric("price_per_hour", { precision: 10, scale: 2 }).notNull(),
  availableHours: text("available_hours").array(), // ['09:00', '10:00', '11:00', etc.]
  availableDays: text("available_days").array(), // ['monday', 'tuesday', etc.]
  maxCapacity: integer("max_capacity"),
  equipmentIncluded: text("equipment_included").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Space Rental Bookings
export const spaceBookings = pgTable("space_bookings", {
  id: serial("id").primaryKey(),
  spaceRentalId: integer("space_rental_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  date: date("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  totalHours: integer("total_hours").notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  purpose: text("purpose"), // what type of class/training
  status: text("status").default("pending"), // 'pending', 'confirmed', 'completed', 'cancelled'
  paymentStatus: text("payment_status").default("pending"), // 'pending', 'paid', 'refunded'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Daily attendance tracking
export const dailyAttendance = pgTable("daily_attendance", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  date: date("date").notNull(),
  isGoing: boolean("is_going").default(true),
  disciplines: varchar("disciplines").array(), // What they plan to train
  checkedIn: boolean("checked_in").default(false),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Community posts (photos, achievements, etc.)
export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("image_url"),
  type: varchar("type").default("general"), // general, achievement, progress, event
  likes: integer("likes").default(0),
  discipline: varchar("discipline"), // BJJ, MMA, etc.
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Community post likes
export const postLikes = pgTable("post_likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => communityPosts.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Member achievements/badges
export const memberAchievements = pgTable("member_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementType: varchar("achievement_type").notNull(), // weekly_warrior, monthly_champion, streak_master, etc.
  title: varchar("title").notNull(),
  description: text("description"),
  badgeIcon: varchar("badge_icon"),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  memberNotes: many(memberNotes, { relationName: "memberNotes" }),
  authoredNotes: many(memberNotes, { relationName: "authoredNotes" }),
  checkIns: many(memberCheckIns),
  dailyAttendance: many(dailyAttendance),
  communityPosts: many(communityPosts),
  postLikes: many(postLikes),
  achievements: many(memberAchievements),
}));

export const classesRelations = relations(classes, ({ many }) => ({
  schedules: many(classSchedules),
  checkIns: many(memberCheckIns),
}));

export const classSchedulesRelations = relations(classSchedules, ({ one, many }) => ({
  class: one(classes, {
    fields: [classSchedules.classId],
    references: [classes.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  schedule: one(classSchedules, {
    fields: [bookings.scheduleId],
    references: [classSchedules.id],
  }),
}));

export const memberNotesRelations = relations(memberNotes, ({ one }) => ({
  member: one(users, {
    fields: [memberNotes.memberId],
    references: [users.id],
    relationName: "memberNotes",
  }),
  author: one(users, {
    fields: [memberNotes.authorId],
    references: [users.id],
    relationName: "authoredNotes",
  }),
}));

export const memberCheckInsRelations = relations(memberCheckIns, ({ one }) => ({
  member: one(users, {
    fields: [memberCheckIns.memberId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [memberCheckIns.classId],
    references: [classes.id],
  }),
}));

// Community relations
export const dailyAttendanceRelations = relations(dailyAttendance, ({ one }) => ({
  user: one(users, {
    fields: [dailyAttendance.userId],
    references: [users.id],
  }),
}));

export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  user: one(users, {
    fields: [communityPosts.userId],
    references: [users.id],
  }),
  likes: many(postLikes),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(communityPosts, {
    fields: [postLikes.postId],
    references: [communityPosts.id],
  }),
  user: one(users, {
    fields: [postLikes.userId],
    references: [users.id],
  }),
}));

export const memberAchievementsRelations = relations(memberAchievements, ({ one }) => ({
  user: one(users, {
    fields: [memberAchievements.userId],
    references: [users.id],
  }),
}));

// Types and schemas
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type Class = typeof classes.$inferSelect;
export type InsertClass = typeof classes.$inferInsert;
export const insertClassSchema = createInsertSchema(classes);

export type ClassSchedule = typeof classSchedules.$inferSelect;
export type InsertClassSchedule = typeof classSchedules.$inferInsert;
export const insertClassScheduleSchema = createInsertSchema(classSchedules);

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export const insertBookingSchema = createInsertSchema(bookings);

export type GymCapacity = typeof gymCapacity.$inferSelect;
export type InsertGymCapacity = typeof gymCapacity.$inferInsert;

export type MemberNote = typeof memberNotes.$inferSelect;
export type InsertMemberNote = typeof memberNotes.$inferInsert;
export const insertMemberNoteSchema = createInsertSchema(memberNotes);

export type MemberCheckIn = typeof memberCheckIns.$inferSelect;
export type InsertMemberCheckIn = typeof memberCheckIns.$inferInsert;
export const insertMemberCheckInSchema = createInsertSchema(memberCheckIns);

// Keep existing contact types for backward compatibility
export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// E-commerce types
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export const insertProductSchema = createInsertSchema(products);

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export const insertOrderSchema = createInsertSchema(orders);

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type SpaceRental = typeof spaceRentals.$inferSelect;
export type InsertSpaceRental = typeof spaceRentals.$inferInsert;
export const insertSpaceRentalSchema = createInsertSchema(spaceRentals);

export type SpaceBooking = typeof spaceBookings.$inferSelect;
export type InsertSpaceBooking = typeof spaceBookings.$inferInsert;
export const insertSpaceBookingSchema = createInsertSchema(spaceBookings);

// Community types
export type DailyAttendance = typeof dailyAttendance.$inferSelect;
export type InsertDailyAttendance = typeof dailyAttendance.$inferInsert;
export const insertDailyAttendanceSchema = createInsertSchema(dailyAttendance);

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;
export const insertCommunityPostSchema = createInsertSchema(communityPosts);

export type PostLike = typeof postLikes.$inferSelect;
export type InsertPostLike = typeof postLikes.$inferInsert;
export const insertPostLikeSchema = createInsertSchema(postLikes);

export type MemberAchievement = typeof memberAchievements.$inferSelect;
export type InsertMemberAchievement = typeof memberAchievements.$inferInsert;
export const insertMemberAchievementSchema = createInsertSchema(memberAchievements);
