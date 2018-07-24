<?php

/**
 * @author Rene (teils)
 */
class ShoppingListController implements ControllerInterface {

    private $jsonView;
    private $listModel;
    private $database;

    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function route($inputData) {
        $projectId = filter_var($inputData->projectid, FILTER_VALIDATE_INT);
        $this->getShoppinglist($projectId);
    }
    
    private function getShoppingList($projectId){
        $listModel = new ListModel();
        
        $devices = $listModel->getProjectDevices($projectId);
        $sensors = $listModel->getProjectSensors($projectId);
        
        $outputData = array(
            "Devices" => $devices,
            "Sensors" => $sensors
        );
        
        $this->showResponse($outputData);
    }

    public function showResponse($output) {
        $this->jsonView->streamOutput($output);
    }

    
}
