-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 05, 2024 lúc 03:25 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ewallet`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `category_type` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `direction` varchar(10) DEFAULT NULL,
  `color` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`cat_id`, `category_type`, `category_name`, `direction`, `color`, `icon`) VALUES
(1, '3', 'FRT Salary', 'to right', '#024fa0,#f2721e,#50b846', 'sack-dollar'),
(2, '1', 'Hoá đơn điện', NULL, '#fbea25', 'lightbulb'),
(3, '1', 'Shopee', NULL, '#ee7c11', 'cart-shopping'),
(5, '1', 'Tiền thuê nhà', NULL, '#f91ac9', 'house'),
(6, '1', 'Xăng xe', NULL, '#247025', 'gas-pump'),
(7, '1', 'Tiền cước điện thoại', NULL, '#667c93', 'phone-volume'),
(8, '1', 'Tiền mạng Internet', NULL, '#f3123f', 'earth-asia'),
(9, '1', 'Ăn uống tại nhà', NULL, '#1d59b9', 'bowl-rice'),
(10, '1', 'Uống nước', NULL, '#0dc9f8', 'martini-glass-citrus'),
(11, '1', 'Cafe', NULL, '#552e02', 'mug-hot'),
(12, '1', 'Ăn tiệm', NULL, '#b71536', 'utensils'),
(13, '1', 'Lãi suất ngân hàng', NULL, '#02e364', 'money-bill-trend-up'),
(14, '1', 'Đi siêu thị', NULL, '#7516e9', 'cart-shopping'),
(15, '1', 'Cắt tóc', NULL, '#000000', 'scissors'),
(16, '1', 'Mừng cưới', NULL, '#f132d7', 'heart'),
(19, '1', 'Sửa xe', NULL, '#7312d3', 'motorcycle'),
(24, '1', 'Saving Deposit', NULL, '#6ef127', 'piggy-bank'),
(25, '1', 'Thuốc thang', NULL, '#75ead2', 'capsules'),
(26, '1', 'Tiền thưởng', NULL, '#ebf263', 'hand-holding-dollar'),
(27, '1', 'Tiền sửa điện thoại', NULL, '#ee84f5', 'mobile-screen'),
(28, '1', 'Thu nhập khác', NULL, '#b3f02d', 'money-bill-transfer'),
(48, '2', 'Hotel', 'to top', '#fb46b9,#e412f3', 'hotel');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
