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
        ModalManager.AddEntryFields(currentLevel, data);
        $("#create-entry-modal").on("hidden.bs.modal", function (e) {
            ModalManager.ClearModal();
        });
    },

    AddEntryFields: function (currentLevel, data) {

        $("#modal-title").text(queryManager.GetCurrentLevelName() + " anlegen");
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

    , ResetModal: function () {
        ModalManager.formName.hide();
        ModalManager.formFloorCount.hide();
        ModalManager.formUnit.hide();
        ModalManager.formValue.hide();
    }

    , ClearModal: function(){
        ModalManager.formName.find("input").val("");
        ModalManager.formFloorCount.find("input").val("");
        ModalManager.formUnit.find("input").val("");
        ModalManager.formValue.find("input").val("");
    }

    , EditEntry: function (clickedButton, data) {
        var clickedEntry = ModalManager.findClickedEntry(clickedButton, data);
        ModalManager.PrefillModal(clickedEntry);
        $("#create-entry-modal").modal();
        //ajax call still missing
        //reload the table after ajax call
    }

    , PrefillModal: function (clickedEntry) {
        var entry = clickedEntry[0];
        $("#item-id").attr("value", entry.id);
        console.log(entry.id);
        switch (queryManager.currentLevel) {
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

    , findClickedEntry: function (clickedButton, data) {
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

    , DeleteEntry: function () {
        // code
        // sicherheitsabfrage vorm löschen
    }
};