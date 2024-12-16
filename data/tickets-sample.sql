-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "ticket" ---------------------------------------
CREATE TABLE `ticket`( 
	`id` Int( 0 ) AUTO_INCREMENT NOT NULL,
	`title` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`description` Text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`status` Enum( 'OPEN', 'IN_PROGRESS', 'CLOSED' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
	`priority` Enum( 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL' ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`createdAt` DateTime NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updatedAt` DateTime NOT NULL,
	`assignedToUserId` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 21;
-- -------------------------------------------------------------


-- Dump data of "ticket" -----------------------------------
BEGIN;

INSERT INTO `ticket`(`id`,`title`,`description`,`status`,`priority`,`createdAt`,`updatedAt`,`assignedToUserId`) VALUES 
( '1', 'Ticket 1: Server Downtime', 'The server went down due to a power failure. Immediate attention needed.', 'OPEN', 'HIGH', '2024-12-11 07:19:07.943', '2024-12-16 07:45:08.448', 'cm4kyacqa0000un3sotuclu6x' ),
( '2', 'Ticket 2: Website Outage', 'The website is not loading, and we need to fix the issue ASAP.', 'IN_PROGRESS', 'CRITICAL', '2024-12-11 08:30:15.350', '2024-12-11 08:45:15.200', NULL ),
( '3', 'Ticket 3: Database Backup Failure', 'The database backup failed at 2:00 AM. Investigate why it didn’t complete.', 'OPEN', 'MEDIUM', '2024-12-11 09:20:40.500', '2024-12-11 09:20:40.500', NULL ),
( '4', 'Ticket 4: Login Issues', 'Users are unable to log into the system. Need to resolve the authentication issue.', 'OPEN', 'HIGH', '2024-12-11 10:10:25.680', '2024-12-11 10:10:25.680', NULL ),
( '5', 'Ticket 5: Broken Link on Homepage', 'There is a broken link on the homepage, needs to be fixed.', 'CLOSED', 'LOW', '2024-12-11 11:00:15.780', '2024-12-11 11:05:20.430', NULL ),
( '6', 'Ticket 6: Mobile App Crash', 'The mobile app is crashing on startup. Investigate and resolve the issue.', 'IN_PROGRESS', 'CRITICAL', '2024-12-11 12:25:30.540', '2024-12-11 12:30:45.210', NULL ),
( '7', 'Ticket 7: Data Loss Report', 'A user reported data loss after a recent update. Investigate if there’s any data corruption.', 'OPEN', 'HIGH', '2024-12-11 13:15:10.260', '2024-12-11 13:15:10.260', NULL ),
( '8', 'Ticket 8: System Security Alert', 'An alert was triggered indicating a potential security breach.', 'OPEN', 'CRITICAL', '2024-12-11 14:05:25.700', '2024-12-11 14:05:25.700', NULL ),
( '9', 'Ticket 9: Feature Request: Dark Mode', 'Request to implement a dark mode theme for the application.', 'CLOSED', 'LOW', '2024-12-11 15:35:50.420', '2024-12-11 15:35:50.420', NULL ),
( '10', 'Ticket 10: Server Performance Degradation', 'The server performance has been degrading, causing delays in processing requests.', 'IN_PROGRESS', 'HIGH', '2024-12-11 16:20:15.620', '2024-12-11 16:25:10.220', NULL ),
( '11', 'Ticket 11: Backup Disk Space Alert', 'Disk space for backups is running low. Additional space needs to be provisioned.', 'OPEN', 'MEDIUM', '2024-12-11 17:45:05.330', '2024-12-11 17:45:05.330', NULL ),
( '12', 'Ticket 12: Payment Gateway Integration Issue', 'There is an issue with payment gateway integration, preventing users from making payments.', 'IN_PROGRESS', 'CRITICAL', '2024-12-11 18:30:40.440', '2024-12-11 18:40:15.120', NULL ),
( '13', 'Ticket 13: Broken API Endpoint', 'One of the API endpoints has stopped working. Needs to be investigated and fixed.', 'OPEN', 'MEDIUM', '2024-12-11 19:10:30.570', '2024-12-11 19:10:30.570', NULL ),
( '14', 'Ticket 14: User Profile Update Bug', 'Users are reporting that they cannot update their profiles on the website.', 'IN_PROGRESS', 'MEDIUM', '2024-12-11 20:00:45.780', '2024-12-11 20:05:10.480', NULL ),
( '15', 'Ticket 15: Software License Expiry', 'The license for the application is about to expire. Renew it before it expires.', 'CLOSED', 'LOW', '2024-12-11 21:25:35.890', '2024-12-11 21:30:00.200', NULL ),
( '16', 'Ticket 16: New Feature Development', 'New feature development for adding an email notification system for users.', 'OPEN', 'HIGH', '2024-12-11 22:15:10.600', '2024-12-11 22:20:30.350', NULL ),
( '17', 'Ticket 17: UI Layout Issue', 'The layout of the application UI looks broken in mobile view. Needs to be fixed.', 'IN_PROGRESS', 'LOW', '2024-12-11 23:00:05.730', '2024-12-11 23:05:15.470', NULL ),
( '18', 'Ticket 18: SSL Certificate Renewal', 'The SSL certificate is about to expire. It needs to be renewed immediately.', 'OPEN', 'CRITICAL', '2024-12-12 00:25:40.810', '2024-12-12 00:30:25.550', 'cm4kyacqa0000un3sotuclu6x' ),
( '19', 'Ticket 19: Monthly Security Update', 'Apply the latest security updates for the operating system and applications.', 'CLOSED', 'MEDIUM', '2024-12-12 01:10:20.620', '2024-12-12 01:15:00.230', NULL ),
( '20', 'Ticket 20: Hardware Failure', 'One of the servers has experienced a hardware failure. Needs immediate replacement.', 'IN_PROGRESS', 'HIGH', '2024-12-12 02:00:35.940', '2024-12-12 02:05:45.660', 'cm4kyacqa0000un3sotuclu6x' );
COMMIT;
-- ---------------------------------------------------------


-- CREATE INDEX "Ticket_assignedToUserId_fkey" -----------------
CREATE INDEX `Ticket_assignedToUserId_fkey` USING BTREE ON `ticket`( `assignedToUserId` );
-- -------------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


