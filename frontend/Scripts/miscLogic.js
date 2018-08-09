var MiscLogic = {

    GetCurrentLevelName: function () {
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

    , showHideButtons: function(listtype) {
        if (listtype == "circuitbreakers") {
            $("#fuse-button").show();
            $("#circuitbreaker-button").hide();
            $("#home").show();
        } else if (listtype =="fuses") {
            $("#circuitbreaker-button").show();
            $("#fuse-button").hide();
            $("#home").show();
        } else if (listtype == "projects") {
            $("#page-title").text("Projekte");
            $("#circuitbreaker-button").hide();
            $("#fuse-button").hide();
            $("#home").hide();
        } else {
            $("#circuitbreaker-button").show();
            $("#fuse-button").show();
            $("#home").show();
        }
    }

    , DecideWhichLoadDataSimple: function () {
        switch (QueryManager.currentLevel) {
            case "floors":
                var request = { action: "list", listtype: "circuitbreakers", parentid: QueryManager.projectId };
                QueryManager.LoadDataSimple(request);
                break;
            case "devices":
                var request = { action: "list", listtype: "fuses", parentid: QueryManager.projectId};
                QueryManager.LoadDataSimple(request);
            case "circuitbreakers":
                var request = { action: "list", listtype: "floors", parentid: QueryManager.projectId };
                QueryManager.LoadDataSimple(request);
                break;
            case "fuses":
                var request = { action: "list", listtype: "projectrooms", parentid: QueryManager.projectId };
                QueryManager.LoadDataSimple(request);
                request = { action: "list", listtype: "circuitbreakers", parentid: QueryManager.projectId };
                QueryManager.LoadDataSimple(request);
                break;
        }
    }

    , FindClickedItem: function (clickedButton, data) {
        var parentRow = clickedButton.closest("tr")[0];
        var clickedItemId = $(parentRow).attr("itemid");
        var itemsObject = data["items"];
        var allItemsArray = itemsObject.map(function (element) {
            if (element.id == clickedItemId) {
                return element
            } else {
                return null
            }
        }, []);
        var clickedItem = allItemsArray.filter((obj) => obj);
        return clickedItem;
    }

}