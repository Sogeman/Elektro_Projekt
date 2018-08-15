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
        return $this->list;
    }
    
    public function listFloors($projectid) {
        $sql = "SELECT id, projects_id, name, floor_count_from_basement, created FROM floors WHERE projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "floors";
        return $this->list;
    }
    
    public function listRooms($floorid) {
        $sql = "SELECT id, floors_id, name, created FROM rooms WHERE floors_id = {$floorid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "rooms";
        return $this->list;
    }
    
    public function listDevices($roomid) {
        $sql = "SELECT devices.id, devices.rooms_id, devices.fuses_id, devices.name, devices.created, fuses.name as fusename FROM devices LEFT JOIN fuses ON devices.fuses_id = fuses.id WHERE devices.rooms_id = {$roomid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "devices";
        return $this->list;
    }
    
    public function listDevicesChoice() {
        $sql = "SELECT * FROM devices_select";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "devices-choice";
        return $this->list;
    }


    public function listSensors($deviceid) {
        $sql = "SELECT id, devices_id, name, unit, value, created FROM sensors WHERE devices_id = {$deviceid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "sensors";
        return $this->list;
    }
    
    public function listSensorsChoice() {
        $sql = "SELECT * FROM sensors_select";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "sensors-choice";
        return $this->list;
    }
    
    public function listCircuitbreakers($projectid) {
        $sql = "SELECT id, projects_id, name, created FROM circuitbreakers where projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "circuitbreakers";
        return $this->list;
    }
    
    public function listFuses($circuitbreakerid) {
        $sql = "SELECT id, circuitbreakers_id, name, created FROM fuses WHERE circuitbreakers_id = {$circuitbreakerid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "fuses";
        return $this->list;
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