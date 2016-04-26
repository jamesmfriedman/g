require('./gNotification.html');

angular.module('G.notification').directive('gNotification', function(gHelpers, $animate, gNotifications) {
	return {
		restrict: 'E',
		templateUrl: 'gNotification.html',
		scope: {
			params: '='
		},
		link: function(scope, el, attrs) {
			var unbind;
			gHelpers.makeAnimatable(el, attrs);

			if (scope.params.constructor.name !== 'gNotification') {
			
				unbind = scope.$watch('params', function(val){
					var config = angular.extend({}, val);
					config.native = false;
					scope.notification = gNotifications.create(config.title, config);
				}, true);
			}

			el.on('click', function(evt){
				scope.notification.raiseEvent('click', evt);
			});

			scope.removeNotification = function() {
				if (unbind) unbind();

				if (scope.params.onClose) {
					scope.params.onClose();
				}

				if (!gNotifications.remove(scope.notification) && !attrs.ngShow && !attrs.ngHide && !attrs.ngIf && !attrs.ngSwitchWhen) {
					$animate.leave(el);
				}
			};
		}
	};
});