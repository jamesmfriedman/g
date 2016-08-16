angular.module('G.common').factory('gOverlayDirectiveBase', function($document, $window, gHelpers, gPosition, $timeout) {
	return function(overlayType, opts) {
		// opts
		// overlayPostionMode, 
		// defaultPosition, 
		// registry
		// stopPropgation

		return {
			restrict: 'E',
			priority: 601,
			scope: {},
			link: function(scope, el, attrs, ctrl) {
				var params = scope.params || {};
				params.clickToClose = params.clickToClose === undefined ? true : params.clickToClose;

				var overlayPostionMode = params.positionMode || opts.overlayPostionMode;
				var defaultPosition = opts.defaultPosition || ['bottom', 'center'];

				var win = angular.element($window);
				var body = angular.element($document[0].body);

				var position;
				var currentOrigin;
				var scrollParents;
				var originalEl = el;
				var watchers = [];

				constructor();

				function constructor() {
					var apiName = gHelpers.directiveApiLink(scope, el, attrs, ctrl);
					gHelpers.makeAnimatable(el, attrs);

					if (apiName && opts.registry) {
						opts.registry._register(apiName, ctrl);
					}

					position = getRequestedPositionParams();
					watchers.push(ctrl.on('show', showHandler));
					watchers.push(ctrl.on('hide', hideHandler));
					body.append(el);

					scope.$on('$destroy', destroy);

					if (attrs.ngIf || attrs.ngSwitchWhen) {
						scope.$watch(function(){return ctrl.showing;}, function(val){
							if (val && originalEl.next()[0]) {
								gHelpers.makeAnimatable(originalEl.next(), attrs);
							}
						});
					}
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
					el = showEl; //redefine the el for ngIf, sicne ngIf makes new ones everytime
					
					if (origin !== undefined) {
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

					if (opts.stopPropagation) {
						el.on('click touchend', function(evt){
							evt.stopPropagation();
						});
					}

					if (params.clickToClose) {
						body.one('click touchend', clickToCloseHandler);
					}

					// defer the adding of the class. 
					// This prevents a bug where show and hide are called in the same frame and hide removes the class
					$window.requestAnimationFrame(function(){
						body.addClass('g-' + overlayType + '-open');
					});
					
				}

				function hideHandler(evt) {
					if (win) win.off('resize', positionChangeHandler);
					if (body) body.off('click', clickToCloseHandler);
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
					return position === 'fixed' || !parents.length ? angular.element($document) : angular.element(parents);
				}

				function destroy(evt) {
					hideHandler(evt);
					el.remove();
					originalEl.remove();

					watchers.forEach(function(cb){cb();});
					
					win = null;
					body = null;
					currentOrigin = null;
					scrollParents = null;
					originalEl = null;
					el = null;
				}
			},
			controller: function($scope, $element) {
				var $ctrl = this;

				$ctrl.showing = false;
				$ctrl.show = show;
				$ctrl.hide = hide;
				$ctrl.toggle = toggle;
				$ctrl.on = on;

				$ctrl.params = {};

				/**
				 * Get the element, ng-if returns a comment, so we have to get the next node
				 */
				function getElement() {
					if ($element[0].nodeName === '#comment') {
						return $element.next();
					} else {
						return $element;
					}
				}

				function updateParams(params) {
					Object.assign($ctrl.params, params || {});
				}

				function show(evt, origin, params) {
					updateParams(params);
					evt = evt || {};
					$ctrl.showing = true;
					$scope.$evalAsync();

					$timeout(function(){
						$scope.$emit('show', evt, getElement(), origin);
					});

				}

				function hide(evt, origin, params) {
					updateParams(params);
					evt = evt || {};
					$ctrl.showing = false;
					$scope.$evalAsync();
					$scope.$emit('hide', evt, getElement(), origin);
				}

				function toggle(evt, origin, params) {
					$ctrl.showing ? $ctrl.hide(evt, origin, params) : $ctrl.show(evt, origin, params);
				}

				function on(evt, cb) {
					return $scope.$on(evt, cb);
				}
			}
		};
	};
});