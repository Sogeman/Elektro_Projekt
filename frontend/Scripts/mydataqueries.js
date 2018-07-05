var queryManager = {
    backendAddress: "http://localhost/projekt/backend/index.php"
    , LoadData: function(request, onSuccess, onError) {
        $.ajax({
            url: queryManager.backendAddress
            , method: "post"
            , data: {data: JSON.stringify(request)}
            , dataType: "json"
            , cache: false
            , success: onSuccess
            , error: onError
        });
    }
    , onInitialLoadSuccess: function(data) {
        viewSwitcher("homepage");
        var list;
        list = data;
        ListHandler.FillTable(list);
    }
    
    , onInitialLoadError: function(errorMsg) {
        viewSwitcher("homepage");
        console.log(errorMsg);
    }
}
