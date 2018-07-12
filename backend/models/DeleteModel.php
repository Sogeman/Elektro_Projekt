<?php

/*
 * Rene
 */

class DeleteModel {

    private $database;

    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function deleteProject($id) {
        return $this->deleteFromTable("projects", $id);
    }
    
    public function deleteFloor($id) {
        return $this->deleteFromTable("floors", $id);
    }

    public function deleteRoom($id) {
        return $this->deleteFromTable("rooms", $id);
    }

    public function deleteDevice($id) {
        return $this->deleteFromTable("devices", $id);
    }

    public function deleteSensor($id) {
        return $this->deleteFromTable("sensors", $id);
    }

    private function deleteFromTable($tableName, $id) {
        $sql = "DELETE FROM $tableName WHERE id = :id LIMIT 1";
        $stmt = $this->database->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $rowsAffected = $stmt->rowCount();
        return $rowsAffected;
    }

}
