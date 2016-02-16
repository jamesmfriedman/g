angular.module('G.modal').directive('gModal', function($controller, $document, $animate, gHelpers, gModals) {

	return {
		restrict: 'E',
		priority: 601,
		scope: {
			params: '=?',
			ngIf: '&?'
		},
		link: function(scope, el, attrs, ctrl) {
			var parent = el.parent();
			gHelpers.directiveApiLink(scope, el, attrs, ctrl);
			gHelpers.makeAnimatable(el, attrs);

			var body = angular.element($document[0].body);
			scope.params = scope.params || {};
			scope.params.clickToClose = scope.params.clickToClose === undefined ? true : scope.params.clickToClose;

			var init = function() {
				if (attrs.as) {
					gModals._register(attrs.as, ctrl);
				}

				ctrl.on('show', showHandler);
				ctrl.on('hide', hideHandler);

				scope.$on('$destroy', function(evt){
					hideHandler(evt);
					el.remove();
					if (attrs.as) {
						gModals._unregister(attrs.as);
					}
				});
			};

			var clickToCloseHandler = function(evt) {
				ctrl.hide();
			};

			var showHandler = function(evt, originalEvent, showEl, origin) {
				el = showEl; //redefine the el for ngIf, since ngIf makes new ones everytime
				body.append(el);
				
				el.on('click touchstart', function(evt){
					evt.stopPropagation();
				});
				
				gModals._add(ctrl);

				if (scope.params.clickToClose) {
					body.one('click touchstart', clickToCloseHandler);
				}
				
			};

			var hideHandler = function(evt) {
				el.one('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(){
					parent.append(el);
				});
				
				gModals._remove(ctrl);
				body.off('click touchstart', clickToCloseHandler);
			};

			init();	
		},
		controller: 'ShowHideController'

	};
});