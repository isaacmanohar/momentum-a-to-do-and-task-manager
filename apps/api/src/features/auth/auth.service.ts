// =============================================================
// Life OS — Auth Service
// Business logic for authentication
// =============================================================

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../core/errors/index.js';
import type { JwtPayload } from '../../core/middleware/auth.middleware.js';
import type { RegisterInput, LoginInput, UpdateProfileInput } from './auth.schema.js';

const SALT_ROUNDS = 12;

// ---- Token Generation ----

function generateAccessToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
  });
}

function generateRefreshToken(): string {
  return uuidv4();
}

function getRefreshTokenExpiry(): Date {
  const match = env.JWT_REFRESH_EXPIRY.match(/^(\d+)([dhms])$/);
  if (!match) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // default 7 days

  const value = parseInt(match[1], 10);
  const unit = match[2];
  const ms = {
    d: value * 24 * 60 * 60 * 1000,
    h: value * 60 * 60 * 1000,
    m: value * 60 * 1000,
    s: value * 1000,
  }[unit] || 7 * 24 * 60 * 60 * 1000;

  return new Date(Date.now() + ms);
}

// ---- Auth Operations ----

export async function register(input: RegisterInput) {
  // Check if user exists
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new ConflictError('A user with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  // Create user with stats
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashedPassword,
      stats: {
        create: {
          xp: 0,
          level: 1,
          coins: 0,
          currentStreak: 0,
          longestStreak: 0,
          tasksCompleted: 0,
          focusMinutes: 0,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      timezone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Generate tokens
  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
}

export async function login(input: LoginInput) {
  // Find user by email or name
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: input.email },
        { name: input.email }
      ]
    },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Verify password
  const isValid = await bcrypt.compare(input.password, user.password);

  if (!isValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();

  // Store refresh token (clean up old tokens first)
  await prisma.refreshToken.deleteMany({
    where: {
      userId: user.id,
      expiresAt: { lt: new Date() },
    },
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
}

export async function refreshTokens(refreshToken: string) {
  // Find token
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    // Delete expired token if found
    if (stored) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
    }
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  // Rotate refresh token (delete old, create new)
  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const newAccessToken = generateAccessToken(stored.user.id, stored.user.email);
  const newRefreshToken = generateRefreshToken();

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: stored.user.id,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout(refreshToken: string) {
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  });
}

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      phone: true,
      bio: true,
      birthday: true,
      avatarUrl: true,
      timezone: true,
      language: true,
      country: true,
      occupation: true,
      website: true,
      socialLinks: true,
      twoFactorEnabled: true,
      appearance: true,
      settings: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User');
  }

  return user;
}

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: input,
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      phone: true,
      bio: true,
      birthday: true,
      avatarUrl: true,
      timezone: true,
      language: true,
      country: true,
      occupation: true,
      website: true,
      socialLinks: true,
      twoFactorEnabled: true,
      appearance: true,
      settings: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}
