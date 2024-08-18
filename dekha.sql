-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2024 at 11:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dekha`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser` (IN `p_userID` INT(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_dateOfBirth` DATE, IN `p_gender` VARCHAR(10), IN `p_emailAddress` VARCHAR(100), IN `p_phoneNumber` VARCHAR(20), IN `p_dateOfHire` DATE, IN `p_department` VARCHAR(50), IN `p_jobTitle` VARCHAR(50), IN `p_role` VARCHAR(50))   BEGIN
INSERT INTO users (firstName, lastName, dateOfBirth, gender, emailAddress, phoneNumber, dateOfHire, department, jobTitle, role) VALUES (p_firstName, p_lastName, p_dateOfBirth, p_gender, p_emailAddress, p_phoneNumber, p_dateOfHire, p_department, p_jobTitle, p_role);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `p_userID` VARCHAR(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_dateOfBirth` DATE, IN `p_gender` VARCHAR(10), IN `p_emailAddress` VARCHAR(100), IN `p_phoneNumber` VARCHAR(20), IN `p_dateOfHire` DATE, IN `p_department` VARCHAR(50), IN `p_jobTitle` VARCHAR(50), IN `p_role` VARCHAR(50))   BEGIN
UPDATE users
SET firstName = p_firstName,
    lastName = p_lastName,
    dateOfBirth = p_dateOfBirth,
    gender = p_gender,
    emailAddress = p_emailAddress,
    phoneNumber = p_phoneNumber,
    dateOfHire = p_dateOfHire,
    department = p_department,
    jobTitle = p_jobTitle,
    role = p_role
WHERE userID = _userID;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `catalog`
--
-- Error reading structure for table dekha.catalog: #1932 - Table &#039;dekha.catalog&#039; doesn&#039;t exist in engine
-- Error reading data for table dekha.catalog: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `dekha`.`catalog`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--
-- Error reading structure for table dekha.comments: #1932 - Table &#039;dekha.comments&#039; doesn&#039;t exist in engine
-- Error reading data for table dekha.comments: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `dekha`.`comments`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--
-- Error reading structure for table dekha.tasks: #1932 - Table &#039;dekha.tasks&#039; doesn&#039;t exist in engine
-- Error reading data for table dekha.tasks: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `dekha`.`tasks`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Error reading structure for table dekha.users: #1932 - Table &#039;dekha.users&#039; doesn&#039;t exist in engine
-- Error reading data for table dekha.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `dekha`.`users`&#039; at line 1
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
