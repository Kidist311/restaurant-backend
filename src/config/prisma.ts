/*import { PrismaClient } from "../generated/prisma/client.js";

export const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_ACCELERATE_URL || 'http://localhost', // Provide a valid URL
  log: ['query', 'info', 'warn', 'error'], // Example options, adjust as needed
});*/
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});