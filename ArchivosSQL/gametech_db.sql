-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `gametech6` DEFAULT CHARACTER SET utf8mb4 ;

USE `gametech6` ;

-- -----------------------------------------------------
-- Table `gametech6`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`addresses` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `street` VARCHAR(45) NULL DEFAULT NULL,
  `number` VARCHAR(45) NULL DEFAULT NULL,
  `zipcode` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`brands` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`users` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`carts` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `purchased_at` TIMESTAMP NULL DEFAULT NULL,
  `total` FLOAT(10,2) UNSIGNED NULL DEFAULT 0.00,
  `users_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_carts_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `gametech6`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`categories` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`products` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `price` FLOAT(9,2) UNSIGNED NOT NULL,
  `brands_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
  `categories_id1` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
  `short_description` TEXT NULL DEFAULT NULL,
  `long_description` TEXT NULL DEFAULT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_brands1_idx` (`brands_id` ASC),
  INDEX `fk_products_categories2_idx` (`categories_id1` ASC),
  CONSTRAINT `fk_products_brands1`
    FOREIGN KEY (`brands_id`)
    REFERENCES `gametech6`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories2`
    FOREIGN KEY (`categories_id1`)
    REFERENCES `gametech6`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`carts_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`carts_has_products` (
  `carts_id` BIGINT(20) UNSIGNED NOT NULL,
  `products_id` BIGINT(20) UNSIGNED NOT NULL,
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `qty` SMALLINT(5) UNSIGNED NULL DEFAULT 1,
  `price` FLOAT(9,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_carts_has_products_products1_idx` (`products_id` ASC),
  INDEX `fk_carts_has_products_carts1_idx` (`carts_id` ASC),
  CONSTRAINT `fk_carts_has_products_carts1`
    FOREIGN KEY (`carts_id`)
    REFERENCES `gametech6`.`carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `gametech6`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`customers` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `birthdate` DATE NULL DEFAULT NULL,
  `addresses_id` BIGINT(20) UNSIGNED NOT NULL,
  `users_id` BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_customers_addresses1_idx` (`addresses_id` ASC),
  INDEX `fk_customers_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_customers_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `gametech6`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customers_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `gametech6`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gametech6`.`stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gametech6`.`stores` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `addresses_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_stores_addresses1_idx` (`addresses_id` ASC),
  CONSTRAINT `fk_stores_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `gametech6`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
