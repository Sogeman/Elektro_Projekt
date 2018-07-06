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
    , EditEntry: function (clickedButton) {
        var parentRow = clickedButton.closest("tr")[0];
        var clickedItemId = $(parentRow).attr("itemid");
        //var clickedItem = // item in data suchen welches mit clickeditemid übereinstimmt
    }
};