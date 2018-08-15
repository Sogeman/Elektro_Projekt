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

    , ShowHideButtons: function(listtype) { // hides/shows buttons on page depending on what the current level is
        if (listtype == "circuitbreakers" || listtype == "fuses") {
            $("#circuitbreaker-button").hide();
            $("#home").show();
        } else if (listtype == "projects") {
            $("#page-title").text("Projekte");
            $("#circuitbreaker-button").hide();
            $("#home").hide();
        } else {
            $("#circuitbreaker-button").show();
            $("#home").show();
        }
    }

    , FindClickedItem: function (clickedButton, data) {
        var parentRow = clickedButton.closest("tr")[0];
        var clickedItemId = $(parentRow).attr("itemid");
        var itemsObject = data["items"];
        var allItemsArray = itemsObject.map(function (element) { // check items from server against the id of the clicked item
            if (element.id == clickedItemId) {
                return element
            } else {
                return null
            }
        }, []);
        var clickedItem = allItemsArray.filter((obj) => obj);
        return clickedItem;
    }

    , FetchLastParentId: function () { // sets the parentid. Going into CBs and Fuses broke it before
        if (EventHandler.lastParentIds.length > 1) {
            EventHandler.lastParentIds.pop();
            $("#parent-id").attr("value", EventHandler.lastParentIds[EventHandler.lastParentIds.length - 1]);
        }
    }
}