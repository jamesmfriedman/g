angular.module('G.popover').directive('gPopover', function(gOverlayBase) {

	return gOverlayBase('popover', 'swapWithCenter');
});