angular.module('G.common').controller('ShowHideController', function($scope, $element, $attrs, $timeout, gHelpers) {
	var $ctrl = this;

	constructor();

	function constructor() {
		if ($scope.showing === undefined) $scope.showing = this.showing = false;
		$scope.el = $element;

		if ($attrs.ngShow) {
			$scope.$watch($attrs.ngShow, function(val){
				if (val && !$scope.showing) {
					$ctrl.show();
				} else if (!val && $scope.showing) {
					$ctrl.hide();
				}
			});
		}

		if ($attrs.ngHide) {
			$scope.$watch($attrs.ngHide, function(val){
				if (!val && !$scope.showing) {
					$ctrl.show();
				} else if (val && $scope.showing) {
					$ctrl.hide();
				}
			});
		}

		// A hook for ngIfs since the original el is set to [comment]
		if ($attrs.ngIf) {
			// $scope.$watch($attrs.ngIf, function(val){
			// 	console.log('In HERE', val)
			// 	if (val && !$scope.showing) {
			// 		$ctrl.show();
			// 	} else if (!val && $scope.showing) {
			// 		$ctrl.hide();
			// 	}
			// });

			$scope.$watch('showing', function(val){
				if (val && $element.next()[0]) {
					$scope.el = $element.next();
					gHelpers.makeAnimatable($scope.el, $attrs);
				}
			});
		}
	}

	$ctrl.show = function(evt, origin) {
		evt = evt || {};
		$scope.showing = this.showing = true;

		// we have to send this in a timeout in case we have an ngIf and need to grab the element
		$timeout(function(){
			$scope.$emit('show', evt, $scope.el, origin);
		});
	};

	$ctrl.hide = function(evt, origin) {
		evt = evt || {};
		$scope.showing = this.showing = false;
		$scope.$emit('hide', evt, $scope.el, origin);
		$timeout(angular.noop);
	};

	$ctrl.toggle = function(evt, origin) {
		$scope.showing ? this.hide(evt, origin) : this.show(evt, origin);
	};

	$ctrl.on = function(evt, cb) {
		$scope.$on(evt, cb);
	};
});