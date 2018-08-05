var ListHandler = {

    FillTable: function (serverData) {
        if (serverData.listtype != "fuses") {
            $("#fuses-table-head").hide();
            $("#normal-table-head").show();
            ListHandler.FillNormalTable(serverData);
        } else {
            $("#normal-table-head").hide();
            $("#fuses-table-head").show();
            ListHandler.FillFusesTable(serverData);
        }
        EventHandler.TableEvents(serverData);
    }

    , FillNormalTable: function (serverData) {
        $("#data-table").empty();
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
    
    , FillFusesTable: function (serverData) {
        $("#data-table").empty();
        var list = serverData["items"];
        var listtype = serverData["listtype"];
        if (list.length == 0) {
            ListHandler.ListIsEmpty();
        } else {
            list.forEach(element => {
                var id = element.id;
                var name = element.name;
                var room = element.fi_name;
                var row = '<tr class="single-entry" listtype="' + listtype + '" itemid="' + id + '">';
                row += '<th scope="row" class="clickable">' + id + '</th>'
                row += '<td class="clickable">' + name + '</td>';
                row += '<td class="clickable">' + room + '</td>';
                row += ListHandler.AddOptionButtons(listtype);
                $("#data-table").append(row);
            });
        }
    }

    , AddOptionButtons: function(listtype) {
        row = '<td class="py-0 pl-0 text-center"><button class="btn btn-link edit-button" title="Eintrag bearbeiten"><img src="Content/images/icon_edit.png"></button>';
        row += '<button class="btn btn-link delete-button" title="Eintrag löschen"><img src="Content/images/icon_delete.png">';
        if (listtype == "projects") {
            row += '<button class="btn btn-link shopping-list-button" title="Einkaufsliste anzeigen"><img src="Content/images/shopping-cart.png">';
        }
        row += '</td></tr>';
        return row;
    } 

    , ListIsEmpty: function () {
        var row = "";
        row = '<td colspan = 4 class="text-center"><h4>Nothing here, why not add something.</h4></td>';
        $("#data-table").append(row);
    }

    , CreateSelectOption: function (serverData) {
        var level = serverData["listtype"];
        $('#' + level + '-select').siblings().remove();
        var list = serverData["items"];
        var row = "";
        list.forEach(element => {
            row += '<option value="' + element.id + '">' + element.name + '</option>';
        });
        $('#' + level + '-select').after(row);
    }

};
