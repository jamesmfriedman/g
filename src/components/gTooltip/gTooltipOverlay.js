angular.module('G.tooltip').directive('gTooltipOverlay', function(gOverlayDirectiveBase) {

	return gOverlayDirectiveBase('tooltip-overlay', 'swap', ['top', 'center']);
});