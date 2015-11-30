angular.module('G.common').service('gMixins', function($animate) {

	/**
	 * The necessary pieces for a show hide directive like a dropdown or modal
	 */
	var showHide = {
		directiveConfig: {
			scope : {
				ngShow: '=?',
				ngIf: '=?'	
			},
			priority: 601
		},

		link: function(scope, el, attrs, ctrl){
			scope.el = el;

			// A hook for ngIfs since the original el is set to [comment]
			if (attrs.ngIf) {
				scope.$watch('ngIf', function(val){
					if (val) {
						scope.el = el.next();

						// manually trigger the animation for enter
						makeAnimatable(scope.el);
						$animate.enter(scope.el, scope.el.parent(), el);
					}
				});
			}

			scope.$watch('showing', function(val){
				scope.ngHide = !val;
				scope.ngShow = val;
				scope.ngIf = val;
			});
		},

		controller: function($scope){
			if ($scope.showing === undefined) $scope.showing = false;

			this.show = function(origin) {
				$scope.showing = true;

				// we have to send this in a timeout in case we have an ngIf and need to grab the element
				setTimeout(function(){	
					$scope.$emit('show', $scope.el, origin);
				});
			};

			this.hide = function(origin) {
				$scope.showing = false;
				$scope.$emit('hide', $scope.el, origin);
			};

			this.toggle = function(origin) {
				$scope.showing ? this.hide(origin) : this.show(origin);
			};

			this.on = function(evt, cb) {
				$scope.$on(evt, cb);
			};
		},
	};


	/**
	 * To be executed inside of a link function
	 */
	var directiveApiLink = function(scope, el, attrs, ctrl) {
		if ('api' in attrs) {
			if (typeof scope.$parent[attrs.api] === 'object') {
				angular.merge(scope.$parent[attrs.api], ctrl);
			} else {
				scope.$parent[attrs.api] = ctrl;
			}
		}
	};

	/**
	 * Makes an element animatable
	 */
	var makeAnimatable = function(el) {
		el.addClass('animate');
		$animate.enabled(el, true);
	};
	
	return {
		showHide: showHide,
		directiveApiLink: directiveApiLink,
		makeAnimatable: makeAnimatable
	}
});