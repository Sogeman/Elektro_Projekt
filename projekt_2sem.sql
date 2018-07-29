-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Jul 2018 um 20:21
-- Server-Version: 10.1.31-MariaDB
-- PHP-Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `projekt_2sem`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `circuitbreakers`
--

CREATE TABLE `circuitbreakers` (
  `id` int(11) UNSIGNED NOT NULL,
  `floors_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `devices`
--

CREATE TABLE `devices` (
  `id` int(11) UNSIGNED NOT NULL,
  `rooms_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `devices`
--

INSERT INTO `devices` (`id`, `rooms_id`, `name`, `created`) VALUES
(1, 1, 'Leuchte E27', '2018-07-24 15:56:03'),
(2, 2, 'Gerät 2.2', '2018-07-24 15:56:54'),
(3, 2, 'Gerät 2.2.2', '2018-07-24 15:57:47'),
(4, 3, 'Gerät 1.1.1', '2018-07-24 15:58:21'),
(5, 1, 'Leuchte E27', '2018-07-28 17:24:38'),
(10, 1, 'Leuchte E14', '2018-07-28 17:37:39'),
(13, 1, 'Rollo', '2018-07-28 17:43:22'),
(14, 1, 'Leuchte E27', '2018-07-28 17:46:50'),
(15, 4, 'Rollo', '2018-07-28 17:51:11'),
(19, 1, 'Leuchte E27', '2018-07-28 21:35:02'),
(20, 2, 'Steckdose 230V', '2018-07-28 21:39:05');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `floors`
--

CREATE TABLE `floors` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `floor_count_from_basement` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `floors`
--

INSERT INTO `floors` (`id`, `projects_id`, `floor_count_from_basement`, `name`, `created`) VALUES
(1, 1, 0, 'Stockwerk 0', '2018-07-24 15:46:49'),
(2, 2, 0, 'Stockwerk 2', '2018-07-24 15:46:59'),
(3, 3, 0, 'Keller, Haus 3', '2018-07-28 17:50:39'),
(4, 1, 0, 'Keller', '2018-07-29 06:34:22');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fuses`
--

CREATE TABLE `fuses` (
  `id` int(11) UNSIGNED NOT NULL,
  `circuitbreakers_id` int(11) UNSIGNED NOT NULL,
  `rooms_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `projects`
--

INSERT INTO `projects` (`id`, `name`, `created`) VALUES
(1, 'Haus 1', '2018-07-24 15:46:22'),
(2, 'Haus 2', '2018-07-24 15:46:36'),
(3, 'Haus 3', '2018-07-28 17:50:19');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) UNSIGNED NOT NULL,
  `floors_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `rooms`
--

INSERT INTO `rooms` (`id`, `floors_id`, `name`, `created`) VALUES
(1, 1, 'Zimmer 1 ', '2018-07-24 15:47:30'),
(2, 2, 'Zimmer 2', '2018-07-24 15:47:43'),
(3, 1, 'Zimmer 11', '2018-07-24 15:58:10'),
(4, 3, 'Folterkammer, Haus 3', '2018-07-28 17:50:56'),
(5, 2, 'test', '2018-07-28 21:38:47');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE `sensors` (
  `id` int(11) NOT NULL,
  `devices_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `unit` varchar(255) CHARACTER SET utf8 NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `devices_id`, `name`, `unit`, `value`, `created`) VALUES
(1, 1, 'Lichtsensor', 'ein', 'aus', '2018-07-24 15:56:38'),
(2, 2, 'Sensor 2.2.2', '', '', '2018-07-24 15:57:10'),
(3, 1, 'Sensor 1.1', '', '', '2018-07-24 15:57:28'),
(4, 4, 'Sensor 1.1.1.1', '', '', '2018-07-28 15:54:48'),
(6, 14, 'Lichtschalter', '', '', '2018-07-28 17:47:02'),
(7, 3, 'Feuchtigkeitssensor', '', '', '2018-07-28 17:47:49'),
(8, 4, 'Bewegungsmelder', '', '', '2018-07-28 17:48:29'),
(9, 15, 'Bewegungsmelder', 'Ein/Aus', 'Ein', '2018-07-28 17:51:31'),
(10, 13, 'Rolloschalter', '', '', '2018-07-28 21:13:31');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `circuitbreakers`
--
ALTER TABLE `circuitbreakers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fuses`
--
ALTER TABLE `fuses`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `circuitbreakers`
--
ALTER TABLE `circuitbreakers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `fuses`
--
ALTER TABLE `fuses`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
