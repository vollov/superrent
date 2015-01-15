
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS user;


CREATE TABLE user (
  id INT(11) unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(32) NOT NULL,
  last_name varchar(32) NOT NULL,
  phone varchar(24) NOT NULL,
  email varchar(32) UNIQUE NOT NULL,
  password varchar(32) NOT NULL,
  active TINYINT(1),
  PRIMARY KEY (id),
  KEY k_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user VALUES 
(1,'jenny','li','519-781-6118','jenny.lee.zhang@gmail.com','pwd',1),
(2,'annie','smith','519-234-6728','annie.smith@gmail.com','pwd',1),
(3,'luke','bright','519-781-6238','luke.bright@gmail.com','pwd',1);


CREATE TABLE property (
  id INT(11) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(128) NOT NULL,
  street varchar(64) NOT NULL,
  city varchar(24) NOT NULL,
  province varchar(2) NOT NULL,
  postcode varchar(10) NOT NULL,
  type int(2) NOT NULL,
  latitude double,
  longitude double,
  start_price integer,
  size_sqft int(8),
  active TINYINT(1),
  created datetime DEFAULT NULL,
  owner_id int(11) unsigned NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT property_fk_owner_id FOREIGN KEY (owner_id) REFERENCES user (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO property VALUES
(1,'VERY ATTRACTIVE TOWNHOME W/GARAGE 3 BATHS & MORE ','24 green valley DR','Kitchener','ON','N2P2J8',1,12,13,1400,2000,1,'2014-11-23 22:30:00',1),
(2,'Located in an exclusive but highly sought-after area of Kitchener. ideal place for a professional with great tastes','284 purple sage CR','Kitchener','ON','N2E4G6',1,12,13,1450,1600,0,'2014-10-05 02:30:00',1),
(3,'Three Rooms available starting in May for rent! Conestoga College.','73 amherst DR','Kitchener','ON','N2P1C9',2,12,13,550,110,0,'2012-07-03 12:30:00',1),
(4,'This 3 bedroom 1.5 bath condo is much larger than it looks! Boasting a massive living room','941 DALHOUSIE Drive','London','ON','N6K1M8',3,12,13,1400,2000,0,'2014-08-01 14:30:00',2);