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
            row += '<td class="py-0 pl-0"><button class="btn btn-link edit-button" data-toggle="modal" data-target="#create-entry-modal"><img src="Content/images/icon_edit.png"></button>';
            row += '<button class="btn btn-link delete-button"><img src="Content/images/icon_delete.png"></td></tr>';
            $("#data-table").append(row);
        });
        
        EventHandler.TableEvents(serverData);
        
    }

    , findClickedItem: function (clickedButton, data) {
        var parentRow = clickedButton.closest("tr")[0];
        var clickedItemId = $(parentRow).attr("itemid");
        var itemsObject = data["items"];
        var allItemsArray = itemsObject.map(function (element) {
            if (element.id == clickedItemId) {
                return element
            } else {
                return null
            }
        }, []);
        var clickedItem = allItemsArray.filter((obj) => obj);
        return clickedItem;
    }
};
