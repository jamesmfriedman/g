angular.module('G.btn').directive('gBtnClose', function(gConfig) {
	return {
		restrict: 'E',
		replace: true,
		template: gConfig.closeBtnTemplate || '<g-btn class="flat g-btn-close"><span>&nbsp;</span></g-btn>'
	};
});