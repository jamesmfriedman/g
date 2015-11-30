angular.module('G.common').service('gOverlayBase', function($document, $window, gMixins, gPosition) {
	return function(overlayType, overlayPostionMode) {

		return angular.merge({
			restrict: 'E',
			scope: {
				params: '=?'
			},
			link: function(scope, el, attrs, ctrl) {
				gMixins.showHide.link(scope, el, attrs, ctrl);
				gMixins.directiveApiLink(scope, el, attrs, ctrl);
				gMixins.makeAnimatable(el);

				scope.params = scope.params || {};
				overlayPostionMode = scope.params.positionMode || overlayPostionMode;
				scope.params.clickToClose = scope.params.clickToClose || true;

				var win = angular.element($window);
				var body = angular.element($document[0].body);
				var position;
				var currentOrigin;
				var scrollParents;


				var init = function() {
					position = getRequestedPositionParams();

					ctrl.on('show', showHandler);
					ctrl.on('hide', hideHandler);
					body.append(el);

					scope.$on('$destroy', function(evt){
						hideHandler(evt);
						el.remove();
					});
				};

				var getRequestedPositionParams = function() {
					var pos;
					if (scope.params && scope.params.position) {
						pos = scope.params.position.split(' ');

						var x = ['top', 'bottom', 'left', 'right', 'center'];
						var y = ['left', 'center', 'right', 'top', 'bottom'];

						if (x.indexOf(pos[0]) === -1) {
							throw 'Valid values for side are ' + x.join(', ');
						}

						if (y.indexOf(pos[1]) === -1) {
							throw 'Valid values for placement are ' + y.join(', ');
						}
					}
					else {
						pos = ['bottom', 'center'];	
					}

					return pos;
				};

				var showHandler = function(evt, showEl, origin) {
					el = showEl; //redefine the el for ngIf, sicne ngIf maeks new ones everytime
					currentOrigin = origin;
					origin ? el.addClass('g-' + overlayType + '-has-origin') : el.removeClass('g-' + overlayType + '-has-origin');
					scrollParents = getScrollParents(currentOrigin);				
					scrollParents.on('scroll', positionChangeHandler);
					win.on('resize', positionChangeHandler);

					positionChangeHandler();
					body.addClass('g-' + overlayType + '-open');

					if (scope.params.clickToClose) {
						body.one('click', clickToCloseHandler);
					}
					
				};

				var hideHandler = function(evt) {
					win.off('resize', positionChangeHandler);
					body.off('click', clickToCloseHandler);
					if (scrollParents) scrollParents.off('scroll', positionChangeHandler);
					
					currentOrigin = null;
					scrollParents = null;

					if (evt.name == 'hide' || evt.name == '$destroy' && scope.showing) {
						body.removeClass('g-' + overlayType + '-open');
					}

					el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						el.css({
							top: '',
							left: ''
						});
					});
				};	

				var positionChangeHandler = function() {
					gPosition(currentOrigin, el, position[0], position[1], overlayPostionMode);
				};

				var clickToCloseHandler = function() {
					ctrl.hide();
					scope.$apply();
				};

				/**
				 * a utility function for getting all of the elements that are scrollable up to the root node
				 * scroll events dont bubble, so we bind to every scrollable element
				 * This was rewritten from jQuery UIs scrollParent() method
				 */ 
				var getScrollParents = function(el) {
					var style = win[0].getComputedStyle(el[0]);
					var position = style.getPropertyValue('position');
					var parents = [];
					var node = el[0];

					while (node) {
					    parents.unshift(node);
					    node = node.parentNode;
					}

					var docNode = parents.shift(); //get rid of the document node, we dont need it for our filtering function

					excludeStaticParent = position === 'absolute',
					parents = parents.filter(function(parent) {
						var parentStyle = win[0].getComputedStyle(parent);
						if ( excludeStaticParent &&  style.getPropertyValue('position') === 'static' ) {
						  return false;
						}
						return (/(auto|scroll)/).test(  parentStyle.getPropertyValue('overflow') + parentStyle.getPropertyValue('overflow-y') + parentStyle.getPropertyValue('overflow-x'));
					});

					parents.unshift(docNode);
					return position === 'fixed' || !parents.length ? angular.element(document) : angular.element(parents);
				};

				init();
			},
			controller: function($scope, $controller) {
				angular.merge(this, $controller(gMixins.showHide.controller, {$scope: $scope}));
			}
		}, gMixins.showHide.directiveConfig);
	}
});