angular.module('G.forms').directive('gInput', function() {
	return {
		restrict: 'A',
		link: function(scope, el) {
			el.addClass('g-input');

			switch (el[0].nodeName.toLowerCase()) {
				case 'input':
					el.addClass('g-input-text');

					switch (el.attr('type')) {
						case 'number':
							el.attr('pattern', '\\d*');
					}

					break;
				case 'select':
					el.addClass('g-input-select');
					break;
				case 'textarea':
					el.addClass('g-input-textarea');
					break;
			}	
		}
	};
});