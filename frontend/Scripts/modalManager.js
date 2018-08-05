var ModalManager = {

    formName: null,
    formFloorCount: null,
    formUnit: null,
    formValue: null,
    devicesSelect: null,
    sensorsSelect: null,
    formFloorsSelect: null,
    formRoomsSelect: null,
    formCircuitbreakersSelect: null,
    data: null,

    Initialize: function (currentLevel, data) {
        ModalManager.formName = $("#form-name");
        ModalManager.formFloorCount = $("#form-floor-count");
        ModalManager.formUnit = $("#form-unit");
        ModalManager.formValue = $("#form-value");
        ModalManager.devicesSelect = $("#devices-select");
        ModalManager.sensorsSelect = $("#sensors-select");
        ModalManager.formFloorsSelect = $("#form-floors-select");
        ModalManager.formRoomsSelect = $("#form-rooms-select");
        ModalManager.formCircuitbreakersSelect = $("#form-circuitbreakers-select");
        ModalManager.ResetModal();
        ModalManager.AddEntryFields(currentLevel);
        EventHandler.ClearModal();
    }

    , ResetModal: function () {
        ModalManager.formName.hide();
        ModalManager.devicesSelect.hide();
        ModalManager.sensorsSelect.hide();
        ModalManager.formFloorCount.hide();
        ModalManager.formUnit.hide();
        ModalManager.formValue.hide();
        ModalManager.formFloorsSelect.hide();
        ModalManager.formRoomsSelect.hide();
        ModalManager.formCircuitbreakersSelect.hide();
    }

    , AddEntryFields: function (currentLevel) {
        switch (currentLevel) {
            case "floors":
                ModalManager.formName.show();
                ModalManager.formFloorCount.show();
                break;
            case "rooms": case "projects":
                ModalManager.formName.show();
                break;
            case "devices":
                ModalManager.formName.show();
                ModalManager.devicesSelect.show();
                break;
            case "sensors":
                ModalManager.formName.show();
                ModalManager.sensorsSelect.show();
                ModalManager.formUnit.show();
                ModalManager.formValue.show();
                break;
            case "circuitbreakers":
                ModalManager.formName.show();
                ModalManager.formFloorsSelect.show();
                break;
            case "fuses":
                ModalManager.formName.show();
                ModalManager.formRoomsSelect.show();
                ModalManager.formCircuitbreakersSelect.show();
                break;
        }
    }

    , ClearModal: function () {
        ModalManager.formName.find("input").val("");
        ModalManager.devicesSelect[0].selectedIndex = 0;
        ModalManager.sensorsSelect[0].selectedIndex = 0;
        ModalManager.formFloorCount.find("input").val("");
        ModalManager.formUnit.find("input").val("");
        ModalManager.formValue.find("input").val("");
        $("#floors-select")[0].selectedIndex = 0;
        $("#rooms-select")[0].selectedIndex = 0;
        $("#circuitbreakers-select")[0].selectedIndex = 0;
    }

    , CreateEntry: function () {
        $("#modal-title").text(QueryManager.GetCurrentLevelName() + " anlegen");
        EventHandler.SaveEvent("create");
        // just uses SaveEntry
    }

    , SaveEntry: function (action) {
        // code for circuitbr. and fuses
        var listType = QueryManager.currentLevel;
        var itemId = $("#item-id").val();
        var parentId = $("#parent-id").val();
        var name = ModalManager.formName.find("input").val();
        var count = ModalManager.formFloorCount.find("input").val();
        var unit = ModalManager.formUnit.find("input").val();
        var value = ModalManager.formValue.find("input").val();
        var floorId = ModalManager.formFloorsSelect.val();
        var roomId = ModalManager.formRoomsSelect.val();
        var circuitbreakerId = ModalManager.formCircuitbreakersSelect.val();
        if (action == "create") {
            var request = { action: action, listtype: listType, parentid: parentId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value, floorid: floorId, roomid: roomId, circuitbreakerid: circuitbreakerId} };
        } else {
            var request = { action: action, listtype: listType, parentid: parentId, itemid: itemId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value } };
        }
        QueryManager.PostData(request);
    }

    , EditEntry: function (clickedButton, data) {
        var clickedItem = EventHandler.FindClickedItem(clickedButton, data);
        ModalManager.PrefillModal(clickedItem);
        $("#modal-title").text(QueryManager.GetCurrentLevelName() + " aktualisieren")
        $("#create-entry-modal").modal(); //enables modal manually
        EventHandler.SaveEvent("update");
    }

    , PrefillModal: function (clickedItem) {
        var entry = clickedItem[0];
        $("#item-id").attr("value", entry.id);
        console.log(entry.id);
        switch (QueryManager.currentLevel) {
            case "floors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formFloorCount.find("input").val(entry.floor_count_from_basement);
                break;
            case "rooms": case "projects":
                ModalManager.formName.find("input").val(entry.name);
                break;
            case "devices":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.devicesSelect.change(function () {
                    var value = ModalManager.devicesSelect.val();
                    ModalManager.formName.find("input").val(value);
                });
                break;
            case "sensors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.sensorsSelect.change(function () {
                    var value = ModalManager.sensorsSelect.val();
                    ModalManager.formName.find("input").val(value);
                });
                ModalManager.formUnit.find("input").val(entry.unit);
                ModalManager.formValue.find("input").val(entry.value);
                break;
            case "circuitbreakers":
                ModalManager.formName.find("input").val(entry.name);
                // code 
                break;
            case "fuses":
                ModalManager.formName.find("input").val(entry.name);
                // code
                break;
        }
    }

    , DrawOptionSelect: function() {

    }

    , DeleteWarning: function (clickedButton, data) {
        var clickedItem = EventHandler.FindClickedItem(clickedButton, data);
        var itemId = clickedItem[0].id;
        var listType = data.listtype;
        var request = { action: "delete", listtype: listType, itemid: itemId };
        $("#delete-warning-modal").modal();
        EventHandler.ConfirmDeletion(request);
    }

    , DeleteEntry: function (request) {
        QueryManager.PostData(request);
    }


};
