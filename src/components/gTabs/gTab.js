angular.module('G.tabs').directive('gTab', function() {
	return {
		restrict: 'EC',
		require: ['^gTab','^^gTabs'],
		priority: -1,
		controllerAs: '$ctrl',
		bindToController: {
			onActivate: '&?'
		},
		controller: function($scope, $element, $attrs) {
			var $ctrl = this;
			var tabCtrl = $element.controller('gTabs');
			var isActive;

			$ctrl.deactivate = deactivate;
			$ctrl.activate = activate;

			setTimeout(constructor);

			function constructor() {
				$ctrl.name = $attrs.name || $element.text();
				tabCtrl._register($ctrl.name, $ctrl);

				$element.on('click touchend', function(){
					tabCtrl.activate($ctrl.name);
					$scope.$applyAsync();
				});

				$scope.$watch(function(){return $element.attr('class');}, function(val) {
					val = val || '';
					if (val.split(' ').indexOf('active') !== -1) {
						tabCtrl.activate($ctrl.name);
					}
				});

				if ($element.hasClass('active')) {
					tabCtrl.activate($ctrl.name);
				}
			}

			function activate() {
				if (!isActive) {
					$element.addClass('active');
					isActive = true;
					tabCtrl._setHighlight($element);

					if ($ctrl.onActivate) {
						$ctrl.onActivate();
					}
				}
			}

			function deactivate() {
				if (isActive) {
					$element.removeClass('active');	
					isActive = false;
				}
			}
		}
	};
});