angular.module('G.modal').directive('gModal', function($controller, $document, $animate, gMixins, gHelpers, gModals) {

	return angular.merge({
		restrict: 'E',
		scope: {
			params: '=?'
		},
		link: function(scope, el, attrs, ctrl) {
			var parent = el.parent();
			gMixins.showHide.link(scope, el, attrs, ctrl);
			gHelpers.directiveApiLink(scope, el, attrs, ctrl);
			gHelpers.makeAnimatable(scope, el, attrs);

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

			var showHandler = function(evt, showEl, origin) {
				el = showEl; //redefine the el for ngIf, since ngIf makes new ones everytime
				body.append(el);
				
				el.on('click', function(evt){
					evt.stopPropagation();
				});
				
				gModals._add(ctrl);

				if (scope.params.clickToClose) {
					body.one('click', clickToCloseHandler);
				}
				
			};

			var hideHandler = function(evt) {
				el.one('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(){
					parent.append(el);
				});
				
				gModals._remove(ctrl);
				body.off('click', clickToCloseHandler);
			};

			init();	
		},
		controller: 'ShowHideController'

	}, gMixins.showHide.directiveConfig);
});