var ShoppingListHandler = {

    RequestShoppingList: function (item) {
        console.log(item.id);
        var request = { action: "get-shoppinglist", projectid: item.id, projectname: item.name };
        QueryManager.LoadProjectData(request);
    }

    , DrawShoppingList: function (request, serverData) {
        $("#shopping-list-devices").empty();
        $("#shopping-list-sensors").empty();
        viewSwitcher("shopping-list");
        console.log(serverData);
        $("#shopping-list-title").text("Einkaufsliste für " + request.projectname);
        var devices = serverData["Devices"];
        var sensors = serverData["Sensors"];
        var index = 1;
        for (const key in devices) {
            var row = '<tr>';
            row += '<th scope="row">' + index + '</th>';
            row += '<td>' + devices[key].name + '</td>';
            row += '<td>' + devices[key].amount + '</td></tr>';
            $("#shopping-list-devices").append(row);
            index++;
        }
        index = 1; //reset index for next loop
        for (const key in sensors) {
            var row = '<tr>';
            row += '<th scope="row">' + index + '</th>';
            row += '<td>' + sensors[key].name + '</td>';
            row += '<td>' + sensors[key].amount + '</td></tr>';
            $("#shopping-list-sensors").append(row);
            index++;
        }
    }

}

var SchematicHandler = {

    RequestSchematic: function (item) {
        var request = { action: "get-schematic", projectid: item.id, projectname: item.name };
        QueryManager.LoadProjectData(request);
    }

    , DrawSchematic: function (request, serverData) {
        console.log(serverData); // everything of a single project
        viewSwitcher("schematic");
        $(".schematic-anchor").empty();
        var circuitbreakers = serverData.Circuitbreakers;
        var fuses = serverData.Fuses;
        var rooms = serverData.Rooms;
        var devices = serverData.Devices;
        var sensors = serverData.Sensors;
        circuitbreakers.forEach(circuitbreaker => {
            var singleCircuitbreaker = '<div class="row m-4"><div class="schematic-item-name">' + circuitbreaker.name + '</div>';
            singleCircuitbreaker += '<span class="align-center" id="circuitbreaker' + circuitbreaker.id + '">&rArr;</span></div>';
            $(".schematic-anchor").append(singleCircuitbreaker);
            fuses.forEach(fuse => {
                if(fuse["circuitbreakers_id"] == circuitbreaker.id) {
                    var singleFuse = '<div class="schematic-item-name">' + fuse.name + '</div>';
                    singleFuse += '<span class="align-center" id="fuse' + fuse.id + '">&dArr;</span>';
                    $('#circuitbreaker' + fuse["circuitbreakers_id"]).after(singleFuse);
                    devices.forEach(device => {
                        if(device.fuseid == fuse.id) {
                            var singleDevice = '<select class="custom-select">'
                            singleDevice += '<option value="' + device.id + '">' + device.name + '</option>';
                            singleDevice += '</select>'
                        }
                        $('#fuse' + device.fuseid).after(singleDevice);
                    });
                }
            });
        });
    }
//   und für Sensoren vielleicht mit on change anzeigen
}

function ShoppingListAndSchematicRequest(button, serverData) {
    var clickedItem = MiscLogic.FindClickedItem(button, serverData);
    var id = clickedItem[0].id;
    var name = clickedItem[0].name;
    var item = { id: id, name: name };
    return item;
}