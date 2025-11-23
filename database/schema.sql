-- Create database
DROP DATABASE IF EXISTS christmasApp;
CREATE DATABASE christmasApp;
USE christmasApp;

CREATE TABLE producer(
    producer_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    producer VARCHAR(50),
    CONSTRAINT pk_producer PRIMARY KEY (producer_id)
);

CREATE TABLE director(
    director_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    CONSTRAINT pk_director PRIMARY KEY (director_id)
);

CREATE TABLE streaming_platform(
    streaming_platform_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    streaming_platform VARCHAR(40),
    CONSTRAINT pk_streaming PRIMARY KEY (streaming_platform_id)
);

CREATE TABLE actor(
    actor_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    img_url VARCHAR(40),
    CONSTRAINT pk_actor PRIMARY KEY (actor_id)
);

CREATE TABLE program(
    program_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    yr_released YEAR,
    runtime TIME,
    producer_id SMALLINT UNSIGNED,
    format ENUM('live-action', 'stop-motion', 'animation', 'motion-capture'),
    program_rating ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'MA'),
    robins_rating ENUM('NA', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐') DEFAULT '⭐⭐⭐⭐⭐',
    IMDb_id VARCHAR(20),
    wikipedia_url TINYTEXT,
    img_url VARCHAR(40),
    summary TEXT,
    fun_fact TINYTEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    CONSTRAINT pk_program PRIMARY KEY (program_id),
    CONSTRAINT fk_producer FOREIGN KEY (producer_id) REFERENCES producer (producer_id)
);

-- pivot tables
CREATE TABLE program_to_director(
    program_id MEDIUMINT UNSIGNED NOT NULL,
    director_id SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_dir FOREIGN KEY (program_id) REFERENCES program (program_id),
    CONSTRAINT fk_dir_prog FOREIGN KEY (director_id) REFERENCES director (director_id)
);

CREATE TABLE program_to_streaming(
    program_id MEDIUMINT UNSIGNED NOT NULL,
    streaming_platform_id SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_str FOREIGN KEY (program_id) REFERENCES program (program_id),
    CONSTRAINT fk_str_prog FOREIGN KEY (streaming_platform_id) REFERENCES streaming_platform (streaming_platform_id)
);

CREATE TABLE program_to_actor(
    program_id MEDIUMINT UNSIGNED NOT NULL,
    actor_id MEDIUMINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_act FOREIGN KEY (program_id) REFERENCES program (program_id),
    CONSTRAINT fk_act_prog FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);

-- ALTERATIONS
ALTER TABLE actor 
MODIFY actor_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL;

ALTER TABLE program 
MODIFY robins_rating ENUM('NA', '1', '2', '3', '4', '5') DEFAULT '5';

ALTER TABLE program
MODIFY fun_fact TEXT;

ALTER TABLE program
MODIFY img_url VARCHAR(60);

-- space in front of "murphy"
UPDATE actor
SET last_name = LTRIM(last_name)
WHERE actor_id = 123;

UPDATE actor
SET last_name = TRIM(last_name)
WHERE actor_id = 123;

UPDATE actor
SET last_name = REPLACE(last_name, CHAR(9), '')
WHERE actor_id = 123;
-- verify cleanup
SELECT actor_id, CONCAT(">", last_name, "<") AS shown, LENGTH(last_name), HEX(last_name)
FROM actor
WHERE actor_id = 123;



-- reset auto increment program table
SET @num := 0;
UPDATE program SET program_id = @num := (@num + 1);
ALTER TABLE program AUTO_INCREMENT = 1;