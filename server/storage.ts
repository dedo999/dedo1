import { 
  users, 
  classes, 
  classSchedules, 
  bookings, 
  gymCapacity, 
  memberNotes, 
  memberCheckIns,
  contacts,
  products,
  orders,
  orderItems,
  spaceRentals,
  spaceBookings,
  type User, 
  type UpsertUser,
  type Class,
  type InsertClass,
  type ClassSchedule,
  type InsertClassSchedule,
  type Booking,
  type InsertBooking,
  type GymCapacity,
  type InsertGymCapacity,
  type MemberNote,
  type InsertMemberNote,
  type MemberCheckIn,
  type InsertMemberCheckIn,
  type Contact,
  type InsertContact,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type SpaceRental,
  type InsertSpaceRental,
  type SpaceBooking,
  type InsertSpaceBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Class management
  getClasses(): Promise<Class[]>;
  getClass(id: number): Promise<Class | undefined>;
  createClass(insertClass: InsertClass): Promise<Class>;
  updateClass(id: number, updateData: Partial<InsertClass>): Promise<Class | undefined>;
  
  // Class schedules
  getClassSchedules(classId?: number): Promise<ClassSchedule[]>;
  createClassSchedule(schedule: InsertClassSchedule): Promise<ClassSchedule>;
  getSchedulesByDay(dayOfWeek: number): Promise<ClassSchedule[]>;
  
  // Bookings
  getUserBookings(userId: string): Promise<Booking[]>;
  getClassBookings(scheduleId: number, date: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  cancelBooking(bookingId: number): Promise<boolean>;
  updateBookingAttendance(bookingId: number, status: string): Promise<boolean>;
  
  // Gym capacity
  getCurrentCapacity(): Promise<GymCapacity | undefined>;
  updateCapacity(capacity: InsertGymCapacity): Promise<GymCapacity>;
  
  // Member notes
  getMemberNotes(memberId: string): Promise<MemberNote[]>;
  createMemberNote(note: InsertMemberNote): Promise<MemberNote>;
  updateMemberNote(id: number, updateData: Partial<InsertMemberNote>): Promise<MemberNote | undefined>;
  
  // Member check-ins
  getMemberCheckIns(memberId: string, limit?: number): Promise<MemberCheckIn[]>;
  createCheckIn(checkIn: InsertMemberCheckIn): Promise<MemberCheckIn>;
  updateCheckOut(checkInId: number): Promise<boolean>;
  
  // Contact form (backward compatibility)
  createContact(contact: InsertContact): Promise<Contact>;
  
  // E-commerce operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined>;
  
  // Orders
  getUserOrders(userId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Space rentals
  getSpaceRentals(): Promise<SpaceRental[]>;
  createSpaceRental(rental: InsertSpaceRental): Promise<SpaceRental>;
  
  // Space bookings
  getUserSpaceBookings(userId: string): Promise<SpaceBooking[]>;
  createSpaceBooking(booking: InsertSpaceBooking): Promise<SpaceBooking>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Class management
  async getClasses(): Promise<Class[]> {
    return await db.select().from(classes).orderBy(asc(classes.name));
  }

  async getClass(id: number): Promise<Class | undefined> {
    const [result] = await db.select().from(classes).where(eq(classes.id, id));
    return result;
  }

  async createClass(insertClass: InsertClass): Promise<Class> {
    const [result] = await db.insert(classes).values(insertClass).returning();
    return result;
  }

  async updateClass(id: number, updateData: Partial<InsertClass>): Promise<Class | undefined> {
    const [result] = await db
      .update(classes)
      .set(updateData)
      .where(eq(classes.id, id))
      .returning();
    return result;
  }

  // Class schedules
  async getClassSchedules(classId?: number): Promise<ClassSchedule[]> {
    if (classId) {
      return await db
        .select()
        .from(classSchedules)
        .where(and(
          eq(classSchedules.classId, classId),
          eq(classSchedules.isActive, true)
        ))
        .orderBy(asc(classSchedules.dayOfWeek), asc(classSchedules.startTime));
    }
    
    return await db
      .select()
      .from(classSchedules)
      .where(eq(classSchedules.isActive, true))
      .orderBy(asc(classSchedules.dayOfWeek), asc(classSchedules.startTime));
  }

  async createClassSchedule(schedule: InsertClassSchedule): Promise<ClassSchedule> {
    const [result] = await db.insert(classSchedules).values(schedule).returning();
    return result;
  }

  async getSchedulesByDay(dayOfWeek: number): Promise<ClassSchedule[]> {
    return await db
      .select()
      .from(classSchedules)
      .where(and(
        eq(classSchedules.dayOfWeek, dayOfWeek),
        eq(classSchedules.isActive, true)
      ))
      .orderBy(asc(classSchedules.startTime));
  }

  // Bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.bookingDate));
  }

  async getClassBookings(scheduleId: number, date: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(and(
        eq(bookings.scheduleId, scheduleId),
        eq(bookings.bookingDate, date),
        eq(bookings.status, "confirmed")
      ));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [result] = await db.insert(bookings).values(booking).returning();
    return result;
  }

  async cancelBooking(bookingId: number): Promise<boolean> {
    const result = await db
      .update(bookings)
      .set({ status: "cancelled" })
      .where(eq(bookings.id, bookingId));
    return (result.rowCount ?? 0) > 0;
  }

  async updateBookingAttendance(bookingId: number, status: string): Promise<boolean> {
    const result = await db
      .update(bookings)
      .set({ attendanceStatus: status })
      .where(eq(bookings.id, bookingId));
    return (result.rowCount ?? 0) > 0;
  }

  // Gym capacity
  async getCurrentCapacity(): Promise<GymCapacity | undefined> {
    const [result] = await db
      .select()
      .from(gymCapacity)
      .orderBy(desc(gymCapacity.lastUpdated))
      .limit(1);
    return result;
  }

  async updateCapacity(capacity: InsertGymCapacity): Promise<GymCapacity> {
    const [result] = await db.insert(gymCapacity).values(capacity).returning();
    return result;
  }

  // Member notes
  async getMemberNotes(memberId: string): Promise<MemberNote[]> {
    return await db
      .select()
      .from(memberNotes)
      .where(eq(memberNotes.memberId, memberId))
      .orderBy(desc(memberNotes.createdAt));
  }

  async createMemberNote(note: InsertMemberNote): Promise<MemberNote> {
    const [result] = await db.insert(memberNotes).values(note).returning();
    return result;
  }

  async updateMemberNote(id: number, updateData: Partial<InsertMemberNote>): Promise<MemberNote | undefined> {
    const [result] = await db
      .update(memberNotes)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(memberNotes.id, id))
      .returning();
    return result;
  }

  // Member check-ins
  async getMemberCheckIns(memberId: string, limit = 50): Promise<MemberCheckIn[]> {
    return await db
      .select()
      .from(memberCheckIns)
      .where(eq(memberCheckIns.memberId, memberId))
      .orderBy(desc(memberCheckIns.checkInTime))
      .limit(limit);
  }

  async createCheckIn(checkIn: InsertMemberCheckIn): Promise<MemberCheckIn> {
    const [result] = await db.insert(memberCheckIns).values(checkIn).returning();
    return result;
  }

  async updateCheckOut(checkInId: number): Promise<boolean> {
    const result = await db
      .update(memberCheckIns)
      .set({ checkOutTime: new Date() })
      .where(eq(memberCheckIns.id, checkInId));
    return (result.rowCount ?? 0) > 0;
  }

  // Contact form (backward compatibility)
  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contacts).values(contact).returning();
    return result;
  }

  // E-commerce operations
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isActive, true));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  // Orders
  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.customerEmail, userId)).orderBy(desc(orders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();
    return newOrder;
  }

  // Space rentals
  async getSpaceRentals(): Promise<SpaceRental[]> {
    return await db.select().from(spaceRentals).where(eq(spaceRentals.isActive, true));
  }

  async createSpaceRental(rental: InsertSpaceRental): Promise<SpaceRental> {
    const [newRental] = await db
      .insert(spaceRentals)
      .values(rental)
      .returning();
    return newRental;
  }

  // Space bookings
  async getUserSpaceBookings(userId: string): Promise<SpaceBooking[]> {
    return await db.select().from(spaceBookings).where(eq(spaceBookings.customerEmail, userId)).orderBy(desc(spaceBookings.createdAt));
  }

  async createSpaceBooking(booking: InsertSpaceBooking): Promise<SpaceBooking> {
    const [newBooking] = await db
      .insert(spaceBookings)
      .values(booking)
      .returning();
    return newBooking;
  }
}

export const storage = new DatabaseStorage();
