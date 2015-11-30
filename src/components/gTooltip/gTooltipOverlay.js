angular.module('G.tooltip').directive('gTooltipOverlay', function(gOverlayBase) {

	return gOverlayBase('tooltip-overlay', 'swap');
});