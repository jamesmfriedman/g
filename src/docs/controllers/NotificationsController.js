angular.module('G.docs.controllers').controller('NotificationsController', function(gNotifications){

	this.n = gNotifications;

	this.testNative = function() {
		gNotifications.send('Native Notification', {body: 'This is a native notification'});
	};

	this.testClient = function() {
		gNotifications.send('Client Notification', {body: 'This is a client notification', native: false});
	};

	this.requestIt = function() {
		console.log('requesting')
		gNotifications.requestPermission();
	};
});