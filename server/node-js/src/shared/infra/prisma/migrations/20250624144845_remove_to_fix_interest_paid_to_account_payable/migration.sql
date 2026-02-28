/*
  Warnings:

  - You are about to drop the column `interestPaid` on the `AccountPayable` table. All the data in the column will be lost.
  - You are about to drop the column `isInterestPaid` on the `AccountPayable` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccountPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isFixed" BOOLEAN NOT NULL DEFAULT false,
    "isAmountVariable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "financialCategoryId" TEXT NOT NULL,
    "subcategoryId" TEXT,
    "transactionId" TEXT,
    CONSTRAINT "AccountPayable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountPayable_financialCategoryId_fkey" FOREIGN KEY ("financialCategoryId") REFERENCES "FinancialCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountPayable_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "FinancialCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AccountPayable_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AccountPayable" ("amount", "createdAt", "description", "dueDate", "financialCategoryId", "id", "isAmountVariable", "isFixed", "isPaid", "paymentDate", "subcategoryId", "transactionId", "updatedAt", "userId") SELECT "amount", "createdAt", "description", "dueDate", "financialCategoryId", "id", "isAmountVariable", "isFixed", "isPaid", "paymentDate", "subcategoryId", "transactionId", "updatedAt", "userId" FROM "AccountPayable";
DROP TABLE "AccountPayable";
ALTER TABLE "new_AccountPayable" RENAME TO "AccountPayable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
