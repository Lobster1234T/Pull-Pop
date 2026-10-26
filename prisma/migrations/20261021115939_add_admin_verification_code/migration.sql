-- CreateTable
CREATE TABLE "AdminVerificationCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminVerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminVerificationCode_userId_idx" ON "AdminVerificationCode"("userId");

-- CreateIndex
CREATE INDEX "AdminVerificationCode_code_idx" ON "AdminVerificationCode"("code");

-- CreateIndex
CREATE INDEX "AdminVerificationCode_expiresAt_idx" ON "AdminVerificationCode"("expiresAt");

-- AddForeignKey
ALTER TABLE "AdminVerificationCode" ADD CONSTRAINT "AdminVerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
