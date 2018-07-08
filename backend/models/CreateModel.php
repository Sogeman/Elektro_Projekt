<?php

/* 
 * Rene
 */
// Nicht sicher ob das so funktioniert, muss ich noch testen
class CreateModel {
    
    private $database;
     
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function createProject($specification) {
        $name = $specification->name;
        try {
            $sql = "INSERT into projects (name) VALUES (:name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            return true;
        }
        catch(PDOException $e)
        {
            return false;
        }
        
    }
}
