var EventHandler = {

    Initialize: function() {
        $('[data-toggle="tooltip"]').tooltip(); 
        //homeevent
        //createevent?
    }
    
    , TableEvents: function(serverData) {
        // Event for going to the next level
        $(".single-entry").on("click", function(event) {
            event.stopPropagation();
            QueryManager.currentLevel = $(this).attr("listtype"); // listtype gets saved for Modal on next level

            var request;
            var nextLevel = QueryManager.GetNextLevel();
            var clickedItem = EventHandler.FindClickedItem($(this), serverData);
            var parentId = clickedItem[0].id;
            $("#parent-id").attr("value", parentId);
            var name = clickedItem[0].name;

            request = {action: "list", listtype: nextLevel, parentid: parentId};
            QueryManager.LoadData(request);

            if (QueryManager.currentLevel == "projects") {
                $("#page-title").text(name);
            }
        });

        // Events for delete, edit and shopping list buttons

        $(".edit-button").on("click", function(event) {
            event.stopPropagation();
            ModalManager.EditEntry($(this), serverData);
            $(this).unbind();
        });
        $(".delete-button").on("click", function(event) { 
            event.stopPropagation();
            ModalManager.DeleteWarning($(this), serverData); 
            $(this).unbind();
        });
        $(".shopping-list-button").on("click", function(event) {
            event.stopPropagation();
            var clickedItem = EventHandler.FindClickedItem($(this), serverData);
            var id = clickedItem[0].id;
            ShoppingListHandler.RequestShoppingList(id);
            $(this).unbind();
        });
    }

    , ConfirmDeletion: function(request) {
        $("#delete-warning-confirm").on("click", function(event) {
            event.stopPropagation();
            $("#delete-warning-modal").modal("hide");
            $("#delete-confirm-modal").modal();
            $("#delete-confirm").on("click", function() {
                ModalManager.DeleteEntry(request);
                $("#delete-confirm-modal").modal("hide");
            })
        })
    }

    , HomeEvent: function() {
        $("#home").on("click", function (event) {
            event.stopPropagation();
            QueryManager.LoadData(Controller.homepage);
            $("#page-title").text("Projekte");
        });
    }

    , SaveEvent: function(data, action) {
        $("#save-button").on("click", function(event) {
            event.stopPropagation();
            ModalManager.SaveEntry(data, action);
            $("#save-button").unbind();
        });
    }

    , CreateEvent: function() {
        $("#create-item-button").on("click", function(event) {
            event.stopPropagation();
            $("#create-entry-modal").modal(); //enables modal manually
            ModalManager.CreateEntry();
        });
    }

    , ClearModal: function() {
        $("#create-entry-modal").on("hidden.bs.modal", function (event) {
            event.stopPropagation();
            ModalManager.ClearModal();
        });
    }

    , BackButton: function() {
        $("#back-button").on("click", function(event) {
            event.stopPropagation();
            QueryManager.GoBackToPreviousLevel();
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
