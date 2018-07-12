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
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

    public function createFloor($specification, $projectsid) {
        $name = $specification->name;
        $count = $specification->floor_count_from_basement;

        try {
            $sql = "INSERT into floors (projects_id, floor_count_from_basement, name) VALUES (:id, :count, :name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":id", $projectsid);
            $stmt->bindParam(":count", $count);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function createRoom($specification, $floorsid) {
        $name = $specification->name;

        try {
            $sql = "INSERT into rooms (floors_id, name) VALUES (:id, :name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":id", $floorsid);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function createDevice($specification, $roomsid) {
        $name = $specification->name;

        try {
            $sql = "INSERT into devices (rooms_id, name) VALUES (:id, :name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":id", $roomsid);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function createSensor($specification, $devicesid) {
        $name = $specification->name;
        $unit = $specification->unit;
        $value = $specification->value;

        try {
            $sql = "INSERT into sensors (devices_id, name, unit, value) VALUES (:id, :name, :unit, :value)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":id", $devicesid);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":unit", $unit);
            $stmt->bindParam(":value", $value);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

}
