-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2024 at 08:16 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser` (IN `p_userID` VARCHAR(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_dateOfBirth` DATE, IN `p_gender` VARCHAR(10), IN `p_emailAddress` VARCHAR(100), IN `p_phoneNumber` VARCHAR(20), IN `p_dateOfHire` DATE, IN `p_department` VARCHAR(50), IN `p_jobTitle` VARCHAR(50), IN `p_role` VARCHAR(50))   BEGIN
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

CREATE TABLE `catalog` (
  `catalogID` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `requiredPoints` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`catalogID`, `title`, `description`, `requiredPoints`) VALUES
(1, 'Amazon Gift Card', 'Redeem for an Amazon gift card.', 500),
(2, 'Smartphone', 'Latest model smartphone.', 3000),
(3, 'Laptop', 'High-performance laptop for work or personal use.', 5000),
(4, 'Weekend Getaway', 'Enjoy a relaxing weekend at a luxurious resort.', 2000),
(5, 'Concert Tickets', 'Tickets to an upcoming concert.', 800),
(6, 'Dining Voucher', 'Enjoy a delicious meal at a fine dining restaurant.', 500),
(7, 'Online Leadership Course', 'Enhance your leadership skills with this online course.', 1000),
(8, 'Conference Ticket', 'Attend a professional conference in your field.', 1500),
(9, 'Project Management Certification', 'Earn a project management certification.', 2500);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` int(11) DEFAULT NULL,
  `taskID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskID` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `dueDate` date DEFAULT NULL,
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completionDate` date DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`taskID`, `title`, `description`, `createdDate`, `dueDate`, `updatedDate`, `completionDate`, `userID`) VALUES
(1, 'Screen resumes for Marketing position', 'Review resumes for marketing roles, shortlist candidates based on qualifications.', '2024-08-19 06:09:29', '2024-10-15', '2024-08-19 06:09:29', NULL, 1),
(2, 'Source candidates for Sales role', 'Utilize job boards and social media to find potential sales candidates.', '2024-08-19 06:09:29', '2024-11-30', '2024-08-19 06:09:29', NULL, 2),
(3, 'Develop new HRIS report', 'Create a report on employee turnover rates by department.', '2024-08-19 06:09:29', '2024-12-15', '2024-08-19 06:09:29', NULL, 3),
(4, 'Review salary structure for engineering roles', 'Analyze market data and adjust salary bands for engineering positions.', '2024-08-19 06:09:29', '2024-11-01', '2024-08-19 06:09:29', NULL, 4),
(5, 'Investigate employee complaint', 'Conduct a thorough investigation into a complaint filed by an employee in the sales department.', '2024-08-19 06:09:29', '2024-10-25', '2024-08-19 06:09:29', NULL, 5),
(6, 'Develop leadership training program', 'Create a training curriculum for developing emerging leaders.', '2024-08-19 06:09:29', '2024-12-31', '2024-08-19 06:09:29', NULL, 6),
(7, 'Develop HR strategy for new client', 'Create an HR strategy aligned with the clients business objectives.', '2024-08-19 06:09:29', '2024-11-15', '2024-08-19 06:09:29', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `dateOfHire` date DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `dateOfBirth`, `gender`, `emailAddress`, `phoneNumber`, `dateOfHire`, `department`, `jobTitle`, `role`) VALUES
(1, 'Peter', 'Banda', '1985-11-23', 'Male', 'peter.banda@dekha.com', '+265999234567', '2020-04-15', 'HRIS', 'HRIS Manager', 'Manager'),
(2, 'Chimwemwe', 'Malinga', '1992-03-17', 'Male', 'chimwemwe.malinga@dekha.com', '+265999876543', '2022-07-10', 'Recruitment', 'Recruitment Manager', 'Manager'),
(3, 'Maxwell', 'Kadango', '1988-07-05', 'Male', 'maxwell.kadango@dekha.com', '+265999456789', '2021-11-25', 'Finance', 'Financial Analyst', 'Analyst'),
(4, 'Kondwani', 'Kamwendo', '1995-02-18', 'Male', 'kondwani.kamwendo@dekha.com', '+265999678901', '2023-03-12', 'Marketing', 'Marketing Director', 'Director'),
(5, 'Levison', 'Phiri', '1987-09-12', 'Male', 'levison.phiri@dekha.com', '+265999123456', '2020-06-22', 'Finance', 'Accountant', 'Finance'),
(6, 'Ephraim', 'Mtumodzi', '1991-06-05', 'Male', 'ephraim.mtumodzi@dekha.com', '+265999567890', '2022-09-18', 'Risk', 'Risk Manager', 'Manager'),
(7, 'Chikondi', 'Mhone', '1989-12-10', 'Male', 'chikondi.mhone@dekha.com', '+265999987654', '2021-03-05', 'Legal', 'Company Secretary', 'Advisor'),
(8, 'Charles', 'Chidzanja', '1993-08-22', 'Male', 'charles.chidzanja@dekha.com', '+265999345678', '2023-01-25', 'HR', 'Training Manager', 'Manager'),
(9, 'Mike', 'Chiumia', '1990-11-30', 'Male', 'mike.chiumia@dekha.com', '+265999123456', '2022-04-08', 'HRIS', 'HRIS Manager', 'Manager'),
(10, 'Emmanuel', 'Phiri', '1988-07-08', 'Male', 'emmanuel.phiri@dekha.com', '+265999567890', '2021-02-15', 'Finance', 'Compensation', 'Finance'),
(11, 'Kondwani', 'Mkumbira', '1992-03-25', 'Male', 'kondwani.mkumbira@dekha.com', '+265999987654', '2023-05-12', 'HR', 'Employee Relations Manager', 'HR'),
(12, 'Levison', 'Kamzati', '1985-10-10', 'Male', 'levison.kamzati@dekha.com', '+265999345678', '2020-09-25', 'HRIS', 'Data Analyst', 'Analyst'),
(13, 'Ephraim', 'Malinga', '1991-06-18', 'Male', 'ephraim.malinga@dekha.com', '+265999765432', '2022-01-10', 'Marketing', 'Market Research Analyst', 'Analyst'),
(14, 'Chimwemwe', 'Banda', '1987-03-05', 'Male', 'chimwemwe.banda@dekha.com', '+265999123456', '2021-08-20', 'IT', 'Software Developer', 'Developer'),
(15, 'Charles', 'Mkandawire', '1994-12-03', 'Male', 'charles.mkandawire@dekha.com', '+265999567890', '2023-02-15', 'Finance', 'Accountant', 'Finance'),
(16, 'Peter', 'Kadango', '1986-09-22', 'Male', 'peter.kadango@dekha.com', '+265999987654', '2020-07-25', 'HR', 'Benefits Specialist', 'HR'),
(17, 'Mike', 'Kamwendo', '1993-05-10', 'Male', 'mike.kamwendo@dekha.com', '+265999345678', '2022-03-18', 'Recruitment', 'Talent Specialist', 'Recruitment'),
(18, 'Emmanuel', 'Phiri', '1988-02-17', 'Male', 'emmanuel.phiri@dekha.com', '+265999765432', '2021-01-10', 'Marketing', 'Social Media Manager', 'Marketing'),
(19, 'Kondwani', 'Mtumodzi', '1991-09-05', 'Male', 'kondwani.mtumodzi@dekha.com', '+265999123456', '2020-05-22', 'Recruitment', 'Coordinator', 'Recruitment'),
(20, 'Levison', 'Mhone', '1985-06-15', 'Male', 'levison.mhone@dekha.com', '+265999567890', '2022-11-28', 'Finance', 'Financial Advisor', 'Finance'),
(21, 'Ephraim', 'Chidzanja', '1994-03-12', 'Male', 'ephraim.chidzanja@dekha.com', '+265999987654', '2023-04-15', 'Risk', 'Recruitment Officer', 'HR'),
(22, 'Chimwemwe', 'Chirwa', '1987-10-25', 'Male', 'chimwemwe.chirwa@dekha.com', '+265999345678', '2021-03-10', 'Sales', 'Sales Analyst', 'Analyst'),
(23, 'Charles', 'Chiumia', '1992-01-18', 'Male', 'charles.chiumia@dekha.com', '+265999765432', '2020-12-05', 'Marketing', 'Digital Marketing Analyst', 'Analyst'),
(24, 'Peter', 'Mkumbira', '1989-08-03', 'Male', 'peter.mkumbira@dekha.com', '+265999123456', '2022-07-20', 'HRIS', 'Database Administrator', 'Developer'),
(25, 'Mike', 'Kamzati', '1995-04-15', 'Male', 'mike.kamzati@dekha.com', '+265999567890', '2023-06-12', 'Finance', 'Financial Analyst', 'Analyst'),
(26, 'Emmanuel', 'Phiri', '1988-11-28', 'Male', 'emmanuel.phiri@dekha.com', '+265999987654', '2021-01-25', 'HR', 'Development Officer', 'HR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`catalogID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `taskID` (`taskID`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `catalogID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`taskID`) REFERENCES `tasks` (`taskID`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
