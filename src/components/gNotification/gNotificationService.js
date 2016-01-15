angular.module('G.notification').service('gNotifications', function($document, $window, $timeout, gConfig) {
	var NotificationClass = gNotification;
	var defaultConfig = {
		// standard spec properties
		title : '',
		dir: 'auto',
		lang: '',
		body: '',
		tag: '',
		icon: gConfig.defaultNotificationIcon,

		// custom props
		clickToClose: true,
		persist: false,
		native: gConfig.useNativeNotifications

	};

	/**
	 * Custom Notification class to mimic the native api
	 */
	function gNotification(title, config) {
		
		// set our properties
		for (key in config) {
			this[key] = config[key];
		}

		this.close = function() {};

		// create an event api to mimic the native client
		this.events = {};
		this.addEventListener = function(eventName, handler) {
	        if(!(eventName in this.events))
	            this.events[eventName] = [];
	        this.events[eventName].push(handler);
	    };

	    this.raiseEvent= function(eventName, args) {
	        var currentEvents = this.events[eventName];
	        if(!currentEvents) return;

	        for(var i = 0; i < currentEvents.length; i++) {
	           if(typeof currentEvents[i] == 'function') {
	              currentEvents[i](args);
	           }
	        }
	    };
	};


	var api = {
		native: false,
		nativePermission: 'Notification' in $window ? Notification.permission: null,
		notifications: [],

		/**
		 * Create a new notification object
		 */
		create: function(title, config) {
			config = angular.merge({}, defaultConfig, config || {});
			config.title = title;

			if (config.native && api.nativePermission !== 'denied') {
				// we want to have a native notification, but the user might not have given us access
				api.requestPermission();
				config.native = gConfig.useNativeNotifications === false || api.getPermission() === false ? false : config.native;
			} else {
				config.native = false;
			}

			var nClass = !config.native ? gNotification: NotificationClass;
			var n = new nClass(title, config);
			
			// we store our own config on the Notification object
			// this is because the native api wont persist our custom props
			n.config = config;
			return n;
		},

		/**
		 * Immediately create and send a notification
		 */
		send: function(title, config) {
			var n = api.create(title, config);
			this.notifications.push(n);
			
			angular.element(n).on('click', function(evt){
				if ('onClick' in n.config) {
					n.config.onClick(evt, n);
				}

				if (n.config.clickToClose) {
					api.remove(n);
				}
			});

			if (!n.config.persist) {
				$timeout(function(){
					api.remove(n);
				}, 5000);
			}
		},

		/**
		 * Remove an individual instance of a notification
		 */
		remove: function(notification) {
			notification.close();

			if (this.notifications.indexOf(notification) !== -1) {
				this.notifications.splice(this.notifications.indexOf(notification), 1);
				$timeout();
				return true;
			}

			return false;
		},	

		/**
		 * Remove all notifications. This method gets called whenever the browser window is unloaded
		 */
		removeAll: function() {
			for (var i = this.notifications.length - 1; i >= 0; i--) {
				this.remove(this.notifications[i]);
			}
		},

		/**
		 * Gets native notifications permission
		 */
		getPermission: function() {
			if ('Notification' in $window) {
				return Notification.permission === 'granted' ? true : false;
			}

			return false;
		},

		/**
		 * A flow for requesting permission for native notifications
		 */
		requestPermission: function() {
			if (gConfig.useNativeNotifications && 'Notification' in $window) {
				if (Notification.permission === 'granted') {
					NotificationClass = Notification;
					api.native = true;
					api.nativePermission = Notification.permission;
					$timeout();
				}

				// Otherwise, we need to ask the user for permission
				else {
					Notification.requestPermission(function (permission) {
					  	// If the user accepts, let's create a notification
					  	if (permission === 'granted') {
					    	NotificationClass = Notification;
					    	api.native = true;
					    	api.nativePermission = Notification.permission;
					    	$timeout();
					  	}
					});
				}

				api.nativePermission = Notification.permission;
			}
		}
	};

	var init = function() {

		$window.onbeforeunload = function() {
			api.removeAll();
		};
	};

	init();

	return api;
});