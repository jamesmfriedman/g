angular.module('G.common').provider('gConfig', function() {
	
	var config = {
		iconPrefix: 'icon-',
		useNativeNotifications: true,
		defaultNotificationIcon: null
	};

	this.iconPrefix = function(prefix){
		config.iconPrefix = prefix;
	};

	this.useNativeNotifications = function(bool){
		config.useNativeNotifications = !!bool;
	};

	this.defaultNotificationIcon = function(icon){
		config.defaultNotificationIcon = icon;
	};

	this.$get = function() {
        return config;
    };
});