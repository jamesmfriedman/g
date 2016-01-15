angular.module('G.modal').service('gModals', function($document) {

	var body = angular.element($document[0].body);
	var openModals = [];

	var api = {
		_register: function(name, modal) {
			this[name] = modal;
		},

		_unregister: function(name) {
			delete this[name];
		},

		_add: function(modal) {
			openModals.push(modal);
			body.addClass('g-modal-open');
		},

		_remove: function(modal) {
			openModals.splice(openModals.indexOf(modal));
			if (!openModals.length) {
				body.removeClass('g-modal-open');
			}
		}
	};

	return api;
});