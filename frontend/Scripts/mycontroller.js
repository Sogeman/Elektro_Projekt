var Controller = {
    homepage: {action: "list", listtype: "projects", parentid: 0}
};

$(document).ready(function() {

    queryManager.LoadData(Controller.homepage);
    EventHandler.HomeEvent();
});

// {
// 	"action": "create",
// 	"listtype": "FLOORS",
// 	"parentid": 1,
// 	"itemid": 1,
// 	"specification": {
// 		"name": "Erdgeschoss",
// 		"floor_count_from_basement": 1
// 	}
// }