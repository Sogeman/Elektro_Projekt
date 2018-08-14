<?php

/**
 * @author Rene
 */

class AppController {

    public function route() {

        $jsonInput = filter_input(INPUT_POST, 'data');

        $inputData = json_decode($jsonInput);
        
        switch (filter_var($inputData->action, FILTER_SANITIZE_SPECIAL_CHARS)) {
            case "list":
                $controller = new ListController();
                break;
            case "create":
            case "update":
            case "delete":
                $controller = new ChangeController();
                break;
            case "get-shoppinglist":
                $controller = new ProjectListController();
                break;
            case "get-schematic": case "all-fuses":
                $controller = new ProjectListController();
                break;
            default:
                $controller = new ListController();
                break;
        }
        
        $controller->route($inputData);
        
    }

}
