-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 12 jan 2022 kl 22:06
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `quote_machine`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `Quotes`
--

CREATE TABLE `Quotes` (
  `quote` longtext NOT NULL,
  `quoteID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Quotes`
--

INSERT INTO `Quotes` (`quote`, `quoteID`, `userID`) VALUES
('Du kan aldrig korsa havet innan du har modet att tappa sikten av land.', '25ea3cd5-aa7e-4b79-9c67-3e3c86b519c2', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
('\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"', '3455700c-babb-47c8-9472-edf3c413b682', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
('Kom alltid ihåg att ditt eget beslut att lyckas är viktigare än någonting annat.', '3916fbb4-d722-4f36-ab76-783d4191f13e', 'd9ac02f3-c4a8-4c03-8234-dd5be1a77229'),
('Be yourself; everyone else is already taken― Oscar Wilde', '55088d7f-88c6-4207-a5f0-8e0e20afc62d', '06dc9752-068b-478b-8f98-f9bba0c2c4b4'),
('So many books, so little time. ― Frank Zappa', 'a9e7fc03-1427-4d2e-8ea6-3c1d655139de', '06dc9752-068b-478b-8f98-f9bba0c2c4b4'),
('Lycka är inte något färdiggjort. Det kommer från dina egna handlingar.', 'f1775da5-ab04-44e9-8d25-447ac193c393', '9fd35bb0-823d-4960-a73e-54bff45c314e');

-- --------------------------------------------------------

--
-- Tabellstruktur `Ratings`
--

CREATE TABLE `Ratings` (
  `rating` double NOT NULL,
  `quoteID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Ratings`
--

INSERT INTO `Ratings` (`rating`, `quoteID`, `userID`) VALUES
(5, '3916fbb4-d722-4f36-ab76-783d4191f13e', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
(3, '55088d7f-88c6-4207-a5f0-8e0e20afc62d', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
(1, 'a9e7fc03-1427-4d2e-8ea6-3c1d655139de', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
(1.5, 'f1775da5-ab04-44e9-8d25-447ac193c393', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
(5, '3455700c-babb-47c8-9472-edf3c413b682', '36e59791-7813-4bb4-b4b2-712a0db97298'),
(2, '25ea3cd5-aa7e-4b79-9c67-3e3c86b519c2', '36e59791-7813-4bb4-b4b2-712a0db97298'),
(5, '55088d7f-88c6-4207-a5f0-8e0e20afc62d', '36e59791-7813-4bb4-b4b2-712a0db97298'),
(0.5, 'f1775da5-ab04-44e9-8d25-447ac193c393', '36e59791-7813-4bb4-b4b2-712a0db97298'),
(4, '25ea3cd5-aa7e-4b79-9c67-3e3c86b519c2', '36e59791-7813-4bb4-b4b2-712a0db97298'),
(5, '25ea3cd5-aa7e-4b79-9c67-3e3c86b519c2', '36e59791-7813-4bb4-b4b2-712a0db97298');

-- --------------------------------------------------------

--
-- Ersättningsstruktur för vy `top_5_voted`
-- (See below for the actual view)
--
CREATE TABLE `top_5_voted` (
`username` varchar(255)
,`quote` longtext
,`avgRating` double
,`rateCount` bigint(21)
);

-- --------------------------------------------------------

--
-- Tabellstruktur `Users`
--

CREATE TABLE `Users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `Users`
--

INSERT INTO `Users` (`username`, `password`, `userID`) VALUES
('kalle', '123456789', '06dc9752-068b-478b-8f98-f9bba0c2c4b4'),
('lasse', '123456789', '36e59791-7813-4bb4-b4b2-712a0db97298'),
('frasse', '123456789', '6ad8eb28-1a15-451c-9233-8e4cbe2c2868'),
('ralle', '123456789', '9fd35bb0-823d-4960-a73e-54bff45c314e'),
('nalle', '123456789', 'd9ac02f3-c4a8-4c03-8234-dd5be1a77229');

-- --------------------------------------------------------

--
-- Struktur för vy `top_5_voted`
--
DROP TABLE IF EXISTS `top_5_voted`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top_5_voted`  AS SELECT `users`.`username` AS `username`, `quotes`.`quote` AS `quote`, avg(`ratings`.`rating`) AS `avgRating`, count(`quotes`.`quoteID`) AS `rateCount` FROM ((`quotes` join `users` on((`users`.`userID` = `quotes`.`userID`))) join `ratings` on((`quotes`.`quoteID` = `ratings`.`quoteID`))) GROUP BY `quotes`.`quoteID` ORDER BY `rateCount` DESC LIMIT 0, 5 ;

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Quotes`
--
ALTER TABLE `Quotes`
  ADD PRIMARY KEY (`quoteID`,`userID`);

--
-- Index för tabell `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
