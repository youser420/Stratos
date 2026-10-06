-- CreateEnum
CREATE TYPE "AscensionDiscipline" AS ENUM ('RUN', 'PRIME', 'PUMP');

-- CreateEnum
CREATE TYPE "RecoveryDiscipline" AS ENUM ('STRETCH', 'BREATHE', 'NOURISH');

-- CreateEnum
CREATE TYPE "SphereSessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'RETIRED');

-- CreateEnum
CREATE TYPE "MilestoneSource" AS ENUM ('ASCENSION', 'RECOVERY', 'REFLECTION', 'COMMUNITY', 'GOAL', 'OTHER');

-- CreateEnum
CREATE TYPE "ParticipationType" AS ENUM ('OUTREACH_EVENT', 'LOCAL_OPPORTUNITY', 'COMMUNITY_CHECK_IN');

-- CreateEnum
CREATE TYPE "CoachContextSource" AS ENUM ('LANDING', 'BASECAMP', 'REFLECTION', 'ASCENSION', 'RECOVERY', 'COMMUNITY', 'DIRECT');

-- CreateEnum
CREATE TYPE "CoachMessageRole" AS ENUM ('USER', 'COACH');

-- CreateTable
CREATE TABLE "ascension_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "discipline" "AscensionDiscipline" NOT NULL,
    "status" "SphereSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ascension_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "discipline" "RecoveryDiscipline" NOT NULL,
    "status" "SphereSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recovery_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reflectionDate" DATE NOT NULL,
    "promptResponse" TEXT,
    "moodTag" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
    "targetDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_milestone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "source" "MilestoneSource" NOT NULL,
    "sourceRefId" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journey_milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_participation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ParticipationType" NOT NULL,
    "title" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "community_participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceContext" "CoachContextSource" NOT NULL DEFAULT 'DIRECT',
    "sourceDetail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "CoachMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ascension_session_userId_idx" ON "ascension_session"("userId");

-- CreateIndex
CREATE INDEX "ascension_session_userId_status_idx" ON "ascension_session"("userId", "status");

-- CreateIndex
CREATE INDEX "ascension_session_userId_discipline_idx" ON "ascension_session"("userId", "discipline");

-- CreateIndex
CREATE INDEX "recovery_session_userId_idx" ON "recovery_session"("userId");

-- CreateIndex
CREATE INDEX "recovery_session_userId_status_idx" ON "recovery_session"("userId", "status");

-- CreateIndex
CREATE INDEX "recovery_session_userId_discipline_idx" ON "recovery_session"("userId", "discipline");

-- CreateIndex
CREATE INDEX "reflection_userId_idx" ON "reflection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "reflection_userId_reflectionDate_key" ON "reflection"("userId", "reflectionDate");

-- CreateIndex
CREATE INDEX "personal_goal_userId_idx" ON "personal_goal"("userId");

-- CreateIndex
CREATE INDEX "personal_goal_userId_status_idx" ON "personal_goal"("userId", "status");

-- CreateIndex
CREATE INDEX "journey_milestone_userId_idx" ON "journey_milestone"("userId");

-- CreateIndex
CREATE INDEX "journey_milestone_userId_occurredAt_idx" ON "journey_milestone"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "community_participation_userId_idx" ON "community_participation"("userId");

-- CreateIndex
CREATE INDEX "community_participation_userId_occurredAt_idx" ON "community_participation"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "coach_conversation_userId_idx" ON "coach_conversation"("userId");

-- CreateIndex
CREATE INDEX "coach_conversation_userId_updatedAt_idx" ON "coach_conversation"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "coach_message_conversationId_idx" ON "coach_message"("conversationId");

-- AddForeignKey
ALTER TABLE "ascension_session" ADD CONSTRAINT "ascension_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_session" ADD CONSTRAINT "recovery_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflection" ADD CONSTRAINT "reflection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_goal" ADD CONSTRAINT "personal_goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_milestone" ADD CONSTRAINT "journey_milestone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_participation" ADD CONSTRAINT "community_participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_conversation" ADD CONSTRAINT "coach_conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_message" ADD CONSTRAINT "coach_message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "coach_conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
