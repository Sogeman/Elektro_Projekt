var QueryManager = {
    currentLevel: "",
    backendAddress: "http://localhost/Elektro_Projekt/backend/index.php",
    lastRequests: [] // saves last requests for backbutton and reload
    , LoadData: function (request) {
        if (QueryManager.lastRequests[QueryManager.lastRequests.length - 1] != request) {
            QueryManager.lastRequests.push(request);
        }
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                if (request.listtype != "projects") {
                    $("#back-button").show();
                } else {
                    $("#page-title").text("Projekte");
                    $("#back-button").hide();
                }
                viewSwitcher("homepage");
                ListHandler.FillTable(data);
                $("#create-item-button").text("+ " + QueryManager.GetCurrentLevelName());
                ModalManager.Initialize(QueryManager.currentLevel, data);
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , PostData: function (request) {
        $("#save-button").unbind();
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

    , LoadShoppingList: function(request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: {data: JSON.stringify(request)}
            , dataType: "json"
            , cache: false
            , success: function(data) {
                ShoppingListHandler.DrawShoppingList(request, data);
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , ErrorMessage: function(errorMsg) {
        alert("something went wrong, redirecting to homepage");
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
                level = "sensors"; //otherwise it breaks when you click on a sensor
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
