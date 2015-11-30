var gComponentRoutes = {
	'layout' : {name: 'Layout'},
	'buttons' : {name: 'Buttons'},
	'typography' : {name: 'Typography'},
	'icons' : {name: 'Icons'},
	'tabs' : {name: 'Tabs'},
	'labels' : {name: 'Labels'},
	'forms' : {name: 'Forms'},
	'notifications' : {name: 'Notifications'},
	'breadcrumbs' : {name: 'Breadcrumbs'},
	'progress' : {name: 'Progress'},
	'pagination' : {name: 'Pagination'},
	'overlays' : {name: 'Overlays'},
	'dropdowns' : {name: 'Dropdowns'},
	'modals' : {name: 'Modals'},
	'collapse' : {name: 'Collapse'}
};

angular.module('G.docs').config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/', 
			templateUrl: '/templates/home.html'
		})
		

		.state('components', {
			url: '/components', 
			templateUrl: '/templates/components.html'
		});

		

	// add in component routes
	for (routeName in gComponentRoutes) {
		var route = gComponentRoutes[routeName];

		$stateProvider.state('components.' + routeName, {
			url: '/' + routeName, 
			templateUrl: '/templates/'+ routeName +'.html'
		});
	}


	$urlRouterProvider.otherwise('home');
});

angular.module('G.docs').run(function($rootScope){
	$rootScope.componentRoutes = gComponentRoutes;
});