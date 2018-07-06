var queryManager = {
    currentLevel: "",
    backendAddress: "http://localhost/Elektro_Projekt/backend/index.php",
    currentItems: []
    , LoadData: function (request) {
        $.ajax({
            url: queryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                viewSwitcher("homepage");
                //console.log(list);
                ListHandler.FillTable(data);
                //queryManager.GetCurrentItems(data);
                $("#add-item-button").text("+ " + queryManager.GetCurrentLevelName());
                ModalManager.Initialize(queryManager.currentLevel, data);
            }
            , error: function(errorMsg) {
                viewSwitcher("homepage");
            	console.log(errorMsg);
            }
        });
    }

    , PostData: function(request) {
        $.ajax({
            url: queryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function(data) {
                //stuff that happens when you send data
            }
            , error: function(errorMsg) {
                console.log(errorMsg);
            }
        });
    }

    , GetCurrentLevelName: function() {
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
    , GetCurrentItems: function(data) {
        
    }
};
