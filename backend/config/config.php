<?php

/** 
 * @author Rene
 */

error_reporting(E_ALL);

include "controller/ControllerInterface.php";
include "controller/AppController.php";
include "controller/ListController.php";
include "controller/ChangeController.php";
include "controller/ProjectListController.php";
include "models/ListModel.php";
include "models/CreateModel.php";
include "models/UpdateModel.php";
include "models/DeleteModel.php";
include "services/Database.php";
include "views/JsonView.php";




define ("DBHost", "localhost");
define ("DBName", "projekt_2sem"); 
define ("DBUser", "root");
define ("DBPass", "");