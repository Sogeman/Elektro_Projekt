<?php

/**
 * @author Rene
 */    

 class ShoppingListController implements ControllerInterface {
        
        public function route($inputData) {
        
        }

        public function showResponse($outputData) {
        
        }

}


/* class ShoppingListController implements ControllerInterface {

    private $id;
    private $name;
    private $jsonView;
    private $listModel;
    private $database;

    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function roue($inputData) {
        $this->id = $inputData->itemid;

        $this->listModel->createShoppinglist($this->id);
        $this->formatAndDisplayShoppinglist();
    }
    
    private function formatAndDisplayShoppinglist() {
        $itemList = array();
        $data = $this->listModel->getCurrentList();
        
        foreach($data as $row){
            
            
        }
        $outputData = array (
            
        );
        $this->showResponse($data);
    }

    public function showReponse($output) {
        $this->jsonView->streamOutput($output);
    }

    public function route($inputData) {
        
    }

    public function showResponse($outputData) {
        
    }

} */
