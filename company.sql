-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2024 at 06:13 PM
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
-- Database: `company`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `role`, `name`, `password`) VALUES
('admin@gmail.com', 'admin', 'admin', '$2b$10$i6L9UBKyhJz0KZrfqTr6TuwfD6yUY3yc75flJy2CFc6DXgiJ2cwZe'),
('saidul115@gmail.com', 'user', 'sdadasda', ''),
('saidul11@gmail.com', 'user', 'sssiii', ''),
('saidulislamsaif789@gmail.com', 'user', 'saidul islam', '$2b$10$1I8tzFQLK2p1.cAlP.bTOuIw8lyOOMUaE08CeAFXkeNowY.4jAA9.'),
('user1@gmail.com', 'user', 'user one', '$2b$10$i6L9UBKyhJz0KZrfqTr6TuwfD6yUY3yc75flJy2CFc6DXgiJ2cwZe'),
('user2@gmail.com', 'user', 'user two', '$2b$10$i6L9UBKyhJz0KZrfqTr6TuwfD6yUY3yc75flJy2CFc6DXgiJ2cwZe'),
('user3@gmail.com', 'user', 'user three', '$2b$10$i6L9UBKyhJz0KZrfqTr6TuwfD6yUY3yc75flJy2CFc6DXgiJ2cwZe');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` varchar(255) NOT NULL,
  `post` varchar(255) NOT NULL,
  `post_image` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `post_like` varchar(255) NOT NULL,
  `create_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company-profile`
--

CREATE TABLE `company-profile` (
  `id` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_logo` varchar(255) NOT NULL,
  `background` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_linkedin` varchar(255) NOT NULL,
  `company_phone` varchar(255) NOT NULL,
  `company_facebook` varchar(255) NOT NULL,
  `company_instagram` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companyprofile`
--

CREATE TABLE `companyprofile` (
  `id` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_logo` varchar(255) NOT NULL,
  `background` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_linkedin` varchar(255) NOT NULL,
  `company_phone` varchar(255) NOT NULL,
  `company_facebook` varchar(255) NOT NULL,
  `company_instagram` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companyprofile`
--

INSERT INTO `companyprofile` (`id`, `company_name`, `company_logo`, `background`, `company_email`, `company_linkedin`, `company_phone`, `company_facebook`, `company_instagram`, `created_at`) VALUES
('8aaf8355-f12f-48fb-bc3b-0c0bbb818cf8', 'Buzz Coworksdop', 'changeLogo.png', 'login.png', 'asdasd', 'dasd56456', 'das456456', 'das4564', 'das456456', '2024-02-23 15:01:44.532');

-- --------------------------------------------------------

--
-- Table structure for table `customization`
--

CREATE TABLE `customization` (
  `id` varchar(255) NOT NULL,
  `dashboard` tinyint(1) NOT NULL,
  `members` tinyint(1) NOT NULL,
  `assets` tinyint(1) NOT NULL,
  `tasks` tinyint(1) NOT NULL,
  `message` tinyint(1) NOT NULL,
  `calender` tinyint(1) NOT NULL,
  `files` tinyint(1) NOT NULL,
  `finance` tinyint(1) NOT NULL,
  `settings` tinyint(1) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `files_upload` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `shares` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `nick_name`, `extension`, `files_upload`, `size`, `favorite`, `shares`, `created_at`) VALUES
('06e4e5d9-5e9d-4532-8a31-bf891151038c', '355077644_278802111208415_7327247331088776063_n.jpg', 'dddd', 'jpg', '355077644_278802111208415_7327247331088776063_n.jpg', '199948', 1, 'Images(1).png,bird.webp', '2024-02-09 23:40:13.446'),
('33c8bb4e-64fa-411f-bc7f-a6ad6ccff75f', 'Images(1)(1).png', 'zxczx', 'png', 'Images(1)(1).png', '700402', 0, '', '2024-02-23 10:22:10.876'),
('3a66a823-0d01-45b4-86c2-f20c9c4add99', 'niomit-1.pdf', 'pdf file', 'pdf', 'niomit-1.pdf', '922802', 0, 'bird.webpImages(1).png,b6282c58-2c0d-40e3-86bd-4e634695ec12#butterfly-a-simple-drawing-of-an-insect-with-red-wings-free-vector.jpgbird.webp', '2024-02-12 12:10:58.664'),
('3c15b7bc-a70f-44f3-9b46-9c3b06a82cb3', 'Images(1).png', 'file name', 'png', 'Images(1).png', '700402', 0, 'bird.webp', '2024-02-08 12:09:52.840'),
('635a5684-0c44-41d6-9648-9e56e952a1ad', '400299997_346309971312887_4237269279546329075_n.mp4', 'sdf', 'mp4', '400299997_346309971312887_4237269279546329075_n.mp4', '1816134', 1, '0Images(1).pngbird.webp,bird.webp,Images(1).png,bird.webp', '2024-02-12 12:17:53.219'),
('7ec15562-e226-451d-85f3-74ca04643757', 'Rectangle 24508(1).png', 'asdasd', 'png', 'Rectangle 24508(1).png', '324455', 1, 'Images(1).png,bird.webp', '2024-02-09 23:34:26.232'),
('846c1059-f509-47c5-a9f5-8fa3738fef3f', 'apple 1(4).png', 'asd', 'png', 'apple 1(4).png', '428020', 0, 'Images(1).png', '2024-02-28 12:42:40.734'),
('9ca24a0c-e558-4219-8c42-0664cea0adac', 'Images(1).png', 'mmmmm', 'png', 'Images(1).png', '700402', 1, 'Images(1).png,bird.webp', '2024-02-10 10:29:22.070'),
('b770bd89-0c24-4e05-b7b1-52e395f06181', 'birds.jpg', 'sdf', 'jpg', 'birds.jpg', '118653', 0, '', '2024-02-12 12:32:07.798'),
('bac79e4b-1f96-4e35-8797-f41fb96c844f', 'Images(1).png', 'sad', 'png', 'Images(1).png', '700402', 0, 'Images(1).png,bird.webp', '2024-02-10 00:02:24.130'),
('c0dd9d37-d5e0-412d-9164-2ddb58bc2446', '355077644_278802111208415_7327247331088776063_n.jpg', 'ffff', 'jpg', '355077644_278802111208415_7327247331088776063_n.jpg', '199948', 0, 'Images(1).png,bird.webp', '2024-02-09 23:26:50.295'),
('c3f9c6a6-6102-48cc-88aa-e5b7491035bb', 'Images(1).png', 'asd', 'png', 'Images(1).png', '700402', 0, 'bird.webp,Images(1).png', '2024-02-09 23:14:25.070'),
('ef3259d5-0e65-4392-aeb1-6645601d138b', 'Images(1).png', 'ss', 'png', 'Images(1).png', '700402', 0, 'Images(1).png', '2024-02-09 23:49:12.693'),
('fd30acaf-c0e2-4200-aefc-48185390ba27', 'image(1).png', 'ssssddd', 'png', 'image(1).png', '575', 1, 'bird.webp', '2024-02-09 23:39:52.390');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(255) NOT NULL,
  `invoiceId` varchar(255) NOT NULL,
  `member` varchar(255) NOT NULL,
  `assignment` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `paymentDate` varchar(255) NOT NULL,
  `dueDate` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `invoiceId`, `member`, `assignment`, `method`, `paymentDate`, `dueDate`, `amount`, `notes`, `created_at`) VALUES
('38db5d52-8b49-4916-8cf4-7deff5e9a3b2', 'asd', '8184e112-120f-4a63-a384-ebf1812fd4a1', 'Assign Two', '', '', '', '', 'asd', '2024-02-19 21:33:50.310');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `member_image` varchar(255) NOT NULL,
  `business_email` varchar(255) NOT NULL,
  `business_phone` varchar(255) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `member_image`, `business_email`, `business_phone`, `business_name`, `notes`, `created_at`) VALUES
('4a3c5a9f-6ae1-4a25-98ce-04e462c281ba', 'saidul', 'islam', '0136747542', 'saidulislamsaif789@gmail.com', '355077644_278802111208415_7327247331088776063_n.jpg', 'business@gmail.com', '012477545454', 'technoGaint', 'adssadsa', '2024-03-05 13:31:50.158'),
('4dd2cb8a-97f5-4ac0-92b9-77d6dbee34f2', 'sss', 'iii', '874545', 'saidul@gmail.com', 'Images(1).png', 'saidulbusiness@gmail.com', '5454', 'as', 'saidul@gmail.com', '2024-03-05 13:03:41.309'),
('5d1411e4-d30d-4cef-a3a2-90c6d8d5f285', 'sad', 'asd', 'asd', 'admin@gmail.com', 'Images(1).png', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '2024-02-08 23:07:28.645'),
('7988c0b8-1a6a-4354-ad10-1c63dfaabcde', 'ssadsas', 'dasd', 'asdasd', 'asdminassasda@gmail.com', '5-wd.webp', 'asdminassasda@gmail.com', 'asd', 'asdasd', 'a', '2024-03-05 01:09:15.761'),
('8184e112-120f-4a63-a384-ebf1812fd4a1', 'ghgf', 'fgfdg', 'dfgdfg', 'admin@gmail.com', 'bird.webp', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '2024-02-09 09:50:24.406'),
('863c13ac-9a43-4ae3-8e2a-a9af13e99f04', 'as', 'asdasd', 'admin@gmail.com', 'admin@gmail.com', '5-wd.webp', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '2024-03-05 12:40:38.672'),
('9bea2b7b-13f8-43c2-808a-1284da95384e', 'saidul', 'islam', 'asd', 'asdsa@gmail.com', 'b6282c58-2c0d-40e3-86bd-4e634695ec12#butterfly-a-simple-drawing-of-an-insect-with-red-wings-free-vector.jpg', 'asdsa@gmail.com', 'asdsa@gmail.com', 'asdsa@gmail.com', 'asdsa@gmail.com', '2024-02-09 09:49:58.275'),
('bd52af16-2f5f-45ac-bfce-586efa334916', 'sss', 'iii', '874545', 'saidul11@gmail.com', 'Images(1).png', 'saidulbusiness@gmail.com', '5454', 'as', 'saidul@gmail.com', '2024-03-05 13:04:29.593'),
('d18e34de-4a83-4618-8fc9-e006393258e8', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin12@gmail.com', 'thai_soup(1).jpg', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '2024-03-05 12:54:58.193'),
('ee6a272c-7736-433c-ad13-d3230f620071', 'sdad', 'asda', 'sdasdasd', 'saidul11@gmail.com', '01.jpg', 'saidul11@gmail.com', 'asd', 'asd', 'asdasd', '2024-03-05 13:05:34.828'),
('f6f5622c-5c88-4548-b3fb-d3453a934cd5', 'as', 'asdasd', 'admin@gmail.com', 'admin@gmail.com', '5-wd.webp', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '2024-03-05 12:40:06.397');

-- --------------------------------------------------------

--
-- Table structure for table `single-chat`
--

CREATE TABLE `single-chat` (
  `id` varchar(255) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spaces`
--

CREATE TABLE `spaces` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `space_image` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spaces`
--

INSERT INTO `spaces` (`id`, `name`, `space_image`, `size`, `rate`, `tag`, `notes`, `created_at`) VALUES
('c4e4c5a9-8596-43ec-9ed2-bb3224b2de38', 'asd', '5-wd (2).webp', '2', '4', 'dedicated', 'sadas', '2024-03-08 11:45:48.744'),
('947afb7a-2569-4205-98f5-cdea72dcf21c', 'Suite #102', 'thai_soup.jpg', '9', '44', 'dedicated', 'as asa  s', '2024-03-10 13:22:06.523');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `assign` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dueDate` varchar(255) NOT NULL,
  `task_image` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `status`, `title`, `description`, `assign`, `dueDate`, `task_image`, `created_at`) VALUES
('0bc7b4ee-d42c-4cfd-b626-b15377673a35', 'PENDING', 'one', '', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285', '2024-02-21T18:00:00.000Z', 'apple 1(3).png', '2024-02-28 13:48:17.805'),
('16efa7b9-5dc5-4a56-a3da-9642359360d5', 'DOING', 'sssss', '<p>sss</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285,9bea2b7b-13f8-43c2-808a-1284da95384e', '2024-02-28T19:50:13.742Z', 'sharma.jpg', '2024-02-29 01:57:29.045'),
('2f65d2b8-ab01-4da3-a347-54f4c118029d', 'DOING', 'two', '<p>asd</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285', '2024-02-22T18:00:00.000Z', 'apple 1(3).png', '2024-02-28 15:04:29.178'),
('31153b6b-3676-4bc1-96df-5fa535fa438f', 'PENDING', 'sdsdsd', '<p>s</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285,8184e112-120f-4a63-a384-ebf1812fd4a1', '2024-02-28T20:03:06.235Z', '', '2024-02-29 02:03:16.936'),
('3eda3a18-0188-4c97-875f-2579eda9e446', 'DONE', 'sdasd', '<p>dasdasd</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285', '2024-02-28T18:00:00.000Z', 'birds.jpg', '2024-02-29 01:31:14.687'),
('4b6ae777-6bc3-4e57-93ae-a614d86848ef', 'DOING', 'asd', '<p>asd</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285', '2024-02-28T17:49:22.569Z', 'birds(1).jpg', '2024-02-28 23:52:37.311'),
('77c42dac-8c07-4ca1-b146-09f46dcd9308', 'PENDING', 'ss', '<p>dds</p>', '5d1411e4-d30d-4cef-a3a2-90c6d8d5f285,9bea2b7b-13f8-43c2-808a-1284da95384e', '2024-02-28T20:00:30.811Z', '', '2024-02-29 02:02:30.489');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `companyprofile`
--
ALTER TABLE `companyprofile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customization`
--
ALTER TABLE `customization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
