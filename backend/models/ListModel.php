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
        $sql = "SELECT id, name, floor_count_from_basement, created FROM floors WHERE projects_id = {$projectid}";
        $this->list = $this->getListFromDatabase($sql);
        $this->currentListType = "floors";
    }
    
    public function listRooms($floorid) {
        $sql = "SELECT id, name, created FROM rooms WHERE floors_id = {$floorid}";
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
        
//         $sql = "SELECT devices.id, devices.name as Geraetename from devices "
//                 . "JOIN rooms on devices.rooms_id = rooms.id "
//                 . "JOIN floors on rooms.floors_id = floors.id "
//                 . "JOIN projects on floors.projects_id = projects.id "
//                 . "WHERE projects.id = {$projectId};";

        $devices = $this->getListFromDatabase($sql);
        $devicesList = $this->getUniqueDevices($devices);
        
        #$devicesList = $this->countDevicesAndSensors($devices);
        return $devicesList;
    }
    
    private function getUniqueDevices($devices) {
        $uniqueDevices = array();
        
        foreach ($devices as $device) {
            
            $uniqueIdentifier = md5( $device['Geraetename'].rand(0,100) );
            
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
       
//        $sql = "SELECT sensors.id, sensors.name as Sensorname from sensors "
//                 . "JOIN devices on sensors.devices_id = sensors.id "
//                 . "JOIN rooms on devices.rooms_id = rooms.id "
//                 . "JOIN floors on rooms.floors_id = floors.id "
//                 . "JOIN projects on floors.projects_id = projects.id "
//                 . "WHERE projects.id = {$projectId};";

        $sensors = $this->getListFromDatabase($sql);
        $sensorList = $this->getUniqueSensors($sensors);
        
        return $sensorList;
    }
    
    private function getUniqueSensors($sensors) {
        $uniqueSensors = array();
        
        foreach ($sensors as $sensor) {
            
            $uniqueIdentifier = md5( $sensor['Sensorname'].rand(0,100) );
            
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
    
    
    
    
    
    
    
    
    
    
    
//    private function countDevicesAndSensors($listOfDevices) {
//        
//        $uniqueDevices = array();
//        
//        foreach ($listOfDevices as $device) {
//            $currentSql = "SELECT name FROM sensors WHERE devices_id = " . $device['id'];
//            $sensors = $this->getListFromDatabase($currentSql);
//            
//            $uniqueIdentifier = md5( $device['Name'].json_encode($sensors) );
//            
//            if (!isset($uniqueDevices[$uniqueIdentifier])) {
//                $uniqueDevices[$uniqueIdentifier] = array(
//                  "name" => $device["Name"],
//                  "amount" => 1,
//                  "sensors" => $sensors
//                );
//            } else {
//                $uniqueDevices[$uniqueIdentifier]["amount"]++;
//            }
//        }
//        return $uniqueDevices;
//        
//    }
    
    

}