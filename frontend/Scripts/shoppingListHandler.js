var ShoppingListHandler = {

    RequestShoppingList: function (projectId) {
        console.log(projectId);
        var request = {action: "get-shoppinglist", itemid: projectId};
        QueryManager.LoadShoppingList(request);
    }

}