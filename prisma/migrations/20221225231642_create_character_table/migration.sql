-- CreateTable
CREATE TABLE "Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charname" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gold" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Characters_charname_key" ON "Characters"("charname");
