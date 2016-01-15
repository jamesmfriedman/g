angular.module('G.notification').directive('gNotificationList', function(gNotifications) {
	return {
		restrict: 'E',
		template: '<g-notification ng-if="!n.config.native" class="animate" ng-repeat="n in notifications" params="n"></g-notification>',
		scope: {},
		link: function(scope, el, attrs) {
			scope.notifications = gNotifications.notifications;
		}
	}
});