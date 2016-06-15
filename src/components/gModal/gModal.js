angular.module('G.modal').directive('gModal', function(gOverlayDirectiveBase, gModals) {

	return gOverlayDirectiveBase('modal', {
		registry: gModals,
        stopPropagation: true
	});
});