angular.module('G.common').provider('gConfig', function() {
	
	var config = {
		iconPrefix: 'icon-'
	};

	this.iconPrefix = function(prefix){
		config.iconPrefix = prefix;
	};

	this.$get = function() {
        return config;
    };
});