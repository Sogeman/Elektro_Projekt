<?php

/* 
 * Rene test
 */

class ChangeController {

    private $jsonView;
    private $inputData;
    private $result;

    public function __construct() {
        $this->jsonView = new JsonView();
    }

    public function route($inputData) {
        $this->inputData = $inputData;
        switch ($this->inputData->action) {
            case "create":
                $this->createItem();
                break;
            case "update":
                $this->updateItem();
                break;
            case "delete":
                $this->deleteItem();
                break;
            default:
                $this->result = array("status" => "Error", "message" => "supported actions: create, update or delete");
                break;
        }

        $this->showResponse($this->result);
    }

    private function createItem() {
        $createModel = new CreateModel();
        
        switch (strtolower($this->inputData->listtype)) {
            case "projects":
                $newId = $createModel->createProject($this->inputData->specification);
                break;
            case "floors":
                $newId = $createModel->createFloor($this->inputData->specification, $this->inputData->parentid);
                break;
            case "rooms":
                $newId = $createModel->createRoom($this->inputData->specification, $this->inputData->parentid);
                break;
            case "devices":
                $newId = $createModel->createDevice($this->inputData->specification, $this->inputData->parentid);
                break;
            case "sensors":
                $newId = $createModel->createSensor($this->inputData->specification, $this->inputData->parentid);
                break;
            #FIs und Sicherungen ??
            default:
                $newId = false;
                break;
        }
        if($newId > 0) {
            $this->result = array("status" => "OK", "new ID" => $newId);
        } else if ($newId <= 0 && $newId != false) {
            $this->result = array("status" => "Error", "message" => "no new ID created");
        } else if ($newId === false) {
            $this->result = array("status" => "Error", "message" => "unsupported projectlevel entered");
        } 
    }

    private function updateItem() {
        $updateModel = new UpdateModel();
        
        switch (strtolower($this->inputData->listtype)) {
            case "projects":
                $rows = $updateModel->updateProject($this->inputData->specification, $this->inputData->itemId);
                break;
            case "floors":
                $rows = $updateModel->updateFloor($this->inputData->specification, $this->inputData->itemId);
                break;
            case "rooms":
                $rows = $updateModel->updateRoom($this->inputData->specification, $this->inputData->itemId);
                break;
            case "devices":
                $rows = $updateModel->updateDevice($this->inputData->specification, $this->inputData->itemId);
                break;
            case "sensors":
                $rows = $updateModel->updateSensor($this->inputData->specification, $this->inputData->itemId);
                break;
            #FIs und Sicherungen ??
            default:
                $rows = false;
                break;
        }
        if($rows > 0) {
            $this->result = array("status" => "OK");
        } else if ($rows <= 0 && $rows != false) {
            $this->result = array("status" => "Error", "message" => "nothing was updated");
        } else if ($rows == false) {
            $this->result = array("status" => "Error", "message" => "unsupported projectlevel entered");
        } 
    }

    private function deleteItem() {
       $deleteModel = new DeleteModel();
        
        switch (strtolower($this->inputData->listtype)) {
            case "projects":
                $rows = $deleteModel->deleteProject($this->inputData->itemId);
                break;
            case "floors":
                $rows = $deleteModel->deleteFloor($this->inputData->itemId);
                break;
            case "rooms":
                $rows = $deleteModel->deleteRoom($this->inputData->itemId);
                break;
            case "devices":
                $rows = $deleteModel->deleteDevice($this->inputData->itemId);
                break;
            case "sensors":
                $rows = $deleteModel->deleteSensor($this->inputData->itemId);
                break;
            #FIs und Sicherungen ??
            default:
                $rows = false;
                break;
        }
        if($rows > 0) {
            $this->result = array("status" => "OK", "ID deleted" => $this->inputData->itemId);
        } else if ($rows <= 0 && $rows != false) {
            $this->result = array("status" => "Error", "message" => "nothing was deleted");
        } else if ($rows == false) {
            $this->result = array("status" => "Error", "message" => "unsupported projectlevel entered");
        } 
        
    }

    public function showResponse($output) {
        $this->jsonView->streamOutput($output);
    }
}