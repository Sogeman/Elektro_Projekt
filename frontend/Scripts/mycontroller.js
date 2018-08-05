var Controller = {
    homepage: {action: "list", listtype: "projects", parentid: 0}
};

$(document).ready(function() {
    EventHandler.Initialize()
});

// {;
// 	"action": "create",
// 	"listtype": "FLOORS",
// 	"parentid": 1,
// 	"specification": {
// 		"name": "Erdgeschoss",
// 		"floor_count_from_basement": 1
// 	}
// }
