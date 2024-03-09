-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 13, 2023 lúc 07:13 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: "hoidanit"
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng "Doctor_Infors"
--

CREATE TABLE "Doctor_Infors" (
  "id" int(11) NOT NULL,
  "doctorId" int(11) NOT NULL,
  "specialtyId" int(11) DEFAULT NULL,
  "clinicId" int(11) DEFAULT NULL,
  "priceId" varchar(255) NOT NULL,
  "provinceId" varchar(255) NOT NULL,
  "paymentId" varchar(255) NOT NULL,
  "addressClinic" varchar(255) NOT NULL,
  "nameClinic" varchar(255) NOT NULL,
  "note" varchar(255) DEFAULT NULL,
  "count" int(11) NOT NULL DEFAULT 0,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  "nameSpecialty" varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng "Doctor_Infors"
--

INSERT INTO "Doctor_Infors" ("doctorId", "specialtyId", "clinicId", "priceId", "provinceId", "paymentId", "addressClinic", "nameClinic", "note", "count", "createdAt", "updatedAt", "nameSpecialty") VALUES
(4, 7, 7, 'PRI2', 'PRO1', 'PAY1', '78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội', 'Bệnh Viện Tai Mũi Họng Trung Ương', 'hoai an', 0, '2023-01-27 10:15:17', '2023-01-28 14:18:30', 'Tai Mũi Họng'),
(5, 1, 6, 'PRI3', 'PRO1', 'PAY1', ' 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'Bệnh viện Bạch Mai', 'bbbb', 0, '2023-01-27 10:16:21', '2023-01-28 14:18:50', 'Cơ Xương Khớp'),
(7, 6, 1, 'PRI7', 'PRO1', 'PAY3', 'Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội', 'Bệnh viện Hữu nghị Việt Đức', 'tuyet nga', 0, '2023-01-27 16:40:20', '2023-01-29 17:12:40', 'Y học Cổ truyền'),
(3, 2, 9, 'PRI5', 'PRO1', 'PAY3', '15A, Phương Mai, Hà Nội', 'Bệnh viện Da liễu Trung ương', 'vib', 0, '2023-01-28 12:11:44', '2023-01-28 14:37:29', 'Thần kinh'),
(2, 8, 8, 'PRI5', 'PRO2', 'PAY1', 'Cơ sở 1: 766 Võ Văn Kiệt, Phường 1, Quận 5, TPHCM', 'Bệnh viện Tâm thần TPHCM', 'tat ca', 0, '2023-01-28 14:33:43', '2023-01-29 19:38:45', 'Sức khỏe tâm thần'),
(9, 1, 6, 'PRI7', 'PRO1', 'PAY3', ' 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'Bệnh viện Bạch Mai', 'doctor123', 0, '2023-01-29 13:49:25', '2023-01-29 19:21:05', 'Cơ Xương Khớp'),
(10, 1, 1, 'PRI4', 'PRO1', 'PAY3', 'Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội', 'Bệnh viện Hữu nghị Việt Đức', 'toan311', 0, '2023-01-29 13:59:16', '2023-01-29 19:20:44', 'Cơ Xương Khớp'),
(11, 2, 2, 'PRI2', 'PRO2', 'PAY3', '201B Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí Minh', 'Bệnh viện Chợ Rẫy', 'doan123', 0, '2023-01-29 14:51:55', '2023-01-29 19:25:33', 'Thần kinh'),
(12, 5, 6, 'PRI3', 'PRO1', 'PAY3', ' 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'Bệnh viện Bạch Mai', 'duc33333333', 0, '2023-01-29 14:57:04', '2023-01-29 19:24:09', 'Thần kinh'),
(13, 3, 3, 'PRI4', 'PRO2', 'PAY3', '20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM', 'Phòng khám Bệnh viện Đại học Y Dược 1', 'quyet33333333', 0, '2023-01-29 15:09:09', '2023-01-29 19:19:13', 'Tiêu hoá'),
(14, 3, 6, 'PRI3', 'PRO1', 'PAY3', ' 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'Bệnh viện Bạch Mai', 'anh555555555', 0, '2023-01-29 15:12:50', '2023-01-29 19:17:49', 'Tiêu hoá'),
(15, 3, 1, 'PRI5', 'PRO1', 'PAY1', 'Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội', 'Bệnh viện Hữu nghị Việt Đức', 'vinh6656', 0, '2023-01-29 15:19:57', '2023-01-29 19:18:03', 'Tiêu hoá'),
(16, 4, 4, 'PRI4', 'PRO1', 'PAY3', ' Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội', 'Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108', 'quynh54574', 0, '2023-01-29 15:45:17', '2023-01-29 19:17:17', 'Tim mạch'),
(17, 4, 2, 'PRI4', 'PRO2', 'PAY1', '201B Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí Minh', 'Bệnh viện Chợ Rẫy', 'ha3553', 0, '2023-01-29 15:58:31', '2023-01-29 19:03:27', 'Tim mạch'),
(18, 4, 4, 'PRI6', 'PRO1', 'PAY1', ' Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội', 'Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108', 'thuy666', 0, '2023-01-29 16:04:33', '2023-01-29 19:17:00', 'Tim mạch'),
(19, 5, 1, 'PRI4', 'PRO1', 'PAY3', 'Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội', 'Bệnh viện Hữu nghị Việt Đức', 'vcs', 0, '2023-01-29 16:48:04', '2023-01-29 19:00:39', 'Cột sống'),
(20, 5, 6, 'PRI5', 'PRO1', 'PAY3', ' 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội', 'Bệnh viện Bạch Mai', 'vhhd', 0, '2023-01-29 16:56:35', '2023-01-29 18:59:49', 'Cột sống'),
(21, 5, 1, 'PRI6', 'PRO1', 'PAY3', 'Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội', 'Bệnh viện Hữu nghị Việt Đức', 'dtrrr', 0, '2023-01-29 17:08:21', '2023-01-29 19:00:19', 'Cột sống'),
(22, 6, 4, 'PRI6', 'PRO1', 'PAY3', ' Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội', 'Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108', 'ddd', 0, '2023-01-29 17:27:42', '2023-01-29 19:01:39', 'Y học Cổ truyền'),
(23, 7, 4, 'PRI3', 'PRO1', 'PAY3', ' Số 1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội', 'Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108', 'vb8755', 0, '2023-01-29 17:39:15', '2023-01-29 19:02:37', 'Tai Mũi Họng'),
(8, 7, 7, 'PRI5', 'PRO1', 'PAY3', '78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội', 'Bệnh Viện Tai Mũi Họng Trung Ương', 'van44333', 0, '2023-01-29 19:45:06', '2023-01-29 19:45:06', 'Tai Mũi Họng');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng "Doctor_Infors"
--
ALTER TABLE "Doctor_Infors"
  ADD PRIMARY KEY ("id");

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng "Doctor_Infors"
--
ALTER TABLE "Doctor_Infors"
  MODIFY "id" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
