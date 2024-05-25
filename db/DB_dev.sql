-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: dev
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Joueurs`
--

DROP TABLE IF EXISTS `Joueurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Joueurs` (
  `id_joueur` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `id_partie` int DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `nombre_points` int DEFAULT NULL,
  PRIMARY KEY (`id_joueur`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_partie` (`id_partie`),
  CONSTRAINT `joueurs_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_compte`),
  CONSTRAINT `joueurs_ibfk_2` FOREIGN KEY (`id_partie`) REFERENCES `Partie` (`id_partie`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Joueurs`
--

LOCK TABLES `Joueurs` WRITE;
/*!40000 ALTER TABLE `Joueurs` DISABLE KEYS */;
INSERT INTO `Joueurs` VALUES (1,1,1,'test_pseudo',0),(2,3,3,'DoReMi',NULL);
/*!40000 ALTER TABLE `Joueurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Missions`
--

DROP TABLE IF EXISTS `Missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Missions` (
  `id_mission` int NOT NULL AUTO_INCREMENT,
  `nom_mission` varchar(50) DEFAULT NULL,
  `description_mission` text,
  `public` tinyint(1) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `auteur_id` int DEFAULT NULL,
  `destinataire_id` int DEFAULT NULL,
  `partie_id` int DEFAULT NULL,
  `points` int DEFAULT NULL,
  `difficulte` int DEFAULT NULL,
  PRIMARY KEY (`id_mission`),
  KEY `partie_id` (`partie_id`),
  KEY `auteur_id` (`auteur_id`),
  KEY `destinataire_id` (`destinataire_id`),
  CONSTRAINT `missions_ibfk_1` FOREIGN KEY (`partie_id`) REFERENCES `Partie` (`id_partie`),
  CONSTRAINT `missions_ibfk_2` FOREIGN KEY (`auteur_id`) REFERENCES `Joueurs` (`id_joueur`),
  CONSTRAINT `missions_ibfk_3` FOREIGN KEY (`destinataire_id`) REFERENCES `Joueurs` (`id_joueur`),
  CONSTRAINT `missions_chk_1` CHECK ((`difficulte` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Missions`
--

LOCK TABLES `Missions` WRITE;
/*!40000 ALTER TABLE `Missions` DISABLE KEYS */;
INSERT INTO `Missions` VALUES (1,'course','description course',1,NULL,NULL,NULL,NULL,250,NULL),(2,'escalade','description escalade',1,NULL,NULL,NULL,NULL,150,NULL),(3,'orientation','description orientation',1,NULL,NULL,NULL,NULL,300,NULL),(4,'testnom','test description',1,NULL,1,1,1,900,NULL),(5,'testnom','test description',1,NULL,1,1,1,90,NULL),(6,'testnom','test description',1,NULL,1,1,1,90,NULL),(7,'testnom','test description',1,NULL,1,1,1,90,NULL),(8,'Escalade',"Grimpez jusqu'en haut de la falaise et prenez une photo spectaculaire du sommet pour prouver votre exploit.",1,NULL,NULL,NULL,NULL,350,NULL),(9,'Chasse au chat','Trouvez un chat dans le voisinage et prenez une photo avec lui.',1,NULL,NULL,NULL,NULL,150,NULL),(10,'Nettoyage Express','Nettoyez la salle à manger de la soiré d\'hier il ne dois plus rien resté. Prend une photo pour prouver le résultat',1,NULL,NULL,NULL,NULL,400,NULL),(11,'Orientation','Trouve l\'eglise du village sans aide et prend la en photo.',1,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MissionsActives`
--

DROP TABLE IF EXISTS `MissionsActives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MissionsActives` (
  `id_mission_active` int NOT NULL AUTO_INCREMENT,
  `id_joueur` int DEFAULT NULL,
  `id_mission` int DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `id_status` int DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_mission_active`),
  KEY `id_joueur` (`id_joueur`),
  KEY `id_mission` (`id_mission`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `missionsactives_ibfk_1` FOREIGN KEY (`id_joueur`) REFERENCES `Joueurs` (`id_joueur`),
  CONSTRAINT `missionsactives_ibfk_2` FOREIGN KEY (`id_mission`) REFERENCES `Missions` (`id_mission`),
  CONSTRAINT `missionsactives_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `Status` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MissionsActives`
--

LOCK TABLES `MissionsActives` WRITE;
/*!40000 ALTER TABLE `MissionsActives` DISABLE KEYS */;
INSERT INTO `MissionsActives` VALUES (1,1,1,NULL,NULL,2,NULL),(2,1,3,NULL,NULL,2,'https://res.cloudinary.com/dyowth3mr/image/upload/v1716630931/GETG/sac2nsqgjds0wd8pjjp0.jpg'),(3,1,2,NULL,NULL,1,NULL),(4,2,8,NULL,NULL,1,NULL),(5,2,9,NULL,NULL,1,NULL),(6,2,10,NULL,NULL,1,NULL),(7,2,11,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `MissionsActives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partie`
--

DROP TABLE IF EXISTS `Partie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partie` (
  `id_partie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_partie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partie`
--

LOCK TABLES `Partie` WRITE;
/*!40000 ALTER TABLE `Partie` DISABLE KEYS */;
INSERT INTO `Partie` VALUES (1,'kot','2024-03-19',1),(2,'kot','2024-03-19',1),(3,'Musique','2024-05-24',1);
/*!40000 ALTER TABLE `Partie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerhistory`
--

DROP TABLE IF EXISTS `playerhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playerhistory` (
  `id_history` int NOT NULL AUTO_INCREMENT,
  `id_joueur` int NOT NULL,
  `id_partie` int NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `points` int NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_history`),
  KEY `id_joueur` (`id_joueur`),
  KEY `id_partie` (`id_partie`),
  CONSTRAINT `playerhistory_ibfk_1` FOREIGN KEY (`id_joueur`) REFERENCES `Joueurs` (`id_joueur`),
  CONSTRAINT `playerhistory_ibfk_2` FOREIGN KEY (`id_partie`) REFERENCES `Partie` (`id_partie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerhistory`
--

LOCK TABLES `playerhistory` WRITE;
/*!40000 ALTER TABLE `playerhistory` DISABLE KEYS */;
INSERT INTO `playerhistory` VALUES
(1, 2, 1, 'DoReMi', 300, '2024-05-20 10:00:00'),
(2, 2, 2, 'DoReMi', 350, '2024-05-21 11:00:00'),
(3, 2, 3, 'DoReMi', 500, '2024-05-22 12:00:00');

/*!40000 ALTER TABLE `playerhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Status`
--

DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Status`
--

LOCK TABLES `Status` WRITE;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
INSERT INTO `Status` VALUES (1,'En cours'),(2,'En attente'),(3,'Réussie'),(4,'Abandonné');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Utilisateur`
--

DROP TABLE IF EXISTS `Utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Utilisateur` (
  `id_compte` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_compte`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Utilisateur`
--

LOCK TABLES `Utilisateur` WRITE;
/*!40000 ALTER TABLE `Utilisateur` DISABLE KEYS */;
INSERT INTO `Utilisateur` VALUES (1,'Doe','John','john.doe@example.com','test'),(2,'Fasol','Rémi','remi.fasol@exemple.com','lassi'),(3,'Fasol','Fasol','remi.fasol@exemple.com','2b797bd4a4d222d67a6be120805c6e070f7630ab1029cded30f6272f715773cca5601377bbba3c2e45af4a76b85e662c48d4274b2d3f7a12f5259d0b65f7c11d');
/*!40000 ALTER TABLE `Utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 21:03:26
