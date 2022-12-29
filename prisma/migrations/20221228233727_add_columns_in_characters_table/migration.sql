/*
  Warnings:

  - You are about to alter the column `gold` on the `Characters` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - You are about to alter the column `race` on the `Characters` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charname" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "defesa" INTEGER NOT NULL DEFAULT 500,
    "ataque" INTEGER NOT NULL DEFAULT 500,
    "forca" INTEGER NOT NULL DEFAULT 5,
    "inteligencia" INTEGER NOT NULL DEFAULT 5,
    "destreza" INTEGER NOT NULL DEFAULT 5,
    "constituicao" INTEGER NOT NULL DEFAULT 5,
    "aprendizagem0" INTEGER NOT NULL DEFAULT 5,
    "aprendizagem1" INTEGER NOT NULL DEFAULT 5,
    "aprendizagem2" INTEGER NOT NULL DEFAULT 5,
    "aprendizagem3" INTEGER NOT NULL DEFAULT 5,
    "race" INTEGER NOT NULL DEFAULT 1,
    "gold" BIGINT NOT NULL DEFAULT 100000000,
    "experiencia" BIGINT NOT NULL DEFAULT 123,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Characters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Characters" ("charname", "gold", "id", "race", "userId") SELECT "charname", coalesce("gold", 100000000) AS "gold", "id", "race", "userId" FROM "Characters";
DROP TABLE "Characters";
ALTER TABLE "new_Characters" RENAME TO "Characters";
CREATE UNIQUE INDEX "Characters_charname_key" ON "Characters"("charname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
