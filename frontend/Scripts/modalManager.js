var ModalManager = {
// missing: select übernehmen und in request einbauen, prefill, wenn dropdown nicht verwendet dann Namen eingeben lassen
    formName: null,
    formFloorCount: null,
    formUnit: null,
    formValue: null,
    devicesSelect: null,
    sensorsSelect: null,
    data: null,

    Initialize: function (currentLevel, data) {
        ModalManager.formName = $("#form-name");
        ModalManager.formFloorCount = $("#form-floor-count");
        ModalManager.formUnit = $("#form-unit");
        ModalManager.formValue = $("#form-value");
        ModalManager.devicesSelect = $("#devices-select");
        ModalManager.sensorsSelect = $("#sensors-select");
        ModalManager.data = data;
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
    }

    , AddEntryFields: function (currentLevel) {

        $("#modal-title").text(QueryManager.GetCurrentLevelName() + " anlegen");
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
        }
    }

    , ClearModal: function(){
        ModalManager.formName.find("input").val("");
        ModalManager.devicesSelect[0].selectedIndex = 0; 
        ModalManager.sensorsSelect[0].selectedIndex = 0;
        ModalManager.formFloorCount.find("input").val("");
        ModalManager.formUnit.find("input").val("");
        ModalManager.formValue.find("input").val("");
    }

    , CreateEntry: function () {
        var listType = QueryManager.currentLevel;
        var data = {listtype: listType}
        
        EventHandler.SaveEvent(data, "create");
       
    }

    , EditEntry: function (clickedButton, data) {
        var clickedItem = EventHandler.FindClickedItem(clickedButton, data);
        ModalManager.PrefillModal(clickedItem);
        $("#modal-title").text(QueryManager.GetCurrentLevelName() + " aktualisieren")
        $("#create-entry-modal").modal(); //enables modal manually
        EventHandler.SaveEvent(data, "update");
    }

    , PrefillModal: function (clickedItem) {
        var entry = clickedItem[0];
        $("#item-id").attr("value", entry.id);
        console.log(entry.id);
        switch (QueryManager.currentLevel) {   //val("Steckdose 230V"); zum prefillen
            case "floors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formFloorCount.find("input").val(entry.floor_count_from_basement);
                break;
            case "rooms": case "projects":
                ModalManager.formName.find("input").val(entry.name);
                break;
            case "devices":
                //
                break;
            case "sensors":
                ModalManager.formName.find("input").val(entry.name);
                //
                ModalManager.formUnit.find("input").val(entry.unit);
                ModalManager.formValue.find("input").val(entry.value);
                break;
        }
    }

    , SaveEntry: function(data, action) {
        var listType = data["listtype"];
        var itemId = $("#item-id").val();
        var parentId = $("#parent-id").val();
        var name = ModalManager.formName.find("input").val();
        //console.log(name);
        var count = ModalManager.formFloorCount.find("input").val();
        var unit = ModalManager.formUnit.find("input").val();
        var value = ModalManager.formValue.find("input").val();
        var request = {action: action, listtype: listType, parentid: parentId, itemid: itemId, specification: {name: name, floor_count_from_basement: count, unit: unit, value: value}};
        QueryManager.PostData(request);
    }

    , DeleteWarning: function(clickedButton, data) {
        var clickedItem = EventHandler.FindClickedItem(clickedButton, data);
        var itemId = clickedItem[0].id;
        var listType = data.listtype;
        var request = {action: "delete", listtype: listType, itemid: itemId};
        $("#delete-warning-modal").modal();
        EventHandler.ConfirmDeletion(request);
    }

    , DeleteEntry: function(request) {
        QueryManager.PostData(request);
    }


};
