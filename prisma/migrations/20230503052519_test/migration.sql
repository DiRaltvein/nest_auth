-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User', 'Manager', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "password" VARCHAR(80) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Team" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserInTeam" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "TeamId" TEXT NOT NULL,

    CONSTRAINT "UserInTeam_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "Id" TEXT NOT NULL,
    "Start" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "End" TIMESTAMP,
    "UserId" TEXT NOT NULL,
    "UserInTeamId" TEXT NOT NULL,
    "Role" "Roles" NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Team_Name_key" ON "Team"("Name");

-- AddForeignKey
ALTER TABLE "UserInTeam" ADD CONSTRAINT "UserInTeam_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInTeam" ADD CONSTRAINT "UserInTeam_TeamId_fkey" FOREIGN KEY ("TeamId") REFERENCES "Team"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_UserInTeamId_fkey" FOREIGN KEY ("UserInTeamId") REFERENCES "UserInTeam"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
