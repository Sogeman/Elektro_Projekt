<?php

/**
 * @author Rene
 */

class UpdateModel {

    private $database;

    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function updateProject($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "UPDATE projects SET name = :name WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

    public function updateFloor($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $count = filter_var($specification->floor_count_from_basement, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "UPDATE floors SET floor_count_from_basement = :count, name = :name WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":count", $count);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

    public function updateRoom($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "UPDATE rooms SET name = :name WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

    public function updateDevice($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $fuse = filter_var($specification->fuseid, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "UPDATE devices SET name = :name, fuses_id = :fuse WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":fuse", $fuse);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

    public function updateSensor($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $unit = filter_var($specification->unit, FILTER_SANITIZE_SPECIAL_CHARS);
        $value = filter_var($specification->value, FILTER_SANITIZE_SPECIAL_CHARS);

        try {
            $sql = "UPDATE sensors SET name = :name, unit = :unit, value = :value WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":unit", $unit);
            $stmt->bindParam(":value", $value);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function updateCircuitBreaker($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        
        try {
            $sql = "UPDATE circuitbreakers SET name = :name WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }
    
    public function updateFuse($specification, $id) {
        $name = filter_var($specification->name, FILTER_SANITIZE_SPECIAL_CHARS);
        $cbId = filter_var($specification->circuitbreakerid, FILTER_SANITIZE_SPECIAL_CHARS);
        
        try {
            $sql = "UPDATE fuses SET circuitbreakers_id = :cbId, name = :name WHERE id = :id";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":cbId", $cbId);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $rowsAffected = $stmt->rowCount();
            return $rowsAffected;
        } catch (PDOException $e) {
            echo $e->getTraceAsString();
            return false;
        }
    }

}
