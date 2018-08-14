<?php

/**
 * @author Rene
 */
class SchematicModel {

    private $database;
    private $currentListType;
    private $list;

    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function GetCurrentList() {
        return $this->list;
    }
    
    public function getCurrentListType() {
        return $this->currentListType;
    }
    
    public function listDevicesOfProject($projectid) {
        $sql = "SELECT d.id, d.name, d.created, fuses.id as fuses_id FROM devices AS d LEFT JOIN fuses on d.fuses_id = fuses.id JOIN rooms on d.rooms_id = rooms.id JOIN floors on rooms.floors_id = floors.id JOIN"
                . " projects on floors.projects_id = projects.id WHERE projects.id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "devices";

        return $this->list;
    }

    public function listSensorsOfProject($projectid) {
        $sql = "SELECT s.id, s.name, s.created, s.unit, s.value, s.devices_id FROM sensors AS s join devices on s.devices_id = devices.id JOIN rooms on devices.rooms_id = rooms.id JOIN floors on rooms.floors_id = floors.id JOIN"
                . " projects on floors.projects_id = projects.id WHERE projects.id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "sensors";

        return $this->list;
    }

    public function listFusesOfProject($projectid) {
        $sql = "SELECT fuses.id, fuses.circuitbreakers_id, fuses.name, fuses.created FROM fuses "
                . "JOIN circuitbreakers ON fuses.circuitbreakers_id = circuitbreakers.id "
                . "JOIN projects ON circuitbreakers.projects_id = projects.id WHERE projects.id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "fuses";

        return $this->list;
    }

    private function getListFromDatabase($sql) {
        $result = array();
        try {
            foreach ($this->database->query($sql) as $row) {
                $result[] = $row;
            }
        } catch (PDOException $ex) {
            error_log("PDO ERROR: querying database: " . $ex->getMessage() . "\n" . $sql);
        }

        return $result;
    }

}
