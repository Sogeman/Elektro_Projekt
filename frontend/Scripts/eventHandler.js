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

    , ClickableRow: function (serverData) {
        $(".clickable").off().on("click", function (event) {
            event.stopPropagation();

            var request;
            var nextLevel = MiscLogic.GetNextLevel();
            var clickedItem = MiscLogic.FindClickedItem($(this), serverData);
            var parentId = clickedItem[0].id;
            $("#parent-id").attr("value", parentId);
            var name = clickedItem[0].name;

            if (QueryManager.currentLevel == "projects") {
                $("#page-title").text(name);
                QueryManager.projectId = parentId;
            }
            if (QueryManager.currentLevel != "circuitbreakers" && QueryManager.currentLevel != "fuses" && QueryManager.currentLevel != "sensors") {
                request = { action: "list", listtype: nextLevel, parentid: parentId };
                QueryManager.LoadData(request);
            }
        });
    }

    , EditButton: function (serverData) {
        $(".edit-button").off().on("click", function (event) {
            event.stopPropagation();
            ModalManager.ClearModal();
            MiscLogic.DecideWhichLoadDataSimple();
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
        });
    }

    , ShoppingListButton: function (serverData) {
        $(".shopping-list-button").off().on("click", function (event) {
            event.stopPropagation();
            var item = ShoppingListAndSchematicRequest($(this), serverData);
            ShoppingListHandler.RequestShoppingList(item);

        });
    }

    , SchematicButton: function(serverData) {
        $(".schematic-button").off().on("click", function(event) {
            event.stopPropagation();
            var item = ShoppingListAndSchematicRequest($(this), serverData);
            SchematicHandler.RequestSchematic(item);
        });
    }

    , cbAndFuseButtons: function () {
        $("#circuitbreaker-button").off().on("click", function (event) {
            event.stopPropagation();
            var request = { action: "list", listtype: "circuitbreakers", parentid: QueryManager.projectId };
            QueryManager.LoadData(request);
        });

        $("#fuse-button").off().on("click", function (event) {
            event.stopPropagation();
            var request = { action: "list", listtype: "fuses", parentid: QueryManager.projectId };
            QueryManager.LoadData(request);
        })
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
            ModalManager.SaveEntry(action);
        });
    }

    , CreateEvent: function () {
        $("#create-item-button").off().on("click", function (event) {
            event.stopPropagation();
            ModalManager.ClearModal();
            MiscLogic.DecideWhichLoadDataSimple();
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
