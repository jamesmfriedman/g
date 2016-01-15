var mod = angular.module('G.common');
mod.service('gMixins', function($animate, $timeout, gHelpers) {

	/**
	 * The necessary pieces for a show hide directive like a dropdown or modal
	 */
	var showHide = {
		directiveConfig: {
			scope : {},
			priority: 601
		},

		link: function(scope, el, attrs, ctrl){
			scope.el = el;

			if (attrs.ngShow) {
				scope.$watch(attrs.ngShow, function(val){
					if (val && !scope.showing) {
						ctrl.show();
					} else if (!val && scope.showing) {
						ctrl.hide();
					}
				});
			}

			if (attrs.ngHide) {
				scope.$watch(attrs.ngHide, function(val){
					if (!val && !scope.showing) {
						ctrl.show();
					} else if (val && scope.showing) {
						ctrl.hide();
					}
				});
			}

			// A hook for ngIfs since the original el is set to [comment]
			if (attrs.ngIf) {
				scope.$watch(attrs.ngIf, function(val){
					if (val && !scope.showing) {
						ctrl.show();
					} else if (!val && scope.showing) {
						ctrl.hide();
					}
				});

				scope.$watch('showing', function(val){
					if (val) {
						scope.el = el.next();
						gHelpers.makeAnimatable(scope, scope.el, attrs);
					}
				});
			}
		}
	};

	return {
		showHide: showHide
	}
});

mod.controller('ShowHideController', function($scope, $timeout) {
	if ($scope.showing === undefined) $scope.showing = this.showing = false;

	this.show = function(origin) {
		$scope.showing = this.showing = true;

		// we have to send this in a timeout in case we have an ngIf and need to grab the element
		$timeout(function(){	
			$scope.$emit('show', $scope.el, origin);
		});
	};

	this.hide = function(origin) {
		$scope.showing = this.showing = false;
		$scope.$emit('hide', $scope.el, origin);
		$timeout(angular.noop);
	};

	this.toggle = function(origin) {
		$scope.showing ? this.hide(origin) : this.show(origin);
	};

	this.on = function(evt, cb) {
		$scope.$on(evt, cb);
	};
});