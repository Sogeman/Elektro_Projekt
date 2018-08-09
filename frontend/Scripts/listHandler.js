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
                var circuitbreaker = element.circuitbreakername;
                var row = '<tr class="single-entry" listtype="' + listtype + '" itemid="' + id + '">';
                row += '<th scope="row" class="clickable">' + id + '</th>'
                row += '<td class="clickable">' + name + '</td>';
                row += '<td class="clickable">' + circuitbreaker + '</td>';
                row += ListHandler.AddOptionButtons(listtype);
                $("#data-table").append(row);
            });
        }
    }

    , AddOptionButtons: function(listtype) {
        var row = '<td class="py-0 pl-0 text-center"><button class="btn btn-link edit-button" title="Eintrag bearbeiten"><img src="frontend/Content/images/edit-icon.png"></button>';
        row += '<button class="btn btn-link delete-button" title="Eintrag löschen"><img src="frontend/Content/images/delete-icon.png">';
        if (listtype == "projects") {
            row += '<button class="btn btn-link shopping-list-button" title="Einkaufsliste anzeigen"><img src="frontend/Content/images/shopping-cart.png">';
            row += '<button class="btn btn-link schematic-button" title="Schaltplan anzeigen"><img src="frontend/Content/images/schematic-button.png">';            
        } else {
            row += '<button class="btn btn-link back-button" title="zurück"><img src="frontend/Content/images/back-arrow.png">';
        }
        row += '</td></tr>';
        return row;
    } 

    , ListIsEmpty: function () {
         var row = '<td colspan = 3 class="text-center"><h4 class="mt-2">Nothing here, why not add something.</h4></td>';
        if(QueryManager.currentLevel != "projects") {
            row += '<td><button class="btn btn-link back-button" title="zurück"><img src="frontend/Content/images/back-arrow.png"></td>';
        }
        $("#data-table").append(row);
    }

    , CreateSelectOption: function (serverData) {
        console.log("test");
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
