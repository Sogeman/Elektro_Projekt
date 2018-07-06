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
            row += '<td class="py-0"><button class="btn btn-link edit-button"><img src="Content/images/icon_edit.png"></button>';
            row += '<button class="btn btn-link delete-button"><img src="Content/images/icon_delete.png"></td></tr>';
            $("#data-table").append(row);

            $(".single-entry").on("click", function(event) {
                queryManager.currentLevel = $(this).attr("listtype"); // listtype wird gespeichert für Modal auf nächster Ebene
            });

            // Events for delete and edit buttons

            $(".edit-button").on("click", function() {
                ModalManager.EditEntry($(this)); // wird für jeden Eintrag 3mal ausgeführt auch wenn nur einer geklickt ist, keine Ahung ob das anders geht
            });                                    // sicher irgendwo ein [0] vergessen oder weil alle Knöpfe gleich heißen
            $(".delete-button").on("click", function() { // oder vielleicht stoppropagation

            })
        });
    }
};
