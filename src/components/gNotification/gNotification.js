require('./gNotification.html');

angular.module('G.notification').directive('gNotification', function(gHelpers, $animate, gNotifications) {
	return {
		restrict: 'E',
		templateUrl: 'gNotification.html',
		scope: {
			params: '=params'
		},
		link: function(scope, el, attrs) {
			gHelpers.makeAnimatable(scope, el, attrs);
			scope.notification = scope.params;

			if (scope.notification.constructor.name !== 'gNotification') {
				var config = scope.notification;
				config.native = false;
				scope.notification = gNotifications.create(config.title, config);
			}

			el.on('click', function(evt){
				scope.notification.raiseEvent('click', evt);
			});

			scope.removeNotification = function(n) {
				if (!gNotifications.remove(n)) {
					$animate.leave(el);
				}
			};
		}
	}
});