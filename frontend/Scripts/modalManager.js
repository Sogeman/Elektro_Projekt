var ModalManager = {

    formName: null,
    formFloorCount: null,
    formUnit: null,
    formValue: null,
    formDevicesSelect: null,
    formSensorsSelect: null,
    formFusesSelect: null,
    formCurrentChoice: null,
    formFuseCount: null

    , Initialize: function (currentLevel, data) {
        ModalManager.formName = $("#form-name");
        ModalManager.formFloorCount = $("#form-floor-count");
        ModalManager.formUnit = $("#form-unit");
        ModalManager.formValue = $("#form-value");
        ModalManager.formDevicesSelect = $("#form-devices-select");
        ModalManager.formSensorsSelect = $("#form-sensors-select");
        ModalManager.formFusesSelect = $("#form-fuses-select");
        ModalManager.formCurrentChoice = $("#form-current-choice");
        ModalManager.formFuseCount = $("#form-fuse-count");
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
        ModalManager.formFuseCount.hide();
    }

    , AddEntryFields: function (currentLevel) {
        switch (currentLevel) {
            case "floors":
                ModalManager.formName.show();
                ModalManager.formFloorCount.show();
                break;
            case "rooms": case "projects": case "circuitbreakers":
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
            case "fuses":
                ModalManager.formName.show();
        }
    }

    , ClearModal: function () {
        ModalManager.formName.find("input").val("");
        $("#devices-select, #sensors-select, #fuses-select").siblings().remove();
        ModalManager.formFloorCount.find("input").val("");
        ModalManager.formUnit.find("input").val("");
        ModalManager.formValue.find("input").val("");
        ModalManager.formCurrentChoice.find("input").val("");
        ModalManager.formFuseCount.find("input").val("1");
    }

    , CreateEntry: function () { // Befehle im Switch in funktion rausbrechen
        $("#modal-title").text(MiscLogic.GetCurrentLevelName() + " anlegen");
        switch (QueryManager.currentLevel) { // updates inputfields when you choose from options
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
            case "fuses":
                ModalManager.formName.find("input").on("keyup", function() { // change event sadly only works on blur, so not really useable with one input field
                    if(ModalManager.formName.find("input").val() == "Reserve") {
                        ModalManager.formFuseCount.show();
                    }
                });
            default:
                break;
        }
        EventHandler.SaveEvent("create");
        EventHandler.SubmitWithEnter("create");
    }

    , SaveEntry: function (action) {
        var listType = QueryManager.currentLevel;
        var itemId = $("#item-id").val();
        var parentId = $("#parent-id").val();
        var name = ModalManager.formName.find("input").val().trim() || "nothing";
        var count = ModalManager.formFloorCount.find("input").val() || "0";
        var unit = ModalManager.formUnit.find("input").val().trim() || "nothing";
        var value = ModalManager.formValue.find("input").val().trim() || "nothing";
        var fuseId = $("#fuse-id").val();
        var fuseCount = ModalManager.formFuseCount.find("input").val() || 1;
        if (action == "create") {
            var request = { action: action, listtype: listType, parentid: parentId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value, fuseid: fuseId } };
        } else { // adds itemid for update and delete
            var request = { action: action, listtype: listType, parentid: parentId, itemid: itemId, specification: { name: name, floor_count_from_basement: count, unit: unit, value: value, fuseid: fuseId } };
        }
        for (let index = 0; index < fuseCount; index++) { // for loop fires PostData multiple times depending on the fuse count
            QueryManager.PostData(request);
        }
        $("#create-entry-modal").modal("hide"); // closes Modal after saving
    }

    , EditEntry: function (clickedButton, data) {
        var clickedItem = MiscLogic.FindClickedItem(clickedButton, data);
        ModalManager.PrefillModal(clickedItem);
        $("#modal-title").text(MiscLogic.GetCurrentLevelName() + " aktualisieren")
        $("#create-entry-modal").modal(); //enables modal manually
        EventHandler.SaveEvent("update");
        EventHandler.SubmitWithEnter("update");
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

    , setInputfields: function () {
        switch (QueryManager.currentLevel) { // define inputfields to look for
                case "projects": case "floors": case "rooms": case "sensors": case "circuitbreakers": case "fuses":
                    var inputFields = $("#name");
                    break;
                case "devices":
                    var inputFields = $("#name, #current-choice");
                    break;
                default:
                    break;
            }
        return inputFields;
    }
};
