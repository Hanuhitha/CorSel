-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: studentportal
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academics`
--

DROP TABLE IF EXISTS `academics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academics` (
  `regno` int NOT NULL,
  `class` int DEFAULT NULL,
  `section` varchar(45) DEFAULT NULL,
  `teacher` varchar(45) DEFAULT NULL,
  `subjects` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`regno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academics`
--

LOCK TABLES `academics` WRITE;
/*!40000 ALTER TABLE `academics` DISABLE KEYS */;
INSERT INTO `academics` VALUES (1001,10,'A','KK','Computer science');
/*!40000 ALTER TABLE `academics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admintable`
--

DROP TABLE IF EXISTS `admintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admintable` (
  `id` int NOT NULL,
  `uname` varchar(45) DEFAULT NULL,
  `passwd` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admintable`
--

LOCK TABLES `admintable` WRITE;
/*!40000 ALTER TABLE `admintable` DISABLE KEYS */;
INSERT INTO `admintable` VALUES (1,'Admin',123456);
/*!40000 ALTER TABLE `admintable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feepayment`
--

DROP TABLE IF EXISTS `feepayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feepayment` (
  `regno` int NOT NULL,
  `semester1` decimal(10,2) DEFAULT NULL,
  `semester2` decimal(10,2) DEFAULT NULL,
  `semester3` decimal(10,2) DEFAULT NULL,
  `semester4` decimal(10,2) DEFAULT NULL,
  `semester5` decimal(10,2) DEFAULT NULL,
  `semester6` decimal(10,2) DEFAULT NULL,
  `total_paid` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`regno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feepayment`
--

LOCK TABLES `feepayment` WRITE;
/*!40000 ALTER TABLE `feepayment` DISABLE KEYS */;
INSERT INTO `feepayment` VALUES (1001,40000.00,40000.00,40000.00,40000.00,30000.00,20000.00,210000.00);
/*!40000 ALTER TABLE `feepayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentable`
--

DROP TABLE IF EXISTS `studentable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentable` (
  `regno` int NOT NULL,
  `uname` varchar(45) DEFAULT NULL,
  `passwd` varchar(45) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `f_name` varchar(150) DEFAULT NULL,
  `m_name` varchar(150) DEFAULT NULL,
  `sp_int` varchar(80) DEFAULT NULL,
  `f_occp` varchar(150) DEFAULT NULL,
  `m_occp` varchar(100) DEFAULT NULL,
  `ann_income` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`regno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentable`
--

LOCK TABLES `studentable` WRITE;
/*!40000 ALTER TABLE `studentable` DISABLE KEYS */;
INSERT INTO `studentable` VALUES (1001,'kpradeep','pradeep12','pradeep kumar k',21,123456789,'pradeep@gmail.com','0006-03-10','Male','Kannan','uma','Chess','carpenter','engineer',67000.00),(1002,'anusha','anu123','Anusha',15,123322445,'anu@gmail.com','0007-09-04','Female','suresh','lakshmi','Badminton','shopkeeper','housewife',50000.00),(1004,'kpk','kpk12','kpk',21,12321,'KPK@GMAIL.COM','0007-02-24','Male','kmlkm','klmkl','Carrom','therther','yujyjt',12300.00),(1005,'test','test','test',12,121212,'test@gmail.com','0006-11-24','Female','haikyu','haikyu','Tennis','kpklkp','kpkpgrngr',78000.00),(1006,'test','test','kpradeep kumar ',21,123221,'testtest@gmail.com','0007-09-24','Male','kannan','uma','Badminton','carpenter','engineer',65000.00),(1007,'testtt','testtt','testkpk',21,1232123,'pradeep@gmail.com','0003-04-03','Female','okpk','lkpk','Tennis','occp','occp',60000.00);
/*!40000 ALTER TABLE `studentable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regno` int NOT NULL,
  `uname` varchar(45) DEFAULT NULL,
  `passwd` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `f_name` varchar(45) DEFAULT NULL,
  `m_name` varchar(56) DEFAULT NULL,
  `sp_int` varchar(45) DEFAULT NULL,
  `f_occp` varchar(45) DEFAULT NULL,
  `m_occp` varchar(45) DEFAULT NULL,
  `ann_income` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studflask`
--

DROP TABLE IF EXISTS `studflask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studflask` (
  `regno` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `sal` int DEFAULT NULL,
  `uname` varchar(45) DEFAULT NULL,
  `pswd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`regno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studflask`
--

LOCK TABLES `studflask` WRITE;
/*!40000 ALTER TABLE `studflask` DISABLE KEYS */;
INSERT INTO `studflask` VALUES (1009,'Pradeep Kumar K',21,'skannanu@gmail.com','subramani','saraswathy','7001',78000,'kannan','kannan'),(1010,'S KANNAN',16,'skannanu@gmail.com','kkk','uuu','0987567',78000,'kpkpk','kpkpk'),(1111,'k thamizh selvan',16,'thamzh@gmail.com','s kannan','uma maheswari','93858',10000,'thamizh','thamizh');
/*!40000 ALTER TABLE `studflask` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 18:20:43
