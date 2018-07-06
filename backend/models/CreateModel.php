<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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