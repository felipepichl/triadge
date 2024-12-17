/*
  Warnings:

  - You are about to drop the column `financialCategoryId` on the `FinancialCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinancialCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentCategoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FinancialCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialCategory_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "FinancialCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FinancialCategory" ("createdAt", "description", "id", "parentCategoryId", "updatedAt", "userId") SELECT "createdAt", "description", "id", "parentCategoryId", "updatedAt", "userId" FROM "FinancialCategory";
DROP TABLE "FinancialCategory";
ALTER TABLE "new_FinancialCategory" RENAME TO "FinancialCategory";
CREATE TABLE "new_AccountPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isFixed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "financialCategoryId" TEXT NOT NULL,
    "transactionId" TEXT,
    CONSTRAINT "AccountPayable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountPayable_financialCategoryId_fkey" FOREIGN KEY ("financialCategoryId") REFERENCES "FinancialCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountPayable_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AccountPayable" ("amount", "createdAt", "description", "dueDate", "financialCategoryId", "id", "isPaid", "paymentDate", "transactionId", "updatedAt", "userId") SELECT "amount", "createdAt", "description", "dueDate", "financialCategoryId", "id", "isPaid", "paymentDate", "transactionId", "updatedAt", "userId" FROM "AccountPayable";
DROP TABLE "AccountPayable";
ALTER TABLE "new_AccountPayable" RENAME TO "AccountPayable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
