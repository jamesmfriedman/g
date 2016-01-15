angular.module('G', [ 
	'G.common',
	'G.btn',
	'G.dropdown',
	'G.icon',
	'G.popover',
	'G.tooltip',
	'G.modal',
	'G.tabs',
	'G.label',
	'G.pill',
	'G.badge',
	'G.notification',
	'G.toggle',
]);


require('./stylesheets/g.scss');

require('./common');
require('./common/gConfig');
require('./common/gMixins');
require('./common/gHelpers');
require('./common/gOverlayDirectiveBase');
require('./common/gPosition');

require('./components/gBtn');
require('./components/gToggle');
require('./components/gDropdown');
require('./components/gForms');
require('./components/gIcon');
require('./components/gMenuList');
require('./components/gModal');
require('./components/gPopover');
require('./components/gTooltip');
require('./components/gTabs');
require('./components/gLabel');
require('./components/gPill');
require('./components/gBadge');
require('./components/gNotification');
require('./components/gToggle');