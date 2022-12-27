/*
  Warnings:

  - Added the required column `usernameId` to the `Characters` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charname" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gold" TEXT,
    "usernameId" TEXT NOT NULL,
    CONSTRAINT "Characters_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Characters" ("charname", "gold", "id", "race") SELECT "charname", "gold", "id", "race" FROM "Characters";
DROP TABLE "Characters";
ALTER TABLE "new_Characters" RENAME TO "Characters";
CREATE UNIQUE INDEX "Characters_charname_key" ON "Characters"("charname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
