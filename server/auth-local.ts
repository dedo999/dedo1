import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { storage } from './storage';
import type { Express, Request, Response, NextFunction } from 'express';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // 7 days

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: { userId: string; username: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Generate random token for password reset/verification
export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware for JWT authentication
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Attach user info to request
  (req as any).user = {
    claims: {
      sub: payload.userId,
      username: payload.username,
      email: payload.email
    }
  };

  next();
};

// Setup local authentication routes
export function setupLocalAuth(app: Express) {
  // User registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, email, password, firstName, lastName, phone, preferredDisciplines } = req.body;

      // Validation
      if (!username || !email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const newUser = await storage.upsertUser({
        id: crypto.randomUUID(),
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        preferredDisciplines: preferredDisciplines || [],
        authProvider: 'local',
        isActive: true,
        lastLoginAt: new Date(),
      });

      // Generate token
      const token = generateToken({
        userId: newUser.id,
        username: newUser.username!,
        email: newUser.email!
      });

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          preferredDisciplines: newUser.preferredDisciplines
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // User login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
      }

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user || !user.passwordHash) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Special case for demo user
      let isValidPassword = false;
      if (username === 'kaizen_demo' && password === 'burgos2025') {
        isValidPassword = true;
      } else {
        // Verify password normally
        isValidPassword = await verifyPassword(password, user.passwordHash);
      }
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Update last login
      await storage.updateUser(user.id, { lastLoginAt: new Date() });

      // Generate token
      const token = generateToken({
        userId: user.id,
        username: user.username!,
        email: user.email!
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl,
          preferredDisciplines: user.preferredDisciplines,
          membershipType: user.membershipType
        }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get current user (for JWT authentication)
  app.get('/api/auth/user', authenticateJWT, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        preferredDisciplines: user.preferredDisciplines,
        membershipType: user.membershipType,
        membershipExpiry: user.membershipExpiry,
        phone: user.phone
      });
    } catch (error: any) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Password reset request
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email required' });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists
        return res.json({ message: 'If email exists, password reset link has been sent' });
      }

      // Generate reset token
      const resetToken = generateRandomToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      await storage.createPasswordResetToken({
        userId: user.id,
        token: resetToken,
        expiresAt
      });

      // In a real app, send email here
      console.log(`Password reset token for ${email}: ${resetToken}`);

      res.json({ message: 'If email exists, password reset link has been sent' });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Token refresh
  app.post('/api/auth/refresh', authenticateJWT, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate new token
      const token = generateToken({
        userId: user.id,
        username: user.username!,
        email: user.email!
      });

      res.json({ token });
    } catch (error: any) {
      console.error('Token refresh error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}