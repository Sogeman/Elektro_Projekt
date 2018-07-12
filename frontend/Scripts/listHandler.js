var ListHandler = {
   
    FillTable: function(serverData) {
        $("#data-table").empty();
        var list = serverData["items"];
        var listtype = serverData["listtype"];
        queryManager.currentLevel = listtype;

        list.forEach(element => {
            var id = element.id;
            var created = element.created;
            var name = element.name;
            var row = "";
            row = '<tr class="single-entry" listtype="' + listtype + '" itemid="' + id + '"><th scope="row">' + id +'</th>';
            row += '<td data="' +created+ '">' + created + '</td>';
            row += '<td data="' +name+ '">' +name + '</td>';
            row += '<td class="py-0"><button class="btn btn-link edit-button" data-toggle="modal" data-target="#create-entry-modal"><img src="Content/images/icon_edit.png"></button>';
            row += '<button class="btn btn-link delete-button"><img src="Content/images/icon_delete.png"></td></tr>';
            $("#data-table").append(row);
        });
        
        $(".single-entry").on("click", function(event) {
            queryManager.currentLevel = $(this).attr("listtype"); // listtype wird gespeichert für Modal auf nächster Ebene
            console.log(queryManager.currentLevel);
        });

        // Events for delete and edit buttons

        $(".edit-button").on("click", function(event) {
            event.stopPropagation();
            ModalManager.EditEntry($(this), serverData);
        });
        $(".delete-button").on("click", function(event) { 
            event.stopPropagation();
        });
    }
};
