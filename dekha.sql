-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2024 at 12:36 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `catalog`
--

CREATE TABLE `catalog` (
  `rewardID` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `RequiredPoints` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `Content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` int(11) DEFAULT NULL,
  `taskID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `TaskID` int(11) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `DueDate` date DEFAULT NULL,
  `UpdatedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CompletionDate` date DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `DateOfHire` date DEFAULT NULL,
  `Department` varchar(50) DEFAULT NULL,
  `JobTitle` varchar(50) DEFAULT NULL,
  `Role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `FirstName`, `LastName`, `DateOfBirth`, `Gender`, `EmailAddress`, `PhoneNumber`, `DateOfHire`, `Department`, `JobTitle`, `Role`) VALUES
(2, 'Mbutu', 'Nkatha', '1990-02-21', 'Male', 'mbutu.nkatha@dekha.com', '+265999765432', '2023-08-15', 'Marketing', 'Content Marketing Specialist', 'Marketing'),
(3, 'Aisha', 'Diallo', '1994-09-28', 'Female', 'aisha.diallo@dekha.com', '+265999123456', '2021-12-08', 'Finance', 'Investment Analyst', 'Finance'),
(4, 'Musa', 'Kamara', '1988-04-17', 'Male', 'musa.kamara@dekha.com', '+265999567890', '2020-07-20', 'HR', 'Compensation & Benefits Specialist', 'HR'),
(5, 'Nneka', 'Obiora', '1992-01-05', 'Female', 'nneka.obiora@dekha.com', '+265999987654', '2023-02-10', 'IT', 'Software Engineer', 'Developer'),
(6, 'Themba', 'Dlamini', '1986-10-25', 'Male', 'themba.dlamini@dekha.com', '+265999345678', '2021-09-18', 'Sales', 'Business Development Representative', 'Sales'),
(7, 'Makena', 'Moyo', '1991-06-12', 'Female', 'makena.moyo@dekha.com', '+265999765432', '2022-03-05', 'Marketing', 'Social Media Marketing Manager', 'Marketing'),
(8, 'Mohamed', 'Keïta', '1989-12-31', 'Male', 'mohamed.keita@dekha.com', '+265999123456', '2020-11-15', 'Finance', 'Auditor', 'Finance'),
(9, 'Amina', 'Sissoko', '1993-08-07', 'Female', 'amina.sissoko@dekha.com', '+265999567890', '2023-04-22', 'HR', 'HR Generalist', 'HR'),
(10, 'Emeka', 'Ojukwu', '1987-03-14', 'Male', 'emeka.ojukwu@dekha.com', '+265999987654', '2021-01-28', 'IT', 'Network Administrator', 'Developer'),
(11, 'Thandiwe', 'Mthembu', '1992-11-23', 'Female', 'thandiwe.mthembu@dekha.com', '+265999345678', '2022-06-10', 'Sales', 'Sales Associate', 'Sales'),
(12, 'Abasi', 'Lawal', '1988-07-09', 'Male', 'abasi.lawal@dekha.com', '+265999765432', '2020-04-12', 'Marketing', 'Marketing Analyst', 'Marketing'),
(13, 'Fanta', 'Camara', '1995-02-18', 'Female', 'fanta.camara@dekha.com', '+265999123456', '2023-09-05', 'Finance', 'Auditor', 'Finance'),
(14, 'Tamari', 'Mkandawire', '1990-01-08', 'Female', 'tamari.mkandawire@dekha.com', '+265999345678', '2022-05-12', 'Operations', 'Logistics Coordinator', 'Operations'),
(15, 'Chifundo', 'Banda', '1994-02-21', 'Male', 'chifundo.banda@dekha.com', '+265999765432', '2023-08-04', 'Customer Service', 'Customer Support Specialist', 'Customer Service'),
(16, 'Thandizo', 'Chiponde', '1988-08-30', 'Female', 'thandizo.chiponde@dekha.com', '+265999123456', '2021-02-10', 'Marketing', 'Content Marketing Specialist', 'Marketing'),
(17, 'Takondwa', 'Phiri', '1992-04-17', 'Male', 'takondwa.phiri@dekha.com', '+265999567890', '2023-04-20', 'Sales', 'Regional Sales Manager', 'Sales'),
(18, 'Chisomo', 'Mhango', '1989-12-05', 'Female', 'chisomo.mhango@dekha.com', '+265999987654', '2022-10-25', 'Human Resources', 'HR Assistant', 'Human Resources'),
(19, 'Gift', 'Kamwendo', '1993-07-14', 'Male', 'gift.kamwendo@dekha.com', '+265999345678', '2021-06-15', 'IT', 'Network Administrator', 'IT'),
(20, 'Mtendere', 'Kadzamira', '1987-03-23', 'Female', 'mtendere.kadzamira@dekha.com', '+265999765432', '2023-02-08', 'Finance', 'Accounting Assistant', 'Finance'),
(21, 'Tawonga', 'Jumbe', '1991-11-01', 'Male', 'tawonga.jumbe@dekha.com', '+265999123456', '2022-08-18', 'Management', 'Project Manager', 'Management'),
(22, 'Lindiwe', 'Kachali', '1986-06-28', 'Female', 'lindiwe.kachali@dekha.com', '+265999567890', '2021-01-22', 'Marketing', 'Marketing Analyst', 'Marketing'),
(23, 'Tawanda', 'Mkumbira', '1990-02-15', 'Male', 'tawanda.mkumbira@dekha.com', '+265999987654', '2023-03-17', 'Sales', 'Business Development Representative', 'Sales'),
(24, 'Thandie', 'Mbewe', '1994-09-27', 'Female', 'thandie.mbewe@dekha.com', '+265999345678', '2022-04-05', 'Human Resources', 'Recruiter', 'Human Resources'),
(25, 'Chipiliro', 'Chingale', '1988-05-12', 'Male', 'chipiliro.chingale@dekha.com', '+265999765432', '2021-11-21', 'IT', 'Software Developer', 'IT'),
(26, 'Chancy', 'Kalebe', '1992-01-04', 'Female', 'chancy.kalebe@dekha.com', '+265999123456', '2023-07-17', 'Sales', 'Business Development Representative', 'Sales'),
(27, 'Thandiwe', 'Banda', '1990-01-08', 'Female', 'thandiwe.banda@dekha.com', '+265999345678', '2022-06-15', 'IT', 'Network Administrator', 'Developer'),
(28, 'Chifundo', 'Mkandawire', '1994-02-21', 'Male', 'chifundo.mkandawire@dekha.com', '+265999765432', '2023-04-20', 'HR', 'Benefits Specialist', 'HR'),
(30, 'Tamvani', 'Chilumba', '1992-05-17', 'Male', 'tamvani.chilumba@dekha.com', '+265999567890', '2023-01-25', 'Marketing', 'Content Marketing Specialist', 'Marketing'),
(31, 'Zainabu', 'Mhango', '1986-12-28', 'Female', 'zainabu.mhango@dekha.com', '+265999987654', '2020-08-15', 'Finance', 'Auditor', 'Finance'),
(32, 'Chipiliro', 'Kachali', '1991-07-14', 'Male', 'chipiliro.kachali@dekha.com', '+265999345678', '2022-03-05', 'IT', 'Software Developer', 'Developer'),
(33, 'Chisomo', 'Jumbe', '1995-04-25', 'Female', 'chisomo.jumbe@dekha.com', '+265999765432', '2023-05-12', 'HR', 'Compensation Analyst', 'HR'),
(34, 'Luckson', 'Mkhize', '1989-11-18', 'Male', 'luckson.mkhize@dekha.com', '+265999123456', '2021-02-20', 'Sales', 'Sales Representative', 'Sales'),
(35, 'Esnath', 'Kadzamira', '1993-08-07', 'Female', 'esnath.kadzamira@dekha.com', '+265999567890', '2023-02-08', 'Marketing', 'Social Media Analyst', 'Marketing'),
(36, 'Tadikira', 'Mwale', '1987-05-03', 'Male', 'tadikira.mwale@dekha.com', '+265999987654', '2020-11-10', 'Finance', 'Investment Analyst', 'Finance'),
(37, 'Chichewa', 'Matemba', '1990-03-12', 'Female', 'chichewa.matemba@dekha.com', '+265999345678', '2022-09-20', 'IT', 'Database Administrator', 'Developer'),
(38, 'Gift', 'Munthali', '1994-10-28', 'Male', 'gift.munthali@dekha.com', '+265999765432', '2023-06-18', 'HR', 'HR Generalist', 'HR'),
(39, 'Tamandwa', 'Kamanga', '1988-07-05', 'Female', 'tamandwa.kamanga@dekha.com', '+265999123456', '2021-01-15', 'Sales', 'Sales Representative', 'Sales'),
(40, 'Patience', 'Malinga', '1985-11-23', 'Female', 'patience.malinga@dekha.com', '+265999234567', '2020-04-15', 'HR', 'HR Business Partner', 'HR'),
(41, 'Chimwemwe', 'Banda', '1992-03-17', 'Male', 'chimwemwe.banda@dekha.com', '+265999876543', '2022-07-10', 'IT', 'Systems Engineer', 'Developer'),
(42, 'Grace', 'Kadango', '1988-07-05', 'Female', 'grace.kadango@dekha.com', '+265999456789', '2021-11-25', 'Sales', 'Key Account Manager', 'Sales'),
(43, 'Maxwell', 'Kamwendo', '1995-02-18', 'Male', 'maxwell.kamwendo@dekha.com', '+265999678901', '2023-03-12', 'Marketing', 'Digital Marketing Analyst', 'Marketing'),
(44, 'Madalitso', 'Phiri', '1987-09-12', 'Female', 'madalitso.phiri@dekha.com', '+265999123456', '2020-06-22', 'Finance', 'Financial Controller', 'Finance'),
(45, 'Kondwani', 'Mtumodzi', '1991-06-05', 'Male', 'kondwani.mtumodzi@dekha.com', '+265999567890', '2022-09-18', 'IT', 'Database Administrator', 'Developer'),
(46, 'Tasila', 'Mhone', '1989-12-10', 'Female', 'tasila.mhone@dekha.com', '+265999987654', '2021-03-05', 'HR', 'Talent Acquisition Specialist', 'HR'),
(47, 'Levison', 'Chidzanja', '1993-08-22', 'Male', 'levison.chidzanja@dekha.com', '+265999345678', '2023-01-25', 'Sales', 'Sales Operations Manager', 'Sales'),
(48, 'Felistas', 'Chirwa', '1986-04-15', 'Female', 'felistas.chirwa@dekha.com', '+265999765432', '2020-11-15', 'Marketing', 'Brand Manager', 'Marketing'),
(49, 'Chikondi', 'Chiumia', '1990-11-30', 'Male', 'chikondi.chiumia@dekha.com', '+265999123456', '2022-04-08', 'IT', 'IT Support Specialist', 'Developer'),
(50, 'Mercy', 'Phiri', '1988-07-08', 'Female', 'mercy.phiri@dekha.com', '+265999567890', '2021-02-15', 'Finance', 'Financial Analyst', 'Finance'),
(51, 'Ephraim', 'Mkumbira', '1992-03-25', 'Male', 'ephraim.mkumbira@dekha.com', '+265999987654', '2023-05-12', 'HR', 'Compensation & Benefits Specialist', 'HR'),
(52, 'Chimwemwe', 'Kamzati', '1985-10-10', 'Female', 'chimwemwe.kamzati@dekha.com', '+265999345678', '2020-09-25', 'Sales', 'Sales Coordinator', 'Sales'),
(53, 'Charles', 'Malinga', '1991-06-18', 'Male', 'charles.malinga@dekha.com', '+265999765432', '2022-01-10', 'Marketing', 'Market Research Analyst', 'Marketing'),
(54, 'Madalitso', 'Banda', '1987-03-05', 'Female', 'madalitso.banda@dekha.com', '+265999123456', '2021-08-20', 'IT', 'Data Analyst', 'Developer'),
(55, 'Kondwani', 'Mkandawire', '1994-12-03', 'Male', 'kondwani.mkandawire@dekha.com', '+265999567890', '2023-02-15', 'Finance', 'Budget Analyst', 'Finance'),
(56, 'Tasila', 'Kadango', '1986-09-22', 'Female', 'tasila.kadango@dekha.com', '+265999987654', '2020-07-25', 'HR', 'Training & Development Specialist', 'HR'),
(57, 'Levison', 'Kamwendo', '1993-05-10', 'Male', 'levison.kamwendo@dekha.com', '+265999345678', '2022-03-18', 'Sales', 'Sales Support', 'Sales'),
(58, 'Felistas', 'Phiri', '1988-02-17', 'Female', 'felistas.phiri@dekha.com', '+265999765432', '2021-01-10', 'Marketing', 'Digital Marketing Coordinator', 'Marketing'),
(59, 'Chikondi', 'Mtumodzi', '1991-09-05', 'Male', 'chikondi.mtumodzi@dekha.com', '+265999123456', '2020-05-22', 'IT', 'IT Helpdesk', 'Developer'),
(60, 'Mercy', 'Mhone', '1985-06-15', 'Female', 'mercy.mhone@dekha.com', '+265999567890', '2022-11-28', 'Finance', 'Financial Advisor', 'Finance'),
(61, 'Ephraim', 'Chidzanja', '1994-03-12', 'Male', 'ephraim.chidzanja@dekha.com', '+265999987654', '2023-04-15', 'HR', 'Recruitment Specialist', 'HR'),
(62, 'Chimwemwe', 'Chirwa', '1987-10-25', 'Female', 'chimwemwe.chirwa@dekha.com', '+265999345678', '2021-03-10', 'Sales', 'Sales \nCoordinator', 'Sales'),
(63, 'Charles', 'Chiumia', '1992-01-18', 'Male', 'charles.chiumia@dekha.com', '+265999765432', '2020-12-05', 'Marketing', 'Social Media Specialist', 'Marketing'),
(64, 'Madalitso', 'Mkumbira', '1989-08-03', 'Female', 'madalitso.mkumbira@dekha.com', '+265999123456', '2022-07-20', 'IT', 'Software Developer', 'Developer'),
(65, 'Kondwani', 'Kamzati', '1995-04-15', 'Male', 'kondwani.kamzati@dekha.com', '+265999567890', '2023-06-12', 'Finance', 'Risk Analyst', 'Finance'),
(66, 'Tasila', 'Phiri', '1988-11-28', 'Female', 'tasila.phiri@dekha.com', '+2659988773311', '2021-01-15', 'Sales', 'Sales Representative', 'Sales'),
(67, 'Peter', 'Banda', '1985-11-23', 'Male', 'peter.banda@dekha.com', '+265999234567', '2020-04-15', 'IT', 'Systems Analyst', 'Developer'),
(68, 'Chimwemwe', 'Malinga', '1992-03-17', 'Male', 'chimwemwe.malinga@dekha.com', '+265999876543', '2022-07-10', 'HR', 'HR Manager', 'Manager'),
(69, 'Maxwell', 'Kadango', '1988-07-05', 'Male', 'maxwell.kadango@dekha.com', '+265999456789', '2021-11-25', 'Sales', 'Sales Director', 'Sales'),
(70, 'Kondwani', 'Kamwendo', '1995-02-18', 'Male', 'kondwani.kamwendo@dekha.com', '+265999678901', '2023-03-12', 'Marketing', 'Marketing Director', 'Marketing'),
(71, 'Levison', 'Phiri', '1987-09-12', 'Male', 'levison.phiri@dekha.com', '+265999123456', '2020-06-22', 'Finance', 'Financial Director', 'Finance'),
(72, 'Ephraim', 'Mtumodzi', '1991-06-05', 'Male', 'ephraim.mtumodzi@dekha.com', '+265999567890', '2022-09-18', 'IT', 'Network Engineer', 'Developer'),
(73, 'Chikondi', 'Mhone', '1989-12-10', 'Male', 'chikondi.mhone@dekha.com', '+265999987654', '2021-03-05', 'HR', 'HR Business Partner', 'HR'),
(74, 'Charles', 'Chidzanja', '1993-08-22', 'Male', 'charles.chidzanja@dekha.com', '+265999345678', '2023-01-25', 'Sales', 'Sales Manager', 'Sales'),
(75, 'Peter', 'Chirwa', '1986-04-15', 'Male', 'peter.chirwa@dekha.com', '+265999765432', '2020-11-15', 'Marketing', 'Digital Marketing Manager', 'Marketing'),
(76, 'Mike', 'Chiumia', '1990-11-30', 'Male', 'mike.chiumia@dekha.com', '+265999123456', '2022-04-08', 'IT', 'IT Support Manager', 'Developer'),
(77, 'Emmanuel', 'Phiri', '1988-07-08', 'Male', 'emmanuel.phiri@dekha.com', '+265999567890', '2021-02-15', 'Finance', 'Financial Analyst', 'Finance'),
(78, 'Kondwani', 'Mkumbira', '1992-03-25', 'Male', 'kondwani.mkumbira@dekha.com', '+265999987654', '2023-05-12', 'HR', 'HR Generalist', 'HR'),
(79, 'Levison', 'Kamzati', '1985-10-10', 'Male', 'levison.kamzati@dekha.com', '+265999345678', '2020-09-25', 'Sales', 'Sales Representative', 'Sales'),
(80, 'Ephraim', 'Malinga', '1991-06-18', 'Male', 'ephraim.malinga@dekha.com', '+265999765432', '2022-01-10', 'Marketing', 'Market Research Analyst', 'Marketing'),
(82, 'Charles', 'Mkandawire', '1994-12-03', 'Male', 'charles.mkandawire@dekha.com', '+265999567890', '2023-02-15', 'Finance', 'Accountant', 'Finance'),
(83, 'Peter', 'Kadango', '1986-09-22', 'Male', 'peter.kadango@dekha.com', '+265999987654', '2020-07-25', 'HR', 'HR Coordinator', 'HR'),
(84, 'Mike', 'Kamwendo', '1993-05-10', 'Male', 'mike.kamwendo@dekha.com', '+265999345678', '2022-03-18', 'Sales', 'Sales Coordinator', 'Sales'),
(87, 'Levison', 'Mhone', '1985-06-15', 'Male', 'levison.mhone@dekha.com', '+265999567890', '2022-11-28', 'Finance', 'Financial Advisor', 'Finance'),
(91, 'Peter', 'Mkumbira', '1989-08-03', 'Male', 'peter.mkumbira@dekha.com', '+265999123456', '2022-07-20', 'IT', 'Database Administrator', 'Developer'),
(92, 'Mike', 'Kamzati', '1995-04-15', 'Male', 'mike.kamzati@dekha.com', '+265999567890', '2023-06-12', 'Finance', 'Risk Manager', 'Finance');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`rewardID`);

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
  ADD PRIMARY KEY (`TaskID`),
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
  MODIFY `rewardID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`taskID`) REFERENCES `tasks` (`TaskID`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
