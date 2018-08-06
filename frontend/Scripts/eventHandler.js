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
        // Events for delete, edit, shopping list and back buttons
        EventHandler.EditButton(serverData);
        EventHandler.DeleteButton(serverData);
        EventHandler.BackButton();
        EventHandler.ShoppingListButton(serverData);

    }

    , ClickableRow: function (serverData) {
        $(".clickable").off().on("click", function (event) {
            event.stopPropagation();

            var request;
            var nextLevel = QueryManager.GetNextLevel();
            var clickedItem = EventHandler.FindClickedItem($(this), serverData);
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
            ModalManager.DecideWhichLoadDataSimple();
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
            var clickedItem = EventHandler.FindClickedItem($(this), serverData);
            var id = clickedItem[0].id;
            var name = clickedItem[0].name;
            var item = { id: id, name: name };
            ShoppingListHandler.RequestShoppingList(item);

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
            ModalManager.DecideWhichLoadDataSimple();
            $("#create-entry-modal").modal(); //enables modal manually
            ModalManager.CreateEntry();
        });
    }

    , ClearModal: function () { // clears Modal when it's closed
        $("#create-entry-modal").off().on("hidden.bs.modal", function (event) {
            ModalManager.ClearModal();
        });
    }

    , FindClickedItem: function (clickedButton, data) {
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
}
