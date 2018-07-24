var ModalManager = {

    formName: null,
    formFloorCount: null,
    formUnit: null,
    formValue: null,
    data: null,

    Initialize: function (currentLevel, data) {
        ModalManager.formName = $("#form-name");
        ModalManager.formFloorCount = $("#form-floor-count");
        ModalManager.formUnit = $("#form-unit");
        ModalManager.formValue = $("#form-value");
        ModalManager.data = data;
        ModalManager.ResetModal();
        ModalManager.AddEntryFields(currentLevel);
        EventHandler.ClearModal();
    }

    , ResetModal: function () {
        ModalManager.formName.hide();
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
            case "rooms": case "projects": case "devices":
                ModalManager.formName.show();
                break;
            case "sensors":
                ModalManager.formName.show();
                ModalManager.formUnit.show();
                ModalManager.formValue.show();
                break;
        }
    }

    , ClearModal: function(){
        ModalManager.formName.find("input").val("");
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
        switch (QueryManager.currentLevel) {
            case "floors":
                ModalManager.formName.find("input").val(entry.name);
                ModalManager.formFloorCount.find("input").val(entry.floor_count_from_basement);
                break;
            case "rooms": case "projects": case "devices":
                ModalManager.formName.find("input").val(entry.name);
                break;
            case "sensors":
                ModalManager.formName.find("input").val(entry.name);
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
