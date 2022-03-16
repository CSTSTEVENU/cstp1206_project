-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "lowercaseUsername" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hedgehog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerID" INTEGER,

    CONSTRAINT "Hedgehog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_lowercaseUsername_key" ON "User"("lowercaseUsername");

-- AddForeignKey
ALTER TABLE "Hedgehog" ADD CONSTRAINT "Hedgehog_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
