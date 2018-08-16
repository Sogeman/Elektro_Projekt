var ModalManager = {

    formName: null,
    formFloorCount: null,
    formUnit: null,
    formValue: null,
    formDevicesSelect: null,
    formSensorsSelect: null,
    formFusesSelect: null,
    formCurrentChoice: null

    , Initialize: function (currentLevel, data) {
        ModalManager.formName = $("#form-name");
        ModalManager.formFloorCount = $("#form-floor-count");
        ModalManager.formUnit = $("#form-unit");
        ModalManager.formValue = $("#form-value");
        ModalManager.formDevicesSelect = $("#form-devices-select");
        ModalManager.formSensorsSelect = $("#form-sensors-select");
        ModalManager.formFusesSelect = $("#form-fuses-select");
        ModalManager.formCurrentChoice = $("#form-current-choice");
        ModalManager.ResetModal();
        ModalManager.AddEntryFields(currentLevel);
        EventHandler.ClearModal();
    }

    , ResetModal: function () {
        ModalManager.formName.hide();
        ModalManager.formDevicesSelect.hide();
        ModalManager.formSensorsSelect.hide();
        ModalManager.formFloorCount.hide();
        ModalManager.formUnit.hide();
        ModalManager.formValue.hide();
        ModalManager.formFusesSelect.hide();
        ModalManager.formCurrentChoice.hide();
    }

    , AddEntryFields: function (currentLevel) {
        switch (currentLevel) {
            case "floors":
                ModalManager.formName.show();
                ModalManager.formFloorCount.show();
                break;
            case "rooms": case "projects": case "circuitbreakers": case "fuses":
                ModalManager.formName.show();
                break;
            case "devices":
                ModalManager.formName.show();
                ModalManager.formDevicesSelect.show();
                ModalManager.formFusesSelect.show();
                ModalManager.formCurrentChoice.show();
                break;
            case "sensors":
                ModalManager.formName.show();
                ModalManager.formSensorsSelect.show();
                ModalManager.formUnit.show();
                ModalManager.formValue.show();
                break;
        }
    }

    , ClearModal: function () {
        ModalManager.formName.find("input").val("");
        $("#devices-select, #sensors-select, #fuses-select").siblings().remove();
        ModalManager.formFloorCount.find("input").val("");
        ModalManager.formUnit.find("input").val("");
        ModalManager.formValue.find("input").val("");
        ModalManager.formCurrentChoice.find("input").val("");
    }

    , CreateEntry: function () { // Befehle im Switch in funktion rausbrechen
        $("#modal-title").text(MiscLogic.GetCurrentLevelName() + " anlegen");
        switch (QueryManager.currentLevel) {
            case "devices":
                ModalManager.formDevicesSelect.change(function () {
                    var text = $("#form-devices-select option:selected").text();
                    ModalManager.formName.find("input").val(text);
                });
                ModalManager.formFusesSelect.change(function() {
                    var text = $("#form-fuses-select option:selected").text();
                    ModalManager.formCurrentChoice.find("input").val(text);
                    $("#fuse-id").val($("#form-fuses-select option:selected").val());
                })
                break;
            case "sensors":
                ModalManager.formSensorsSelect.change(function () {
                    var text = $("#form-sensors-select option:selected").text();
                    ModalManager.formName.find("input").val(text);
                });
                break;
            default:
                break;
        }
        EventHandler.SaveEvent("create");
    }

    , SaveEntry: function (action) {
        var listType = QueryManager.currentLevel;
        var itemId = $("#item-id").val();
        var parentId = $("#parent-id").val();
        var name = ModalManager.formName.find("input").val() || "0";
        var count = ModalManager.formFloorCount.find("input").val() || "0";
        var unit = ModalManager.formUnit.find("input").val() || "0";
        var value = ModalManager.formValue.find("input").val() || "0";
        var fuseId = $("#fuse-id").val();
        if (action == "create") {
            var request = { action: action, listtype: listType, parentid: parentId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value, fuseid: fuseId } };
        } else {
            var request = { action: action, listtype: listType, parentid: parentId, itemid: itemId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value, fuseid: fuseId } };
        }
        QueryManager.PostData(request);
    }

    , EditEntry: function (clickedButton, data) {
        var clickedItem = MiscLogic.FindClickedItem(clickedButton, data);
        ModalManager.PrefillModal(clickedItem);
        $("#modal-title").text(MiscLogic.GetCurrentLevelName() + " aktualisieren")
        $("#create-entry-modal").modal(); //enables modal manually
        EventHandler.SaveEvent("update");
    }

    , PrefillModal: function (clickedItem) { 
        var entry = clickedItem[0];
        $("#item-id").attr("value", entry.id);
        $("#fuse-id").attr("value", entry.fuses_id);
        //console.log(entry);
        switch (QueryManager.currentLevel) {
            case "floors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formFloorCount.find("input").val(entry.floor_count_from_basement);
                break;
            case "rooms": case "projects": case "circuitbreakers": case "fuses":
                ModalManager.formName.find("input").val(entry.name);
                break;
            case "devices":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formCurrentChoice.find("input").val(entry.fusename);
                ModalManager.formDevicesSelect.change(function () {
                    var text = $("#form-devices-select option:selected").text();
                    ModalManager.formName.find("input").val(text);
                });
                ModalManager.formFusesSelect.change(function() {
                    var text = $("#form-fuses-select option:selected").text();
                    ModalManager.formCurrentChoice.find("input").val(text);
                    $("#fuse-id").val($("#form-fuses-select option:selected").val());
                })
                break;
            case "sensors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formSensorsSelect.change(function () {
                    var text = $("#form-sensors-select option:selected").text();
                    ModalManager.formName.find("input").val(text);
                });
                ModalManager.formUnit.find("input").val(entry.unit);
                ModalManager.formValue.find("input").val(entry.value);
                break;
        }
    }

    , DeleteWarning: function (clickedButton, data) {
        var clickedItem = MiscLogic.FindClickedItem(clickedButton, data);
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
