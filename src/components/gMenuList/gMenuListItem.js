require('./gMenuListItem.html');

angular.module('G.menuList').component('gMenuListItem', {	
    transclude: {
        'label': '?gMenuListItemLabel',
        'icon': 'gMenuListItemIcon',
        'actions': 'gMenuListItemActions',
    },
    template: 'gMenuListItem.html',
	controller: function() {

	}
});