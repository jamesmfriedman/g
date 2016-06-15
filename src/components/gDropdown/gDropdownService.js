angular.module('G.dropdown').service('gDropdowns', function() {
	var api = {
		_register: function(name, dropdown) {
			this[name] = dropdown;
		},

		_unregister: function(name) {
			delete this[name];
		}
	};

	return api;
});