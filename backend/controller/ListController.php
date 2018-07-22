<?php

/* 
 * Rene
 */

class ListController implements ControllerInterface {
    
    private $jsonView;
    private $listModel;
    private $listType;


    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
    }
    
    
    public function route($inputData) {
        $this->listType = $inputData->listtype;
        $parentId = $inputData->parentid;
        $this->createRequestedList($parentId);

        $this->formatAndDisplayListData();   
    }
    
    private function createRequestedList($parentId) {
        
        switch ($this->listType) {
            case "floors":
                $this->listModel->listFloors($parentId);
                break;
            case "rooms":
                $this->listModel->listRooms($parentId);
                break;
            case "devices":
                $this->listModel->listDevices($parentId);
                break;
            case "sensors":
                $this->listModel->listSensors($parentId);
                break;
            case "projects": 
                $this->listModel->listProjects();
                break;
            default:
               break;
        }
    }
    
    private function formatAndDisplayListData() {
        $itemList = array();
        $data = $this->listModel->getCurrentList();
        
        foreach($data as $row){
            $specification = $this->getSpecificationTable($row);
            
            $itemList[] = $specification;
            
        }
        $outputData = array (
            "listtype" => $this->listModel->getCurrentListType(),
            "items" => $itemList
        );
        $this->showResponse($outputData);
    }

     private function getSpecificationTable($entries){
        $specification = array();
        foreach($entries as $key => $value){
            
            if(!is_numeric($key)){
                $specification[$key] = $value;
            }
        }
        return $specification;
    }
    
    public function showResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }

}