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

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  memberNotes: many(memberNotes, { relationName: "memberNotes" }),
  authoredNotes: many(memberNotes, { relationName: "authoredNotes" }),
  checkIns: many(memberCheckIns),
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
