angular.module('G.dropdown').directive('gDropdown', function(gOverlayDirectiveBase, gDropdowns) {
	return gOverlayDirectiveBase('dropdown', {
        registry: gDropdowns
    });
});