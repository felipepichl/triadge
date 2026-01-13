-- CreateIndex
CREATE INDEX "AccountPayable_userId_idx" ON "AccountPayable"("userId");

-- CreateIndex
CREATE INDEX "AccountPayable_userId_dueDate_idx" ON "AccountPayable"("userId", "dueDate");

-- CreateIndex
CREATE INDEX "AccountPayable_userId_dueDate_isFixed_idx" ON "AccountPayable"("userId", "dueDate", "isFixed");

-- CreateIndex
CREATE INDEX "AccountPayable_userId_dueDate_isPaid_idx" ON "AccountPayable"("userId", "dueDate", "isPaid");
