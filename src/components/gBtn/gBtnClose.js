angular.module('G.btn').directive('gBtnClose', function(gConfig) {
	return {
		restrict: 'E',
		template: gConfig.closeBtnTemplate || '<g-btn class="alt g-btn-close">&times;</g-btn>',
		link: function(scope, el, attrs) {
			el.on('click', function(e){
				e.stopPropagation();
			});
		}
	}
});