var ListHandler = {
    FillTable: function(list) {
        $("#data-table").empty();
        var list = list["items"];
        list.forEach(element => {
            var row = "";
            row = '<tr class="single-entry"><th scope="row">' + element.id +'</th>';
            row += '<td>' + element.created + '</td><td>';
            row += element.name + '</td>';
            row += '<td class="py-0"><button class="btn btn-link edit-button"><img src="Content/images/icon_delete.png"></button>';
            row += '<button class="btn btn-link delete-button"><img src="Content/images/icon_edit.png"></td></tr>';
            $("#data-table").append(row);
        });
        // for (i in list["items"]) {
        //     var row = "";
        //     row = '<tr class="single-entry><th scope="row">' + list[i].id +'</th>';
        //     row += '<td>' + list[i].created + '</td><td>';
        //     row += list[i].name + '</td></tr>';
        //     row += '<button class="btn edit-button"></button>';
        //     row += '<button class="btn delete-button"></button>';
        //     // braucht noch hinzufügen von Buttons zum erstellen von Unterelementen etc.
        //     $("#project-table").append(row);
        // }  
    }
} 

// var views = ["project-page", "floor-page"];
// function switchView(newView) {
//     for (var i = 0; i < views.length; i++) {
//         if (newView == views[i]) {
//             $("#" + newView).show();
//         } else {
//             $("#" + views[i]).hide();
//         }
//     }
// }



