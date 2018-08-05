var QueryManager = {
    currentLevel: "",
    backendAddress: "http://localhost/Elektro_Projekt/backend/index.php",
    lastRequests: [], // saves last requests for backbutton and reload
    projectId: 0
    , LoadData: function (request) {
        if (!QueryManager.lastRequests.some(item => JSON.stringify(item) === JSON.stringify(request))) {
            QueryManager.lastRequests.push(request);
        }
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                QueryManager.showHideButtons(request.listtype);
                QueryManager.currentLevel = request.listtype;
                viewSwitcher("homepage");
                ListHandler.FillTable(data);
                $("#create-item-button").text("+ " + QueryManager.GetCurrentLevelName());
                EventHandler.cbAndFuseButtons();
                ModalManager.Initialize(QueryManager.currentLevel, data);
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , LoadDataSimple: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                ListHandler.CreateSelectOption(data);
            }
            , error: QueryManager.ErrorMessage
        }); 
    }

    , PostData: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                $("#create-entry-modal").modal("hide"); // closes Modal after saving
                QueryManager.LoadData(QueryManager.lastRequests[QueryManager.lastRequests.length - 1]); // reload page after sending new data to database
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , LoadShoppingList: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                ShoppingListHandler.DrawShoppingList(request, data);
                $("#home").show();
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , showHideButtons: function(listtype) {
        if (listtype == "circuitbreakers") {
            $("#fuse-button").show();
            $("#circuitbreaker-button").hide();
            $("#back-button").show();
            $("#home").show();
        } else if (listtype =="fuses") {
            $("#circuitbreaker-button").show();
            $("#fuse-button").hide();
            $("#back-button").show();
            $("#home").show();
        } else if (listtype == "projects") {
            $("#page-title").text("Projekte");
            $("#circuitbreaker-button").hide();
            $("#fuse-button").hide();
            $("#back-button").hide();
            $("#home").hide();
        } else {
            $("#circuitbreaker-button").show();
            $("#fuse-button").show();
            $("#back-button").show();
            $("#home").show();
        }
    }

    , ErrorMessage: function (errorMsg) {
        alert("something went wrong, redirecting to homepage");
        QueryManager.LoadData(Controller.homepage);
        viewSwitcher("homepage");
        console.log(errorMsg);
    }

    , LoadingScreen: function () {
        $(document).ajaxStart(function () {
            $("#loading-screen").show();
        });

        $(document).ajaxStop(function () {
            $("#loading-screen").hide();
        });
    }

    , GetCurrentLevelName: function () {
        var level;
        switch (QueryManager.currentLevel.toUpperCase()) {
            case "PROJECTS":
                level = "Projekt";
                break;
            case "FLOORS":
                level = "Stockwerk";
                break;
            case "ROOMS":
                level = "Zimmer";
                break;
            case "DEVICES":
                level = "Gerät";
                break;
            case "SENSORS":
                level = "Sensor";
                break;
            case "CIRCUITBREAKERS":
                level = "FI";
                break;
            case "FUSES":
                level = "Sicherung";
                break;
            default:
                break;
        }
        return level;
    }

    , GetNextLevel: function () {
        var level;
        switch (QueryManager.currentLevel.toUpperCase()) {
            case "PROJECTS":
                level = "floors";
                break;
            case "FLOORS":
                level = "rooms";
                break;
            case "ROOMS":
                level = "devices";
                break;
            case "DEVICES":
                level = "sensors";
                break;
            case "SENSORS":
                level = "circuitbreakers"
                break;
            case "CIRCUITBREAKERS":
                level = "fuses";
                break;
            case "FUSES": 
                level = "fuses";
                break;
            default:
                break;
        }
        return level;
    }

    , GoBackToPreviousLevel: function () {
        if (QueryManager.lastRequests.length > 1) {
            QueryManager.lastRequests.pop();
            QueryManager.LoadData(QueryManager.lastRequests[QueryManager.lastRequests.length - 1]);
        }
    }

};
