var EventHandler = {

    TableEvents: function(serverData) {
        // Event for going to the next level
        $(".single-entry").on("click", function(event) {
            queryManager.currentLevel = $(this).attr("listtype"); // listtype wird gespeichert für Modal auf nächster Ebene
            // console.log(queryManager.currentLevel);

            var request;
            var nextLevel = queryManager.GetNextLevel();
            var clickedItem = ListHandler.findClickedItem($(this), serverData);
            var parentId = clickedItem[0].id;
            var name = clickedItem[0].name;
            request = {action: "list", listtype: nextLevel, parentid: parentId};
            //console.log(request);
            queryManager.LoadData(request);
            $("#page-title").text(name);
        });

        // Events for delete and edit buttons

        $(".edit-button").on("click", function(event) {
            event.stopPropagation();
            ModalManager.EditEntry($(this), serverData);
        });
        $(".delete-button").on("click", function(event) { 
            event.stopPropagation();
            ModalManager.DeleteEntry($(this), serverData); //vielleicht reicht weniger Daten mitzugeben, muss ich noch schauen
        });
    }

    , HomeEvent: function() {
        $("#home").on("click", function () {
            console.log("home clicked");
            queryManager.LoadData(Controller.homepage);
            $("#page-title").text("Projekte");
        });
    }

}