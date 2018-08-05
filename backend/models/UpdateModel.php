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
        $name = $specification->name;

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
        $name = $specification->name;
        $count = $specification->floor_count_from_basement;

        try {
            $sql = "UPDATE floors SET floor_count_from_basement = :count, name = :name  WHERE id = :id";
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
        $name = $specification->name;

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
        $name = $specification->name;

        try {
            $sql = "UPDATE devices SET name = :name WHERE id = :id";
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

    public function updateSensor($specification, $id) {
        $name = $specification->name;
        $unit = $specification->unit;
        $value = $specification->value;

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
                ##### code #######
    }
    
    public function updateFuse($specification, $id) {
        ##### code #######
    }

}
