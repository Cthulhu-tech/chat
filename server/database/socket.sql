-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Авг 12 2022 г., 00:56
-- Версия сервера: 8.0.30-0ubuntu0.20.04.2
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `socket`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`thrackerzod`@`localhost` PROCEDURE `sp_get_all_msg` (IN `room_number` INT(11))  NO SQL
BEGIN
	SELECT
    	message.id id,
        message.message msg,
        user.login user
    FROM message 
    LEFT JOIN user 
    ON message.user_id = user.id
    WHERE message.room = room_number;
END$$

CREATE DEFINER=`thrackerzod`@`localhost` PROCEDURE `sp_get_all_room` ()  NO SQL
BEGIN
	SELECT
    	room.id id,
        room.name name,
        user.login user
    FROM room 
    LEFT JOIN user 
    ON user.id = room.user_id
    GROUP BY room.id;
END$$

CREATE DEFINER=`thrackerzod`@`localhost` PROCEDURE `sp_set_new_room` (IN `name` VARCHAR(55), IN `id` INT(11))  NO SQL
BEGIN
INSERT INTO room 
(room.name, room.user_id)
VALUES
(name, id);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `message`
--

CREATE TABLE `message` (
  `id` int NOT NULL,
  `room` int NOT NULL,
  `user_id` int NOT NULL,
  `message` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `message`
--

INSERT INTO `message` (`id`, `room`, `user_id`, `message`) VALUES
(30, 2, 1, 'privet'),
(31, 1, 1, 'wow, chat work!');

-- --------------------------------------------------------

--
-- Структура таблицы `room`
--

CREATE TABLE `room` (
  `id` int NOT NULL,
  `name` char(55) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `room`
--

INSERT INTO `room` (`id`, `name`, `user_id`) VALUES
(1, 'Комната любителей котиков', 1),
(2, 'Комната вонючек', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `login` char(55) NOT NULL,
  `password` char(255) NOT NULL,
  `jwt` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `jwt`) VALUES
(1, '123', '$2b$10$f5k2MNIb3DVeojSowhMW2Olpcnf1a7Nc7ctGQcuWJlpSwT3.h7fQC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MDI1NDYxMSwiZXhwIjoxNjYwODU5NDExfQ.XSBSinnTZqWkHrE5yPvbLReHifAVh71CcuRYsmKrd9I'),
(2, '12', '$2b$10$Nw1LP3e9Hk3SeeQ.3a22PeCiIbOXKGdoJ.vftBrWszRjh7es2i7qy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MDIzMzkwMSwiZXhwIjoxNjYwODM4NzAxfQ.YdA7cop0ll6Rd0iQnjWhtHrSY57CyTNvzhRvWn4zd4c');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room` (`room`);

--
-- Индексы таблицы `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `room`
--
ALTER TABLE `room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`room`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
