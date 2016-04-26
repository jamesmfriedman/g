require('./gAvatar.html');

var mod = angular.module('G.avatar', []);

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
		controllerAs: 'gAvatar',
		link: function(scope, el) {
			el.attr('itemscope', '');
			el.attr('itemtype', 'https://schema.org/ImageObject');
		}
	};
});

mod.controller('gAvatarController', function($scope, $element, gConfig) {
	var $ctrl = this;
	var imgEl = angular.element($element[0].querySelector('.g-avatar-img'));
	$ctrl.avatar = {};
		
	var unbind = $scope.$watch('gAvatar.params', function(params){
		if (params === undefined) {
			return;
		}

		angular.merge($ctrl.avatar, gConfig.getAvatar(params));
		$ctrl.avatar.initials = parseInitials($ctrl.avatar.initials, $ctrl.avatar.name);

		if ($ctrl.avatar.src) {
			imgEl.css('background-image', 'url(' + $ctrl.avatar.src + ')');
			imgEl.addClass('in');
			imgEl.attr('content', $ctrl.avatar.src);
		}

		if (!$ctrl.avatar.watch) {
			unbind();
		}
	}, true);

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

	$scope.$on('destroy', function(){
		imgEl = null;
		$element = null;
		if (unbind) {
			unbind();
		}
	});
});
