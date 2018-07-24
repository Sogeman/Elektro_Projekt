var ShoppingListHandler = {

    RequestShoppingList: function (projectId) {
        console.log(projectId);
        var request = {action: "get-shoppinglist", projectid: projectId};
        QueryManager.LoadShoppingList(request);
    }

}