var queryManager = {
    currentLevel: "",
    backendAddress: "http://localhost/Elektro_Projekt/backend/index.php",
    lastRequest: [] // speichert letzten request für reload nach Änderung
    , LoadData: function (request) {
        queryManager.lastRequest[0] = request;
        $.ajax({
            url: queryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                viewSwitcher("homepage");
                //console.log(data);
                ListHandler.FillTable(data);
                $("#create-item-button").text("+ " + queryManager.GetCurrentLevelName());
                ModalManager.Initialize(queryManager.currentLevel, data);
            }
            , error: function (errorMsg) {
                viewSwitcher("homepage");
                console.log(errorMsg);
            }
        });
    }

    , PostData: function (request) {
        $("#save-button").unbind();
        $.ajax({
            url: queryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                // console.log("data ");
                // console.log(data);
                // console.log("request ");
                // console.log(request);
                // console.log("last request ");
                // console.log(queryManager.lastRequest[0]);
                $("#create-entry-modal").modal("hide"); // closes Modal after saving
                queryManager.LoadData(queryManager.lastRequest[0]) // reload page after sending new data to database
            }
            , error: function (errorMsg) {
                console.log(errorMsg);
            }
        });
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
        switch (queryManager.currentLevel.toUpperCase()) {
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
        switch (queryManager.currentLevel.toUpperCase()) {
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
                level = "";
                break;
            default:
                break;
        }
        return level;
    }

};
