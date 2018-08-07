<?php

/**
 * @author Rene (teils)
 */
class ProjectListController implements ControllerInterface {

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
        if ($inputData->action == "get-shoppinglist") {
            $this->getShoppinglist($projectId);
        } else {
            $this->getSchematic($projectId);
        }
    }

    private function getShoppingList($projectId) {
        $listModel = new ListModel();

        $devices = $listModel->getProjectDevices($projectId);
        $sensors = $listModel->getProjectSensors($projectId);

        $outputData = array(
            "Devices" => $devices,
            "Sensors" => $sensors
        );

        $this->showResponse($outputData);
    }
    
    private function getSchematic($projectId) {
        $listModel = new ListModel();
        
        $circuitbreakers = $listModel->listCircuitbreakers($projectId);
        $fuses = $listModel->listFuses($projectId);
        $rooms = $listModel->listRoomsOfProject($projectId);
        $devices = $listModel->listDevicesOfProject($projectId);
        $sensors = $listModel->listSensorsOfProject($projectId);
        
        $outputData = array(
          "Circuitbreakers" => $circuitbreakers,
          "Fuses" => $fuses,
          "Rooms" => $rooms,
          "Devices" => $devices,
          "Sensors" => $sensors
        );
        
        $this->showResponse($outputData);
    }

    public function showResponse($output) {
        $this->jsonView->streamOutput($output);
    }

}
