angular.module('G.modal').service('gModals', function() {

	var api = {
		_register: function(name, modal) {
			this[name] = modal;
		},

		_unregister: function(name) {
			delete this[name];
		}
	};

	return api;
});