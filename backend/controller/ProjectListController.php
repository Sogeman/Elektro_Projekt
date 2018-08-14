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
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function route($inputData) {
        $projectId = filter_var($inputData->projectid, FILTER_VALIDATE_INT);
        if ($inputData->action == "get-shoppinglist") {
            $this->getShoppinglist($projectId);
        } else if ($inputData->action == "all-fuses") {
            $this->getAllFuses($projectId);
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
        $schematicModel = new SchematicModel();

        $circuitbreakers = $listModel->listCircuitbreakers($projectId);
        $fuses = $schematicModel->listFusesOfProject($projectId);
        $devices = $schematicModel->listDevicesOfProject($projectId);
        $sensors = $schematicModel->listSensorsOfProject($projectId);

        $outputData = array(
            "Circuitbreakers" => $circuitbreakers,
            "Fuses" => $fuses,
            "Devices" => $devices,
            "Sensors" => $sensors
        );

        $this->showResponse($outputData);
    }
    
    private function getAllFuses($projectId) {
        $schematicModel = new SchematicModel();
        
        $fuses = $schematicModel->listFusesOfProject($projectId);
        $outputData = array(
            "items" => $fuses,
            "listtype" => $schematicModel->getCurrentListType()
        );
        
        $this->showResponse($outputData);
    }

    public function showResponse($output) {
        $this->jsonView->streamOutput($output);
    }

}
