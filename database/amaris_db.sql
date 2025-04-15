-- Amaris Heavy Machinery Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `inquiries`;
DROP TABLE IF EXISTS `users`;

-- Create users table
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `role` enum('admin','editor','viewer') DEFAULT 'viewer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create categories table
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create products table
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `specifications` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create inquiries table
CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `status` enum('new','in_progress','completed') DEFAULT 'new',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inquiries_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample categories
INSERT INTO `categories` (`name`, `description`, `image`) VALUES
('Excavators', 'Heavy-duty excavation equipment for construction and mining', 'excavator-category.jpg'),
('Loaders', 'Front loaders and backhoe loaders for material handling', 'loader-category.jpg'),
('Bulldozers', 'Powerful earth-moving machines for construction sites', 'bulldozer-category.jpg'),
('Cranes', 'Lifting equipment for construction and industrial applications', 'crane-category.jpg');

-- Insert sample products
INSERT INTO `products` (`category_id`, `name`, `description`, `specifications`, `price`, `image`, `featured`) VALUES
(1, 'AX-200 Excavator', 'Powerful excavator suitable for medium to large construction projects', 'Engine: 200HP\\nOperating Weight: 20 tons\\nBucket Capacity: 1.2m³\\nMax Digging Depth: 6.5m', 150000.00, 'ax-200.jpg', 1),
(1, 'AX-150 Compact Excavator', 'Compact excavator ideal for urban construction sites', 'Engine: 120HP\\nOperating Weight: 15 tons\\nBucket Capacity: 0.8m³\\nMax Digging Depth: 5.2m', 95000.00, 'ax-150.jpg', 0),
(2, 'AL-500 Wheel Loader', 'High-capacity wheel loader for material handling', 'Engine: 280HP\\nOperating Weight: 18 tons\\nBucket Capacity: 3.5m³\\nMax Dump Height: 4.2m', 175000.00, 'al-500.jpg', 1),
(3, 'AD-300 Bulldozer', 'Robust bulldozer for heavy-duty earthmoving operations', 'Engine: 300HP\\nOperating Weight: 25 tons\\nBlade Width: 4.2m\\nBlade Capacity: 8.5m³', 220000.00, 'ad-300.jpg', 1),
(4, 'AC-100 Mobile Crane', 'Versatile mobile crane for construction sites', 'Engine: 350HP\\nOperating Weight: 40 tons\\nMax Lifting Capacity: 100 tons\\nMax Boom Length: 60m', 350000.00, 'ac-100.jpg', 0);

-- Insert admin user (password: admin123)
INSERT INTO `users` (`username`, `password`, `email`, `role`) VALUES
('admin', '$2y$10$5H.1y9UXFEgBrYqcBDVZgOUPzqP.gf.JMZ.Z3V9CJhV1Tl5EKzUPi', 'admin@amaris.com', 'admin');