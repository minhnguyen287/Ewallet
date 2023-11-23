-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 23, 2023 lúc 08:41 AM
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
  `color` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`cat_id`, `category_type`, `category_name`, `color`, `icon`) VALUES
(1, 'Salary', 'FRT Salary', '#6259ca', 'sack-dollar'),
(2, 'Hoá đơn', 'Hoá đơn điện', '#fbea25', 'lightbulb'),
(3, 'Shopping', 'Shopee', '#ee7c11', 'cart-shopping'),
(5, 'Hoá đơn', 'Tiền thuê nhà', '#f91ac9', 'house'),
(6, 'Đi lại & Du lịch', 'Xăng xe', '#247025', 'gas-pump'),
(7, 'Hoá đơn', 'Tiền điện thoại', '#667c93', 'mobile-screen'),
(8, 'Hoá đơn', 'Tiền mạng Internet', '#f3123f', 'earth-asia'),
(9, 'Ăn uống', 'Ăn uống tại nhà', '#1d59b9', 'bowl-rice'),
(10, 'Ăn uống', 'Uống nước', '#0dc9f8', 'mug-hot'),
(11, 'Ăn uống', 'Cafe', '#552e02', 'mug-hot'),
(12, 'Ăn uống', 'Ăn tiệm', '#b71536', 'utensils'),
(13, 'Tài chính', 'Lãi suất ngân hàng', '#02e364', 'money-bill-trend-up'),
(14, 'Shopping', 'Đi siêu thị', '#7516e9', 'cart-shopping'),
(15, 'Chăm sóc bản thân', 'Cắt tóc', '#000000', 'scissors'),
(16, 'Tiền mừng', 'Mừng cưới', '#f132d7', 'heart'),
(19, 'Bảo dưỡng xe', 'Sửa xe', '#7312d3', 'motorcycle');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oil`
--

CREATE TABLE `oil` (
  `och_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `start_km` int(11) NOT NULL,
  `end_km` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `oil`
--

INSERT INTO `oil` (`och_id`, `product_id`, `start_day`, `end_day`, `start_km`, `end_km`) VALUES
(1, 1, '2023-08-26', '2023-09-30', 8720, 10920),
(2, 2, '2021-07-05', '2021-09-01', 50000, 51219),
(3, 1, '2020-05-10', '2020-06-29', 50300, 52680),
(73, 1, '2020-06-29', '2023-11-19', 52680, 53000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `oil_product`
--

CREATE TABLE `oil_product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_batch` date NOT NULL,
  `product_img` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `oil_product`
--

INSERT INTO `oil_product` (`product_id`, `product_name`, `product_batch`, `product_img`, `product_price`) VALUES
(1, 'Motul Silver', '2020-05-10', 'motulsilver.png', 80000),
(2, 'idemitsu', '2023-07-15', 'idemitsu.png', 70000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `tran_id` int(11) NOT NULL,
  `tran_type` varchar(11) NOT NULL,
  `tran_name` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `tran_desc` text NOT NULL,
  `tran_amount` int(11) NOT NULL,
  `tran_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `transaction`
--

INSERT INTO `transaction` (`tran_id`, `tran_type`, `tran_name`, `cat_id`, `tran_desc`, `tran_amount`, `tran_date`) VALUES
(1, 'receipt', 'XXX', 0, 'XXXXX', 120, '2023-10-05'),
(2, 'expenditure', 'XC', 0, 'CVV', 60, '2023-10-05'),
(3, 'expenditure', 'DF', 0, 'FGH', 30, '2023-10-06'),
(4, 'receipt', 'DF', 0, 'DGH', 10, '2023-10-06'),
(5, 'expenditure', 'KO', 0, 'HJHJL', 20, '2023-10-06'),
(6, 'receipt', 'Thuê nhà', 5, 'Thuê tháng 9', 200, '2023-10-18'),
(7, 'expenditure', 'Mua hàng', 3, 'Tuavit', 40, '2023-10-18'),
(8, 'expenditure', 'Đki V90', 7, 'Nạp thẻ', 90, '2023-10-18'),
(9, 'expenditure', 'Tiền điện', 2, 'tháng 10', 500, '2023-10-18'),
(10, 'receipt', 'Thưởng', 1, 'Thưởng quý 3', 1500, '2023-10-18'),
(11, 'expenditure', 'Xăng', 6, 'Đổ xăng', 700, '2023-10-18'),
(12, 'receipt', 'Lương', 1, 'tháng 19', 800, '2023-10-04'),
(13, 'expenditure', 'Lương', 4, 'tháng 19', 30, '2023-10-05'),
(14, 'expenditure', 'OK', 8, 'a', 45, '2023-10-19'),
(15, 'expenditure', 'Tiền điện', 1, 'Nạp thẻ', 5, '2023-10-19'),
(16, 'expenditure', 'sdf', 2, 'fff', 30, '2023-10-19'),
(17, 'expenditure', 'Ăn tối', 9, 'bt', 10, '2023-10-19'),
(18, 'receipt', 'OK', 3, 'Tuavit', 10, '2023-10-19'),
(19, 'expenditure', 'r', 3, 't', 100, '2023-10-05'),
(20, 'expenditure', 'Mua quà', 3, 'Quà noel', 300, '2022-12-25'),
(21, 'expenditure', 'Xăng', 6, 'Đổ xăng', 70, '2023-11-07'),
(22, 'expenditure', 'Ăn uống', 12, 'Ăn tối', 30, '2023-11-07'),
(23, 'expenditure', 'Sửa xe', 16, 'Thay Bugi', 75, '2023-11-06'),
(24, 'expenditure', 'Sửa xe', 19, 'Thay Bugi', 75, '2023-11-11'),
(25, 'expenditure', 'Xăng xe', 6, 'Đổ xăng', 73000, '2023-11-12'),
(26, 'expenditure', 'Sửa xe', 19, 'Thay lò xo chân trống', 15000, '2023-11-12'),
(27, 'expenditure', 'Hoá đơn điện', 2, 'Tiền điện tháng 10', 964000, '2023-11-12'),
(28, 'expenditure', 'Hoá đơn điện', 2, 'Tiền điện tháng 10', 964000, '2023-11-12'),
(29, 'expenditure', 'Uống nước', 10, 'Trà chanh', 15000, '2023-11-13'),
(30, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 100, '2023-11-12'),
(35, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 2000, '2023-11-12'),
(36, 'expenditure', 'Ăn tiệm', 12, 'Ăn trưa', 30000, '2023-11-12'),
(37, 'expenditure', 'Ăn tiệm', 12, 'Ăn tối', 30000, '2023-11-12'),
(38, 'expenditure', 'Xăng xe', 6, 'Đổ xăng', 50000, '2023-11-12'),
(39, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 500, '2023-11-13'),
(40, 'expenditure', 'Cắt tóc', 15, 'Cắt tóc', 50000, '2023-11-21'),
(41, 'expenditure', 'Xăng xe', 6, 'Đổ xăng', 70000, '2023-11-21'),
(42, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 110, '2023-11-21'),
(43, 'expenditure', 'Cafe', 11, 'IONAH', 30000, '2023-11-21'),
(44, 'receipt', 'Cắt tóc', 15, 'Cắt tóc', 50000, '2023-11-21'),
(45, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 100, '2023-11-21'),
(46, 'receipt', 'Lãi suất ngân hàng', 13, 'LSNH', 60, '2023-11-21');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Chỉ mục cho bảng `oil`
--
ALTER TABLE `oil`
  ADD PRIMARY KEY (`och_id`);

--
-- Chỉ mục cho bảng `oil_product`
--
ALTER TABLE `oil_product`
  ADD PRIMARY KEY (`product_id`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tran_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `oil`
--
ALTER TABLE `oil`
  MODIFY `och_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `oil_product`
--
ALTER TABLE `oil_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
