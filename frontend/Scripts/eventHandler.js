var EventHandler = {

    TableEvents: function(serverData) {
        // Event for going to the next level
        $(".single-entry").on("click", function(event) {
            event.stopPropagation();
            QueryManager.currentLevel = $(this).attr("listtype"); // listtype gets saved for Modal on next level

            var request;
            var nextLevel = QueryManager.GetNextLevel();
            var clickedItem = ListHandler.findClickedItem($(this), serverData);
            var parentId = clickedItem[0].id;
            $("#parent-id").attr("value", parentId);
            var name = clickedItem[0].name;

            request = {action: "list", listtype: nextLevel, parentid: parentId};
            QueryManager.LoadData(request);

            if (QueryManager.currentLevel == "projects") {
                $("#page-title").text(name);
            }
        });

        // Events for delete and edit buttons

        $(".edit-button").on("click", function(event) {
            event.stopPropagation();
            ModalManager.EditEntry($(this), serverData);
        });
        $(".delete-button").on("click", function(event) { 
            event.stopPropagation();
            ModalManager.DeleteWarning($(this), serverData); 
        });
    }

    , ConfirmDeletion: function(request) {
        $("#delete-warning-confirm").on("click", function() {
            $("#delete-warning-modal").modal("hide");
            $("#delete-confirm-modal").modal();
            $("#delete-confirm").on("click", function() {
                ModalManager.DeleteEntry(request);
                $("#delete-confirm-modal").modal("hide");
            })
        })
    }

    , HomeEvent: function() {
        $("#home").on("click", function () {
            console.log("home clicked");
            QueryManager.LoadData(Controller.homepage);
            $("#page-title").text("Projekte");
        });
    }

    , SaveEvent: function(data, action) {
        $("#save-button").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            ModalManager.SaveEntry(data, action);
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
        $("#create-entry-modal").on("hidden.bs.modal", function (e) {
            ModalManager.ClearModal();
        });
    }

    , BackButton: function() {
        $("#back-button").on("click", function() {
            QueryManager.GoBackToPreviousLevel();
        });
    }


}