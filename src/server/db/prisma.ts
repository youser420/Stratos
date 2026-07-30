import "server-only";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });
}

function hasOnboardingDelegate(client: PrismaClient | undefined): client is PrismaClient {
  if (!client) {
    return false;
  }

  const delegate = (client as unknown as Record<string, unknown>).onboardingProfile;

  return (
    typeof delegate === "object" &&
    delegate !== null &&
    typeof (delegate as { findUnique?: unknown }).findUnique === "function"
  );
}

export const prisma = hasOnboardingDelegate(globalForPrisma.prisma)
  ? globalForPrisma.prisma
  : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
