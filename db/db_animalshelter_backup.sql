-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: animalshelter
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8,
  `type` text CHARACTER SET utf8,
  `shelterID` int(11) NOT NULL,
  `description` text CHARACTER SET utf8,
  `sex` text CHARACTER SET utf8,
  `age` int(11) DEFAULT NULL,
  `size` text CHARACTER SET utf8,
  `length` text CHARACTER SET utf8,
  `vaccinated` tinyint(1) DEFAULT NULL,
  `declawed` tinyint(1) DEFAULT NULL,
  `coat` text CHARACTER SET utf8,
  `primaryColor` text CHARACTER SET utf8,
  `secondaryColor` text CHARACTER SET utf8,
  `weight` int(11) DEFAULT NULL,
  `date` text CHARACTER SET utf8,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (8,'Floef','dog',1,'Big hairy bark bark','male',3,'large','medium',1,NULL,'smooth','Brown','White',30,'2016-01-10'),(9,'Tinkerbell','cat',2,'Cat with claws mew mew','female',5,'medium','medium',1,0,'thick','white',NULL,7,'2017-12-20'),(10,'Sammy','cat',3,'Lil dude loves climbing trees','male',1,'small','short',1,1,'smooth','Black','Grey',4,'2018-01-07'),(11,'Boris','dog',1,'Little fluffy with smol ears','male',2,'small','short',1,NULL,'thick','Brownish','Black',5,'2017-11-12'),(12,'Flappy','rabbit',2,'Flappy ears','female',3,'small','medium',0,NULL,'smooth','Brownish','Greyish',5,'2018-03-15'),(13,'Bugs','rabbit',1,'Not alot of flies but still called bugs','female',2,'large','long',1,NULL,'thick','Brownish','Redish',10,'2018-01-06'),(14,'Tiger','cat',2,'Loves blankets and cuddles, not good with kids','male',3,'small','short',1,1,'smooth','White','Grey',7,'2018-03-15'),(15,'Doggo','dog',2,'Smol doggo, loves blankets','male',2,'small','short',1,NULL,'smooth','Yellowish','Black',3,'2018-03-15');
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelter`
--

DROP TABLE IF EXISTS `shelter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shelter` (
  `sh_id` int(11) NOT NULL AUTO_INCREMENT,
  `shelterName` text CHARACTER SET utf8,
  `shelterDescription` text CHARACTER SET utf8,
  `shelterCity` text CHARACTER SET utf8,
  `shelterAddress` text,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(8,6) DEFAULT NULL,
  PRIMARY KEY (`sh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelter`
--

LOCK TABLES `shelter` WRITE;
/*!40000 ALTER TABLE `shelter` DISABLE KEYS */;
INSERT INTO `shelter` VALUES (1,'Brooklyn Animal Care Center',NULL,'New York','2336 linden boulevard',40.663860,-73.876547),(2,'Manhattan Animal Care Center',NULL,'New York','326 East 110th Street',40.790856,-73.939185),(3,'Staten Island Animal Care Center',NULL,'New York','3139 Veterans Road West',40.524915,-74.239969);
/*!40000 ALTER TABLE `shelter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 15:18:18
