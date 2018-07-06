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
                # Error
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
                #error handling
                $newId = false;
                break;
        }
        
        if($newId != false) {
            $this->result = array("status" => "OK", "new ID" => $newId);
        } else {
            $this->result = array("status" => "Error", "message" => "no new ID created");
        }
    }

    private function updateItem() {
        $updateModel = new UpdateModel();
        
        switch (strtolower($this->inputData->listtype)) {
            case "projects":
                $newId = $updateModel->updateProject($this->inputData->itemId);
                break;
            case "floors":
                $newId = $updateModel->updateFloor($this->inputData->itemId);
                break;
            case "rooms":
                $newId = $updateModel->updateRoom($this->inputData->itemId);
                break;
            case "devices":
                $newId = $updateModel->updateDevice($this->inputData->itemId);
                break;
            case "sensors":
                $newId = $updateModel->updateSensor($this->inputData->itemId);
                break;
            #FIs und Sicherungen ??
            default:
                #error handling
                $newId = false;
                break;
        }
        
        if($newId != false) {
            $this->result = array("status" => "OK", "ID updated" => $this->inputData->itemId);
        } else {
            $this->result = array("status" => "Error", "message" => "nothing was updated");
        }
    }

    private function deleteItem() {
       $deleteModel = new DeleteModel();
        
        switch (strtolower($this->inputData->listtype)) {
            case "projects":
                $newId = $deleteModel->deleteProject($this->inputData->itemId);
                break;
            case "floors":
                $newId = $deleteModel->deleteFloor($this->inputData->itemId);
                break;
            case "rooms":
                $newId = $deleteModel->deleteRoom($this->inputData->itemId);
                break;
            case "devices":
                $newId = $deleteModel->deleteDevice($this->inputData->itemId);
                break;
            case "sensors":
                $newId = $deleteModel->deleteSensor($this->inputData->itemId);
                break;
            #FIs und Sicherungen ??
            default:
                #error handling
                $newId = false;
                break;
        }
        if($newId != false) {
            $this->result = array("status" => "OK", "ID deleted" => $this->inputData->itemId);
        } else {
            $this->result = array("status" => "Error", "message" => "nothing was deleted");
        }
        
    }

    public function showResponse($output) {
        $this->jsonView->streamOutput($output);
    }
}