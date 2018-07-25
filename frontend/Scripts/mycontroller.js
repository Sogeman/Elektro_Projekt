var Controller = {
    homepage: {action: "list", listtype: "projects", parentid: 0}
};
//make this shorter!!!
$(document).ready(function() {
    QueryManager.LoadingScreen();
    QueryManager.LoadData(Controller.homepage);
    EventHandler.HomeEvent();
    EventHandler.CreateEvent();
    EventHandler.BackButton();
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
