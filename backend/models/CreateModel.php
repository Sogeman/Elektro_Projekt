<?php

/**
 * @author Rene
 */

class CreateModel {

    private $database;

    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function createProject($specification) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);

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
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $count = filter_var($specification->floor_count_from_basement, FILTER_SANITIZE_SPECIAL_CHARS);
        $cbid = filter_var($specification->circuitbreakerid, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "INSERT into floors (projects_id, floor_count_from_basement, name, circuitbreakers_id) VALUES (:id, :count, :name, :cbid)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":id", $projectsid);
            $stmt->bindParam(":count", $count);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":cbid", $cbid);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function createRoom($specification, $floorsid) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);

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
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);

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
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $unit = filter_var($specification->unit, FILTER_SANITIZE_SPECIAL_CHARS);
        $value = filter_var($specification->value, FILTER_SANITIZE_SPECIAL_CHARS);

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
    
    public function createCircuitbreaker($specification) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $floorId = filter_var($specification->floorid, FILTER_SANITIZE_SPECIAL_CHARS);
        
        try {
            $sql = "INSERT into circuitbreakers (floors_id, name) VALUES (:floorId, :name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":floorId", $floorId);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function createFuse($specification) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $roomId = filter_var($specification->roomid, FILTER_SANITIZE_SPECIAL_CHARS);
        $cbId = filter_var($specification->circuitbreakerid, FILTER_SANITIZE_SPECIAL_CHARS);
        
        try {
            $sql = "INSERT into fuses (circuitbreakers_id, rooms_id, name) VALUES (:cbId, :roomsId, :name)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":cbId", $cbId);
            $stmt->bindParam(":roomsId", $roomId);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            return $this->database->lastInsertedId(); 
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

}
