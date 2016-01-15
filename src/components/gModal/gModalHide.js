angular.module('G.modal').directive('gModalHide', function() {

	return {
		restrict: 'EA',
		require: '^^gModal',
		link: function(scope, el, attrs, modalCtrl) {
			el.on('click', function(){
				modalCtrl.hide();
			});
		}
	}
});