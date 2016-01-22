require('./gAvatar.html');

var mod = angular.module('G.avatar', [])

mod.directive('gAvatar', function() {
	return {
		restrict: 'E',
		templateUrl: 'gAvatar.html',
		scope: {},
		transclude: true,
		bindToController: {
			params: '=params'
		},
		controller: 'gAvatarController',
		controllerAs: 'gAvatar'
	}
});

mod.controller('gAvatarController', function($scope, gConfig) {
	var $ctrl = this;
	$ctrl.avatar = {};
	
	var unbind = $scope.$watchCollection('gAvatar.params', function(params){
		angular.merge($ctrl.avatar, gConfig.getAvatar(params));
		
		$ctrl.avatar.initials = parseInitials($ctrl.avatar.initials, $ctrl.avatar.name);

		if (!$ctrl.avatar.watch) {
			unbind();
		}
	});

	function parseInitials(initials, name) {
		if (initials) return initials;

		if (name) {
			var parts = name.split(' ');

			if (parts.length === 1) {
				initials = parts[0].charAt(0);
			} else {
				initials = parts[0].charAt(0) + parts.pop().charAt(0);
			}

			return initials.toUpperCase();
		}
	}
});
