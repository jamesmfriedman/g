var fs = require('fs');
var path = require('path');

module.exports = {
	ng: {
		directive: {
			_: {
				path: '/src/components/[name]/',
				post: function(config) {
					// append to the main js file
					var f = path.join(process.cwd(), 'src', 'g.js');
					var fd = fs.readFileSync(f);
					fd = fd + "\nrequire('./components/"+ config.name.raw +"');";
					fd = fd.replace(/\[([\S\s]+)\]/g, '[$1\t\'' + (config.module.split(',')[0].replace(/\'/g, ''))  +'\',\n]');

			  		fs.writeFileSync(f, fd, 'utf8');
				}
			}
		},
		service: {
			_: {
				path: '/src/common/'
			}
		}
	}
}