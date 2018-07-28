var ShoppingListHandler = {

    RequestShoppingList: function (item) {
        console.log(item.id);
        var request = { action: "get-shoppinglist", projectid: item.id, projectname: item.name };
        QueryManager.LoadShoppingList(request);
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