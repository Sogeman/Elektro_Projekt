<?php

/**
 * @author Rene
 */

class ListController implements ControllerInterface {

    private $jsonView;
    private $listModel;
    private $listType;

    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
        $this->schematicModel = new SchematicModel();
    }

    public function route($inputData) {
        $this->listType = $inputData->listtype;
        $parentId = $inputData->parentid;
        $this->createRequestedList($parentId);

        $this->formatAndDisplayListData();
    }

    private function createRequestedList($parentId) {
        switch (filter_var($this->listType, FILTER_SANITIZE_SPECIAL_CHARS)) {
            case "floors":
                $this->listModel->listFloors($parentId);
                break;
            case "rooms":
                $this->listModel->listRooms($parentId);
                break;
            case "devices":
                $this->listModel->listDevices($parentId);
                break;
            case "devices-choice":
                $this->listModel->listDevicesChoice();
                break;
            case "sensors":
                $this->listModel->listSensors($parentId);
                break;
            case "sensors-choice":
                $this->listModel->listSensorsChoice();
                break;
            case "projects":
                $this->listModel->listProjects();
                break;
            case "circuitbreakers":
                $this->listModel->listCircuitbreakers($parentId);
                break;
            case "fuses":
                $this->listModel->listFuses($parentId);
                break;
            default:
                $this->showResponse(array("Message" => "wrong level name"));
                break;
        }
    }

    private function formatAndDisplayListData() {
        $itemList = array();
        $data = $this->listModel->getCurrentList();

        foreach ($data as $row) {
            $specification = $this->getSpecificationTable($row);

            $itemList[] = $specification;
        }

        $outputData = array(
            "listtype" => $this->listModel->getCurrentListType(),
            "items" => $itemList
        );
        $this->showResponse($outputData);
    }

    private function getSpecificationTable($entries) {
        $specification = array();
        foreach ($entries as $key => $value) {

            if (!is_numeric($key)) {
                $specification[$key] = $value;
            }
        }
        return $specification;
    }

    public function showResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }

}
