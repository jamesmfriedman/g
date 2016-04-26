angular.module('G.common').factory('gOverlayDirectiveBase', function($document, $window, gHelpers, gPosition) {
	return function(overlayType, overlayPostionMode, defaultPosition) {

		return {
			restrict: 'E',
			priority: 601,
			scope: {
				params: '=?',
				ngIf: '&?'
			},
			link: function(scope, el, attrs, ctrl) {
				gHelpers.directiveApiLink(scope, el, attrs, ctrl);
				gHelpers.makeAnimatable(el, attrs);

				var params = scope.params || {};
				params.clickToClose = params.clickToClose === undefined ? true : params.clickToClose;

				overlayPostionMode = params.positionMode || overlayPostionMode;
				defaultPosition = defaultPosition || ['bottom', 'center'];

				var win = angular.element($window);
				var body = angular.element($document[0].body);
				var position;
				var currentOrigin;
				var scrollParents;
				var originalEl = el;

				constructor();

				function constructor() {
					position = getRequestedPositionParams();
					ctrl.on('show', showHandler);
					ctrl.on('hide', hideHandler);
					body.append(el);

					scope.$on('$destroy', destroy);
				}

				function getRequestedPositionParams() {
					var pos;
					if (params && params.position) {
						pos = params.position.split(' ');

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
						pos = defaultPosition;	
					}

					return [pos[0], pos[1]];
				}

				function showHandler(evt, originalEvent, showEl, origin) {
					el = null;
					el = showEl; //redefine the el for ngIf, sicne ngIf makes new ones everytime
					
					if (origin) {
						currentOrigin = origin;
					} else if (originalEvent.target) {
						currentOrigin = angular.element(originalEvent.target);
					}

					el[0].scrollTop = 0;
					
					currentOrigin ? el.addClass('g-' + overlayType + '-has-origin') : el.removeClass('g-' + overlayType + '-has-origin');
					scrollParents = getScrollParents(currentOrigin || body);				
					scrollParents.on('scroll', positionChangeHandler);
					win.on('resize', positionChangeHandler);

					positionChangeHandler();
					body.addClass('g-' + overlayType + '-open');

					if (params.clickToClose) {
						body.one('click touchstart', clickToCloseHandler);
					}
					
				}

				function hideHandler(evt) {
					win.off('resize', positionChangeHandler);
					body.off('click', clickToCloseHandler);
					if (scrollParents) scrollParents.off('scroll', positionChangeHandler);
					
					scrollParents = null;

					if (evt.name === 'hide' || evt.name === '$destroy' && scope.showing) {
						body.removeClass('g-' + overlayType + '-open');
					}
				}

				function positionChangeHandler() {
					gPosition(currentOrigin, el, position[0], position[1], overlayPostionMode);
				}

				function clickToCloseHandler(evt) {
					ctrl.hide();
				}

				/**
				 * a utility function for getting all of the elements that are scrollable up to the root node
				 * scroll events dont bubble, so we bind to every scrollable element
				 * This was rewritten from jQuery UIs scrollParent() method
				 */ 
				function getScrollParents(el) {
					var style = win[0].getComputedStyle(el[0]);
					var position = style.getPropertyValue('position');
					var parents = [];
					var node = el[0];

					while (node) {
					    parents.unshift(node);
					    node = node.parentNode;
					}

					var docNode = parents.shift(); //get rid of the document node, we dont need it for our filtering function

					var excludeStaticParent = position === 'absolute',
					parents = parents.filter(function(parent) {
						var parentStyle = win[0].getComputedStyle(parent);
						if ( excludeStaticParent &&  style.getPropertyValue('position') === 'static' ) {
						  return false;
						}
						return (/(auto|scroll)/).test(  parentStyle.getPropertyValue('overflow') + parentStyle.getPropertyValue('overflow-y') + parentStyle.getPropertyValue('overflow-x'));
					});

					parents.unshift(docNode);
					return position === 'fixed' || !parents.length ? angular.element(document) : angular.element(parents);
				}

				function destroy(evt) {
					hideHandler(evt);
					el.remove();
					originalEl.remove();
					
					win = null;
					body = null;
					currentOrigin = null;
					scrollParents = null;
					originalEl = null;
					el = null;
				}
			},
			controller: 'ShowHideController'
		};
	};
});