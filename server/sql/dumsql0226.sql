CREATE TABLE `hocphan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mahp` varchar(55) DEFAULT NULL,
  `tenhp` varchar(255) DEFAULT NULL,
  `createdBy` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` varchar(50) DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `hocphan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mahp` (`mahp`);

