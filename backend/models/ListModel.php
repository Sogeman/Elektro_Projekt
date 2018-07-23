<?php

/** 
 * @author Rene
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
}
