<?php

/**
 * @author Rene (teils)
 */

class ListModel {
    
    private $database;
    private $listType;
    private $currentListType;
    private $list;
    
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function setListType($listType){
        $this->listType = strtoupper( $listType );
    }
    
    public function getListType(){
        if(!$this->listType){
            return "PROJECTS";
        }
        return $this->listType;
    }
    
    public function GetCurrentList() {
        return $this->list;
    }
    
    public function getCurrentListType() {
        return $this->currentListType;
    }
    
    public function listProjects() {
        $sql = "SELECT id, name, created FROM projects";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "projects";
    }
    
    public function listFloors($projectid) {
        $sql = "SELECT id, name, floor_count_from_basement, circuitbreakers_id, created FROM floors WHERE projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "floors";
    }
    
    public function listRooms($floorid) {
        $sql = "SELECT id, name, fuses_id, created FROM rooms WHERE floors_id = {$floorid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "rooms";
    }
    
    public function listRoomsOfProject($projectid) {
        $sql = "SELECT rooms.id, rooms.name, rooms.fuses_id, rooms.created FROM rooms join floors on rooms.floors_id = floors.id join projects "
                . "on floors.projects_id = projects_id WHERE projects.id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "rooms";
    }
    
    public function listDevices($roomid) {
        $sql = "SELECT id, name, created FROM devices WHERE rooms_id = {$roomid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "devices";
    }
    
    public function listSensors($deviceid) {
        $sql = "SELECT id, name, unit, value, created FROM sensors WHERE devices_id = {$deviceid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "sensors";
    }
    
    public function listCircuitbreakers($projectid) {
        $sql = "SELECT c.id, c.floors_id, c.name, c.created FROM circuitbreakers AS c JOIN floors on c.floors_id"
                . " = floors.id JOIN projects on floors.projects_id = projects.id"
                . " WHERE projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "circuitbreakers";
    }
    
    public function listFuses($projectid) {
        $sql = "SELECT f.id, f.circuitbreakers_id, f.rooms_id, f.name, rooms.name AS roomname, c.name AS fi_name, f.created FROM fuses AS f "
                . "JOIN rooms on f.rooms_id = rooms.id JOIN circuitbreakers as c on f.circuitbreakers_id = c.id "
                . "JOIN floors on c.floors_id = floors.id JOIN projects ON floors.projects_id = projects.id WHERE projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "fuses";
    }
    
    private function getListFromDatabase($sql){
        $result = array();
        try{
            foreach ($this->database->query($sql) as $row) {
                $result[] = $row;
            }
        } catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$sql);
        }
        
        return $result;
    }
    
    public function getProjectDevices($projectId) {
        $sql = "SELECT devices.id, devices.name as Geraetename FROM devices JOIN rooms on devices.rooms_id = rooms.id JOIN floors on rooms.floors_id = floors.id JOIN projects on floors.projects_id = projects.id  
                WHERE projects.id = $projectId";
        
        $devices = $this->getListFromDatabase($sql);
        $devicesList = $this->getUniqueDevices($devices);
        
        return $devicesList;
    }
    
    private function getUniqueDevices($devices) {
        $uniqueDevices = array();
        
        foreach ($devices as $device) {
            
            $uniqueIdentifier = md5( $device['Geraetename']);
            
            if (!isset($uniqueDevices[$uniqueIdentifier])) {
                $uniqueDevices[$uniqueIdentifier] = array(
                  "name" => $device["Geraetename"],
                  "amount" => 1
                );
            } else {
                $uniqueDevices[$uniqueIdentifier]["amount"]++;
            }
        }
       return $uniqueDevices;
    }
    
    public function getProjectSensors($projectId) {
        
       $sql = "SELECT sensors.id, sensors.name as Sensorname FROM sensors JOIN devices ON sensors.devices_id = devices.id JOIN rooms on devices.rooms_id = rooms.id JOIN floors on rooms.floors_id = floors.id JOIN projects on floors.projects_id = projects.id  
        WHERE projects.id = $projectId";

        $sensors = $this->getListFromDatabase($sql);
        $sensorList = $this->getUniqueSensors($sensors);
        
        return $sensorList;
    }
    
    private function getUniqueSensors($sensors) {
        $uniqueSensors = array();
        
        foreach ($sensors as $sensor) {
            
            $uniqueIdentifier = md5( $sensor['Sensorname']);
            
            if (!isset($uniqueSensors[$uniqueIdentifier])) {
                $uniqueSensors[$uniqueIdentifier] = array(
                  "name" => $sensor["Sensorname"],
                  "amount" => 1
                );
            } else {
                $uniqueSensors[$uniqueIdentifier]["amount"]++;
            }
        }
       return $uniqueSensors;
    }

}