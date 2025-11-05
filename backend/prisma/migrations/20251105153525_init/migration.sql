-- CreateTable
CREATE TABLE `Leaderboards` (
    `Dept_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Medals_gold` INTEGER NOT NULL DEFAULT 0,
    `Medals_silver` INTEGER NOT NULL DEFAULT 0,
    `Medals_bronze` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`Dept_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `Student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Dept_id` INTEGER NULL,
    `Qr_code` VARCHAR(191) NULL,
    `Face_data` VARCHAR(191) NULL,
    `Date_registered` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_Email_key`(`Email`),
    PRIMARY KEY (`Student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `Event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NULL,
    `Time` DATETIME(3) NULL,
    `Venue` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL DEFAULT 'Scheduled',

    PRIMARY KEY (`Event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `Attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Student_id` INTEGER NOT NULL,
    `Event_id` INTEGER NOT NULL,
    `Checkin_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Status` VARCHAR(191) NULL DEFAULT 'Present',

    PRIMARY KEY (`Attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `Admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Role` VARCHAR(191) NULL DEFAULT 'Admin',
    `Email` VARCHAR(191) NOT NULL,
    `Password_hash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_Email_key`(`Email`),
    PRIMARY KEY (`Admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `Announcement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Message` VARCHAR(191) NOT NULL,
    `Date_posted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Admin_id` INTEGER NULL,

    PRIMARY KEY (`Announcement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Super_Admin` (
    `Super_Admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Access_key` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Super_Admin_Email_key`(`Email`),
    PRIMARY KEY (`Super_Admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_Dept_id_fkey` FOREIGN KEY (`Dept_id`) REFERENCES `Leaderboards`(`Dept_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_Student_id_fkey` FOREIGN KEY (`Student_id`) REFERENCES `Student`(`Student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_Event_id_fkey` FOREIGN KEY (`Event_id`) REFERENCES `Event`(`Event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_Admin_id_fkey` FOREIGN KEY (`Admin_id`) REFERENCES `Admin`(`Admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;
