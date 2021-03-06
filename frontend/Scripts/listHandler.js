var ListHandler = {

    FillTable: function (serverData) {
        ListHandler.FillDataIntoTable(serverData);
        EventHandler.TableEvents(serverData);
    }

    , FillDataIntoTable: function (serverData) {
        $("#data-table").empty();
        //console.log(serverData);
        var list = serverData["items"];
        var listtype = serverData["listtype"];

        if (list.length == 0) {
            ListHandler.ListIsEmpty();
        } else {
            list.forEach(element => {
                var id = element.id;
                var created = element.created;
                var name = element.name;
                row = '<tr class="single-entry" listtype="' + listtype + '" itemid="' + id + '">';
                row += '<th scope="row" class="clickable">' + id + '</th>'
                row += '<td class="clickable">' + created + '</td>';
                row += '<td class="clickable">' + name + '</td>';
                row += ListHandler.AddOptionButtons(listtype);
                $("#data-table").append(row);
            });
        }
    }

    , AddOptionButtons: function (listtype) {
        var row = '<td class="py-0 pl-0 text-center"><button class="btn btn-link edit-button" title="Eintrag bearbeiten"><img src="frontend/Content/images/edit-icon.png"></button>';
        row += '<button class="btn btn-link delete-button" title="Eintrag löschen"><img src="frontend/Content/images/delete-icon.png">';
        if (listtype == "projects") {
            row += '<button class="btn btn-link shopping-list-button" title="Einkaufsliste anzeigen"><img src="frontend/Content/images/shopping-cart.png">';
            row += '<button class="btn btn-link schematic-button" title="Schaltplan anzeigen"><img src="frontend/Content/images/schematic-button.png">';
        } else {
            row += '<button class="btn btn-link back-button" title="zurück"><img src="frontend/Content/images/back-button.png">';
        }
        row += '</td></tr>';
        return row;
    }

    , ListIsEmpty: function () { // message when there is nothing to show
        var row = '<td colspan = 4 class="text-center"><h4 class="mt-2">Es gibt keine Einträge, bitte etwas hinzufügen</h4>';
        if (QueryManager.currentLevel == "devices") {
            var row = '<td colspan=4 class="text-center"><h4 class="mt-2">Es gibt keine Einträge, bitte etwas hinzufügen (FIs und Sicherungen besser zuerst)</h4>';
        }
        if (QueryManager.currentLevel != "projects") {
            row += '<button class="btn btn-link back-button" title="zurück"><img src="frontend/Content/images/back-button.png"></td>';
        }
        $("#data-table").append(row);
    }

    , CreateSelectOption: function (serverData) { // creates the options for the selects in the modal
        //console.log(serverData);
        var level = serverData["listtype"];
        var items = serverData["items"];
        $('#' + level + '-select').siblings().remove();
        var list = serverData["items"];
        var row = "";
        list.forEach(element => {
            row += '<option value="' + element.id + '">' + element.name + '</option>';
        });
        $('#' + level + '-select').after(row);
        if (items.length == 0) {
            $("#current-choice").attr("placeholder", "Keine Sicherung angelegt");
        }
    }

};
