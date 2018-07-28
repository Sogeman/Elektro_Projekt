var ListHandler = {
   
    FillTable: function(serverData) {
        $("#data-table").empty();
        var list = serverData["items"];
        var listtype = serverData["listtype"];
        //QueryManager.currentLevel = listtype;

        if (list.length == 0) {
            var row = "";
            row = '<td colspan = 4 class="text-center"><h4>Nothing here, why not add something.</h4></td>';
            $("#data-table").append(row);
        } else {
            list.forEach(element => {
                var id = element.id;
                var created = element.created;
                var name = element.name;
                var row = "";
                row = '<tr class="single-entry" listtype="' + listtype + '" itemid="' + id + '">';
                row += '<th scope="row" class="clickable">' + id +'</th>'
                row += '<td class="clickable">' + created + '</td>';
                row += '<td class="clickable">' +name + '</td>';
                row += '<td class="py-0 pl-0 text-center"><button class="btn btn-link edit-button" data-toggle="tooltip" title="Eintrag bearbeiten"><img src="Content/images/icon_edit.png"></button>';
                row += '<button class="btn btn-link delete-button" data-toggle="tooltip" title="Eintrag löschen"><img src="Content/images/icon_delete.png">';
                if (listtype == "projects") {
                    row += '<button class="btn btn-link shopping-list-button" data-toggle="tooltip" title="Einkaufsliste anzeigen"><img src="Content/images/shopping-cart.png">';
                }
                row += '</td></tr>';
                $("#data-table").append(row);
            });
            
            EventHandler.TableEvents(serverData);
        }
    }

};
