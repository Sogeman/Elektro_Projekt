var ShoppingListHandler = {

    RequestShoppingList: function (item) {
        console.log(item.id);
        var request = { action: "get-shoppinglist", projectid: item.id, projectname: item.name };
        QueryManager.LoadProjectData(request);
    }

    , DrawShoppingList: function (request, serverData) {
        $("#shopping-list-devices, #shopping-list-sensors").empty();
        viewSwitcher("shopping-list");
        console.log(serverData);
        $("#shopping-list-title").text("Einkaufsliste für " + request.projectname);
        var devices = serverData["Devices"];
        var sensors = serverData["Sensors"];
        if (devices.length < 1) {
            var row = '<tr><td colspan = 4 class="text-center"><h4 class="mt-2">Keine Geräte angelegt</h4></td></tr>'
            $("#shopping-list-devices").append(row);
        } else {
            var i = 1;
            for (const key in devices) {
                var row = '<tr>';
                row += '<th scope="row">' + i + '</th>';
                row += '<td>' + devices[key].name + '</td>';
                row += '<td class="text-right">' + devices[key].amount + '</td></tr>';
                $("#shopping-list-devices").append(row);
                i++;
            }
        }
        if (sensors.length < 1) {
            var row = '<tr><td colspan = 4 class="text-center"><h4 class="mt-2">Keine Sensoren angelegt</h4></td></tr>'
            $("#shopping-list-sensors").append(row);
        } else {
            var j = 1; 
            for (const key in sensors) {
                var row = '<tr>';
                row += '<th scope="row">' + j + '</th>';
                row += '<td>' + sensors[key].name + '</td>';
                row += '<td class="text-right">' + sensors[key].amount + '</td></tr>';
                $("#shopping-list-sensors").append(row);
                j++;
            }
        }
    }

}

var SchematicHandler = {

    RequestSchematic: function (item) {
        var request = { action: "get-schematic", projectid: item.id, projectname: item.name };
        QueryManager.LoadProjectData(request);
    }

    , DrawSchematic: function (serverData) {
        //console.log(serverData); // everything of a single project
        viewSwitcher("schematic");
        var circuitbreakers = serverData.Circuitbreakers;
        var fuses = serverData.Fuses;
        var devices = serverData.Devices;
        var sensors = serverData.Sensors;
        $("#schematic-anchor").empty();

        $("#schematic-title").find("h3").text(serverData.Projectname);

        circuitbreakers.forEach(singleCircuitbreaker => {
            var row = '<div value="' + singleCircuitbreaker.id + '" class="schematic-first-level">' + singleCircuitbreaker.name + '</div>';
            $("#schematic-anchor").append(row);
            fuses.forEach(singleFuse => {
                if (singleFuse.circuitbreakers_id == singleCircuitbreaker.id) {
                    row = '<div value="' + singleFuse.id + '" class="col-3 offset-1 schematic-item">' + singleFuse.name + '</div>';
                    $("#schematic-anchor").append(row);
                    devices.forEach(singleDevice => {
                        if (singleDevice.fuses_id == singleFuse.id) {
                            row = '<div value="' + singleDevice.id + '" class="col-3 offset-2 schematic-item">' + singleDevice.name + '</div>';
                            $("#schematic-anchor").append(row);
                            sensors.forEach(singleSensor => {
                                if (singleSensor.devices_id == singleDevice.id) {
                                    row = '<div value="' + singleSensor.id + '" class="col-3 offset-3 schematic-item">' + singleSensor.name + '</div>';
                                    $("#schematic-anchor").append(row);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

function ShoppingListAndSchematicRequest(button, serverData) { // bundles id and name to give along to request function
    var clickedItem = MiscLogic.FindClickedItem(button, serverData);
    var id = clickedItem[0].id;
    var name = clickedItem[0].name;
    var item = { id: id, name: name };
    return item;
}
