
$(document).ready(function() {
    var request = {action: "list", listtype: "projects", parentid: "1"};
    queryManager.LoadData(request, queryManager.onInitialLoadSuccess, queryManager.onInitialLoadError)
    $("#home").on("click", function () {
        alert("test");
        queryManager.LoadData(request, queryManager.onInitialLoadSuccess, queryManager.onInitialLoadError)
    });
});