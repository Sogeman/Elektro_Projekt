var QueryManager = {
    currentLevel: "",
    backendAddress: "http://localhost/Elektro_Projekt/backend/index.php",
    lastRequests: [], // saves last requests for backbutton and reload
    projectId: 0
    , LoadData: function (request) {
        if (!QueryManager.lastRequests.some(item => JSON.stringify(item) === JSON.stringify(request))) {
            QueryManager.lastRequests.push(request);
        }
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                MiscLogic.showHideButtons(request.listtype);
                QueryManager.currentLevel = request.listtype;
                viewSwitcher("homepage");
                ListHandler.FillTable(data);
                $("#create-item-button").text("+ " + MiscLogic.GetCurrentLevelName());
                EventHandler.cbAndFuseButtons();
                MiscLogic.DecideWhichLoadDataSimple();
                ModalManager.Initialize(QueryManager.currentLevel, data);
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , LoadDataSimple: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                ListHandler.CreateSelectOption(data);
            }
            , error: QueryManager.ErrorMessage
        }); 
    }

    , PostData: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                $("#create-entry-modal").modal("hide"); // closes Modal after saving
                QueryManager.LoadData(QueryManager.lastRequests[QueryManager.lastRequests.length - 1]); // reload page after sending new data to database
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , LoadShoppingList: function (request) {
        $.ajax({
            url: QueryManager.backendAddress
            , method: "post"
            , data: { data: JSON.stringify(request) }
            , dataType: "json"
            , cache: false
            , success: function (data) {
                ShoppingListHandler.DrawShoppingList(request, data);
                $("#home").show();
            }
            , error: QueryManager.ErrorMessage
        });
    }

    , ErrorMessage: function (errorMsg) {
        alert("something went wrong, redirecting to homepage");
        QueryManager.LoadData(Controller.homepage);
        viewSwitcher("homepage");
        console.log(errorMsg);
    }

    , LoadingScreen: function () {
        $(document).ajaxStart(function () {
            $("#loading-screen").show();
        });

        $(document).ajaxStop(function () {
            $("#loading-screen").delay(100).hide(0);
        });
    }

    , GoBackToPreviousLevel: function () {
        if (QueryManager.lastRequests.length > 1) {
            QueryManager.lastRequests.pop();
            QueryManager.LoadData(QueryManager.lastRequests[QueryManager.lastRequests.length - 1]);
        }
    }

};
