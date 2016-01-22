angular.module('G.common').provider('gConfig', function() {
	
	var config = {
		iconPrefix: 'icon-',
		useNativeNotifications: true,
		defaultNotificationIcon: null,
		getAvatar: function(params) {
			return params;
		}
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

	this.getAvatar = function(func) {
		config.getAvatar = func;
	};

	this.$get = function() {
        return config;
    };
});