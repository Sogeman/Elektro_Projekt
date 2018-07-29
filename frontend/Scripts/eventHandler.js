var EventHandler = {

    Initialize: function() {
        QueryManager.LoadingScreen();
        QueryManager.LoadData(Controller.homepage);
        EventHandler.HomeEvent();
        EventHandler.CreateEvent();
        EventHandler.BackButton();
    }
    
    , TableEvents: function(serverData) {
        // Event for going to the next level
        $(".clickable").off().on("click", function(event) {
            event.stopPropagation();

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
        $(".edit-button").off().on("click", function(event) {
            event.stopPropagation();
            ModalManager.EditEntry($(this), serverData);
        });
        $(".delete-button").off().on("click", function(event) { 
            event.stopPropagation();
            ModalManager.DeleteWarning($(this), serverData);
            
        });
        $(".shopping-list-button").off().on("click", function(event) {
            event.stopPropagation();
            var clickedItem = EventHandler.FindClickedItem($(this), serverData);
            var id = clickedItem[0].id;
            var name = clickedItem[0].name;
            var item = {id: id, name: name};
            ShoppingListHandler.RequestShoppingList(item);
            
        });
    }

    , ConfirmDeletion: function(request) {
        $("#delete-warning-confirm").off().on("click", function(event) {
            event.stopPropagation();
            $("#delete-warning-modal").modal("hide");
            $("#delete-confirm-modal").modal();
            $("#delete-confirm").off().on("click", function(event) {
                event.stopPropagation();
                ModalManager.DeleteEntry(request);
                $("#delete-confirm-modal").modal("hide");
                
            });
        
        });
    }

    , HomeEvent: function() {
        $("#home").on("click", function (event) {
            event.stopPropagation();
            QueryManager.LoadData(Controller.homepage);
            $("#page-title").text("Projekte");  
        });
    }

    , SaveEvent: function(data, action) {
        $("#save-button").off().on("click", function(event) {
            event.stopPropagation();
            ModalManager.SaveEntry(data, action);
            
        });
    }

    , CreateEvent: function() {
        $("#create-item-button").off().on("click", function(event) {
            event.stopPropagation();
            $("#create-entry-modal").modal(); //enables modal manually
            switch (QueryManager.currentLevel) {
                case "devices":
                ModalManager.devicesSelect.change(function() {
                    var value = ModalManager.devicesSelect.val();
                    ModalManager.formName.find("input").val(value);
                });
                    break;
                case "sensors":
                ModalManager.sensorsSelect.change(function() {
                    var value = ModalManager.sensorsSelect.val();
                    ModalManager.formName.find("input").val(value);
                });
                    break;
                default:
                    break;
            }
            ModalManager.CreateEntry();  
        });
    }

    , ClearModal: function() {
        $("#create-entry-modal").off().on("hidden.bs.modal", function (event) {
            ModalManager.ClearModal();
        });
    }

    , BackButton: function() {
        $("#back-button").off().on("click", function(event) {
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

    // , CloseEvent: function() {
    //     $(".close-button").off().on("click", function(event) {
    //         event.stopPropagation();
    //         $('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
    //     });
    // }
}
