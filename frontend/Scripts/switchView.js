var views = ["homepage", "shopping-list", "schematic"];

function viewSwitcher(newView) {
        for (var i = 0; i < views.length; i++) {
            if (newView == views[i]) {
                $("#" + newView).show();
            } else {
                $("#" + views[i]).hide();
            }
        }
    }