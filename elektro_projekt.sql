-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Aug 2018 um 12:24
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
-- Datenbank: `elektro_projekt`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `circuitbreakers`
--

CREATE TABLE `circuitbreakers` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `devices`
--

CREATE TABLE `devices` (
  `id` int(11) UNSIGNED NOT NULL,
  `rooms_id` int(11) UNSIGNED NOT NULL,
  `fuses_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `devices_select`
--

CREATE TABLE `devices_select` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `devices_select`
--

INSERT INTO `devices_select` (`id`, `name`) VALUES
(1, 'Leuchte E27'),
(4, 'Leuchte E14'),
(5, 'Leuchte GU10'),
(6, 'Leuchte GU5.3'),
(7, 'Steckdose 230V'),
(8, 'Steckdose 400V'),
(9, 'Außenrollo'),
(10, 'Rauchmelder'),
(11, 'COAX Dose');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `floors`
--

CREATE TABLE `floors` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `floor_count_from_basement` int(11) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fuses`
--

CREATE TABLE `fuses` (
  `id` int(11) UNSIGNED NOT NULL,
  `circuitbreakers_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projects`
--

CREATE TABLE `projects` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) UNSIGNED NOT NULL,
  `floors_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE `sensors` (
  `id` int(11) UNSIGNED NOT NULL,
  `devices_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors_select`
--

CREATE TABLE `sensors_select` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `sensors_select`
--

INSERT INTO `sensors_select` (`id`, `name`) VALUES
(1, 'Lichtschalter (Kipp)'),
(3, 'Lichtschalter (2 Knöpfe)'),
(4, 'Lichtsensor'),
(5, 'Rolloschalter'),
(6, 'Feuchtigkeitssensor'),
(7, 'Bewegungsmelder');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `circuitbreakers`
--
ALTER TABLE `circuitbreakers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_id` (`projects_id`);

--
-- Indizes für die Tabelle `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_id` (`rooms_id`,`fuses_id`);

--
-- Indizes für die Tabelle `devices_select`
--
ALTER TABLE `devices_select`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_id` (`projects_id`);

--
-- Indizes für die Tabelle `fuses`
--
ALTER TABLE `fuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `circuitbreakers_id` (`circuitbreakers_id`);

--
-- Indizes für die Tabelle `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `floors_id` (`floors_id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `devices_id` (`devices_id`);

--
-- Indizes für die Tabelle `sensors_select`
--
ALTER TABLE `sensors_select`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `circuitbreakers`
--
ALTER TABLE `circuitbreakers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `devices_select`
--
ALTER TABLE `devices_select`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `fuses`
--
ALTER TABLE `fuses`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `sensors_select`
--
ALTER TABLE `sensors_select`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `circuitbreakers`
--
ALTER TABLE `circuitbreakers`
  ADD CONSTRAINT `circuitbreakers_ibfk_1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`rooms_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `floors`
--
ALTER TABLE `floors`
  ADD CONSTRAINT `floors_ibfk_1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `fuses`
--
ALTER TABLE `fuses`
  ADD CONSTRAINT `fuses_ibfk_1` FOREIGN KEY (`circuitbreakers_id`) REFERENCES `circuitbreakers` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`floors_id`) REFERENCES `floors` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`devices_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
