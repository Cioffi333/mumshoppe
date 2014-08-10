
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- garnish
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `garnish`;

CREATE TABLE `garnish`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `underclassman` TINYINT(1) DEFAULT 0 NOT NULL,
    `junior` TINYINT(1) DEFAULT 0 NOT NULL,
    `senior` TINYINT(1) DEFAULT 0 NOT NULL,
    `price` DECIMAL NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;