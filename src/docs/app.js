var hosts = ['git.empdev.domo.com'];
var app = angular.module('G.docs', [
	'ngAnimate',
	'ngSanitize',
	'ui.router',
	'G',
	'G.docs.controllers'
]);

var IS_DEV = hosts.indexOf(window.location.hostname) === -1;

/**
 * Setup some app configuration options
 */ 
app.config(function($locationProvider, $provide, $compileProvider, $animateProvider, gConfigProvider) {

	$animateProvider.classNameFilter(/animate/);
	gConfigProvider.iconPrefix('fi-');
	//gConfigProvider.useNativeNotifications(false);
	gConfigProvider.defaultNotificationIcon('/img/favicon.png');

	// this allows support for a dynamic basehref so the guide can run on github pages
	$provide.decorator('$browser', function($delegate) {
		$delegate.baseHref = function() {
	      	return window.location.pathname;
	    };
        return $delegate;
    });

	// fake the browser into hashbang mode
	$provide.decorator('$sniffer', function($delegate) {
	  	$delegate.history = false;
	  	return $delegate;
	});	

	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true,
		rewriteLinks: true
	});

	if (!IS_DEV) {
		$compileProvider.debugInfoEnabled(false);
	}
});


/**
 * Controls the main app frame
 */
app.run(function($rootScope, gConfig, $timeout) {
		
	// kills the 300ms delay for touch events on mobile

	gConfig.getAvatar = function(obj) {
			
		if (!obj.name) {
			obj.watch = true;	
			$timeout(function(){
				angular.merge(obj, {name: 'James Friedman', src:'img/_me.jpg'});
				obj.watch = false;
			}, 1000);		
		}
		

		return obj;
	};
});

module.exports = app;

