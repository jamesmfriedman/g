angular.module('G.popover').directive('gPopover', function(gOverlayDirectiveBase) {

	return gOverlayDirectiveBase('popover', 'swapWithCenter', ['top', 'center']);
});