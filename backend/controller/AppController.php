<?php

/*
 * Rene
 */

class AppController {

    public function route() {

        $jsonInput = filter_input(INPUT_POST, 'data');

        $inputData = json_decode($jsonInput);

        switch ($inputData->action) {
            case "list":
                $controller = new ListController();
                break;
            case "create": case "update": case "delete":
                $controller = new ChangeController();
                break;
            case "get-shoppinglist":
                $controller = new ShoppingListController();
                break;
            default:
                $controller = new ListController();
                break;
        }
        
        $controller->route($inputData);
        
    }

}
