CREATE DATABASE IF NOT EXISTS `ecm` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `ecm`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NULL,
  `role` ENUM('customer', 'admin', 'moderator') NOT NULL DEFAULT 'customer',
  `status` ENUM('active', 'suspended', 'deleted') NOT NULL DEFAULT 'active',
  `email_verified_at` TIMESTAMP NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_index` (`role`),
  KEY `users_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `updated_at`)
VALUES (
  'Admin User',
  'admin@example.com',
  '$2y$10$Bm/9VihEYkc3V2TE6uqJAec.MYLK/jzaUd1yzzkYo5BnYQeDKkodS',
  '01313555222',
  'admin',
  'active',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `password` = VALUES(`password`),
  `phone` = VALUES(`phone`),
  `role` = VALUES(`role`),
  `status` = VALUES(`status`),
  `updated_at` = NOW();
