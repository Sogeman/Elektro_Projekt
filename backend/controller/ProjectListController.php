<?php

/**
 * @author Rene (teils)
 */
class ProjectListController implements ControllerInterface {

    private $jsonView;
    private $database;

    public function __construct() {
        $this->jsonView = new JsonView();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function route($inputData) {
        $projectId = filter_var($inputData->projectid, FILTER_VALIDATE_INT);
        $name = filter_var($inputData->projectname, FILTER_SANITIZE_SPECIAL_CHARS);
        
        if ($inputData->action == "get-shoppinglist") {
            $this->getShoppinglist($projectId);
        } else if ($inputData->action == "all-fuses") {
            $this->getAllFuses($projectId);
        } else {
            $this->getSchematic($projectId, $name);
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

    private function getSchematic($projectId, $name) {
        $listModel = new ListModel();
        $schematicModel = new SchematicModel();

        $circuitbreakers = $listModel->listCircuitbreakers($projectId);
        $fuses = $schematicModel->listFusesOfProject($projectId);
        $devices = $schematicModel->listDevicesOfProject($projectId);
        $sensors = $schematicModel->listSensorsOfProject($projectId);

        $outputData = array(
            "Projectname" => $name,
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
