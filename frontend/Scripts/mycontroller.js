var Controller = {
    homepage: {action: "list", listtype: "projects", parentid: 0}
};

$(document).ready(function() {

    queryManager.LoadData(Controller.homepage);
    $("#home").on("click", function () {
        console.log("home clicked");
        queryManager.LoadData(Controller.homepage);
    });
});