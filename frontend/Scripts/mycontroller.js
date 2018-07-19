var Controller = {
    homepage: {action: "list", listtype: "projects", parentid: 0}
};

$(document).ready(function() {

    queryManager.LoadData(Controller.homepage);
    EventHandler.HomeEvent();
});