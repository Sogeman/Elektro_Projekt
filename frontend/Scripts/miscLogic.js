var MiscLogic = {

    lastParentIds: [],
    titleHistory: [],

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

    , ShowHideButtons: function (listtype) { // hides/shows buttons on page depending on what the current level is
        if (listtype == "circuitbreakers" || listtype == "fuses") {
            $("#circuitbreaker-button").hide();
            $("#home").fadeIn();
        } else if (listtype == "projects") {
            $("#page-title").text("Projekte");
            $("#circuitbreaker-button").hide();
            $("#home").hide();
        } else {
            $("#circuitbreaker-button").fadeIn();
            $("#home").fadeIn();
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

    , FetchLastParentIdAndTitle: function () { // sets the parentid. Going into CBs and Fuses broke it before
        if (MiscLogic.lastParentIds.length > 1) {
            MiscLogic.lastParentIds.pop();
            $("#parent-id").attr("value", MiscLogic.lastParentIds[MiscLogic.lastParentIds.length - 1]);
        }
        if (MiscLogic.titleHistory.length > 1) {
            MiscLogic.titleHistory.pop();
            $("#page-title").text(MiscLogic.titleHistory[MiscLogic.titleHistory.length - 1]);
        }
    }
    
    , ValidateInputfields: function (inputFields) { // check if inputfields defined in ModalManager.SetInputfields are empty or not
        var validate = [];
            inputFields.each(function () {
                if ($(this).val().trim().length < 1) {
                    validate.push(false);
                } else {
                    validate.push(true);
                }
            });
        var result = validate.includes(false);
        return result;
    }
}
