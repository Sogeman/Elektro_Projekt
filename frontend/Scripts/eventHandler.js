var EventHandler = {

    Initialize: function () {
        QueryManager.LoadingScreen();
        QueryManager.LoadData(Controller.homepage);
        EventHandler.HomeEvent();
        EventHandler.CreateEvent();
    }

    , TableEvents: function (serverData) {
        // Event for going to the next level
        EventHandler.ClickableRow(serverData);
        // Events for delete, edit, shopping list, back and schematic buttons
        EventHandler.EditButton(serverData);
        EventHandler.DeleteButton(serverData);
        EventHandler.BackButton();
        EventHandler.ShoppingListButton(serverData);
        EventHandler.SchematicButton(serverData);

    }

    , ClickableRow: function (serverData) { // events for the part of the row you can click
        $(".clickable").off().on("click", function (event) {
            event.stopPropagation();

            var request;
            var nextLevel = MiscLogic.GetNextLevel();
            var clickedItem = MiscLogic.FindClickedItem($(this), serverData);
            var parentId = clickedItem[0].id;
            $("#parent-id").attr("value", parentId);
            var name = clickedItem[0].name;

            if (MiscLogic.titleHistory[MiscLogic.titleHistory.length - 1] != name) {
                MiscLogic.titleHistory.push(name);
            }

            if (QueryManager.currentLevel == "projects") {
                QueryManager.projectId = parentId;
            }
            if (QueryManager.currentLevel != "fuses" && QueryManager.currentLevel != "sensors") {
                request = { action: "list", listtype: nextLevel, parentid: parentId };
                QueryManager.LoadData(request);
                $("#page-title").text(name);
                MiscLogic.lastParentIds.push(parentId); //always push because Ids will be the same
            }
        });
    }

    , EditButton: function (serverData) {
        $(".edit-button").off().on("click", function (event) {
            event.stopPropagation();
            ModalManager.ClearModal();
            QueryManager.RequestDataForSelects();
            ModalManager.EditEntry($(this), serverData);
        });
    }

    , DeleteButton: function (serverData) {
        $(".delete-button").off().on("click", function (event) {
            event.stopPropagation();
            ModalManager.DeleteWarning($(this), serverData);

        });

    }

    , BackButton: function () {
        $(".back-button").off().on("click", function (event) {
            event.stopPropagation();
            QueryManager.GoBackToPreviousLevel();
            MiscLogic.FetchLastParentIdAndTitle();
            if (QueryManager.currentLevel == "floors") {
                MiscLogic.lastParentIds = [];
                MiscLogic.titleHistory = [];
            }
        });
    }

    , ShoppingListButton: function (serverData) {
        $(".shopping-list-button").off().on("click", function (event) {
            event.stopPropagation();
            var item = ShoppingListAndSchematicRequest($(this), serverData);
            ShoppingListHandler.RequestShoppingList(item);

        });
    }

    , SchematicButton: function (serverData) {
        $(".schematic-button").off().on("click", function (event) {
            event.stopPropagation();
            var item = ShoppingListAndSchematicRequest($(this), serverData);
            SchematicHandler.RequestSchematic(item);
        });
    }

    , CircuitbreakerButton: function () {
        $("#circuitbreaker-button").off().on("click", function (event) {
            event.stopPropagation();
            var request = { action: "list", listtype: "circuitbreakers", parentid: QueryManager.projectId };
            QueryManager.LoadData(request);
            MiscLogic.lastParentIds.push(QueryManager.projectId);

        });
    }

    , ConfirmDeletion: function (request) {
        $("#delete-warning-confirm").off().on("click", function (event) {
            event.stopPropagation();
            $("#delete-warning-modal").modal("hide");
            $("#delete-confirm-modal").modal();
            $("#delete-confirm").off().on("click", function (event) {
                event.stopPropagation();
                ModalManager.DeleteEntry(request);
                $("#delete-confirm-modal").modal("hide");

            });
        });
    }

    , HomeEvent: function () {
        $("#home").on("click", function (event) {
            event.stopPropagation();
            QueryManager.lastRequests.splice(0, QueryManager.lastRequests.length);
            QueryManager.LoadData(Controller.homepage);
            $("#page-title").text("Projekte");
        });
    }

    , SaveEvent: function (action) {
        $("#save-button").off().on("click", function (event) {
            event.stopPropagation();
            $("#save-button").off();
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
            var validate = [];
            inputFields.each(function () { // check if inputfields defined above are empty or not
                if ($(this).val().trim().length < 1) {
                    validate.push(false);
                } else {
                    validate.push(true);
                }
            });
            var result = validate.includes(false);
            if (result) {
                alert("Bitte alles ausfüllen");
                EventHandler.SaveEvent(action);
            } else {
                ModalManager.SaveEntry(action);
            }
        });
    }

    , CreateEvent: function () {
        $("#create-item-button").off().on("click", function (event) {
            event.stopPropagation();
            if (QueryManager.currentLevel == "circuitbreakers") {
                $("#parent-id").attr("value", QueryManager.projectId);
            }
            ModalManager.ClearModal();
            QueryManager.RequestDataForSelects();
            $("#create-entry-modal").modal(); //enables modal manually
            ModalManager.CreateEntry();
        });
    }

    , ClearModal: function () { // clears Modal when it's closed
        $("#create-entry-modal").off().on("hidden.bs.modal", function (event) {
            ModalManager.ClearModal();
        });
    }

}
