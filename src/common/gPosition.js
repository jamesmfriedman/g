angular.module('G.common').service('gPosition', function($window, $document) {

	var win = angular.element($window);
	var body = angular.element($document[0].body);

	var detectOOB = function(pos, eb, winWidth, winHeight) {
		var oob = {};

		if (pos.top < 0) {
			oob.top = pos.top;
		}

		// right bounds
		if (pos.left + eb.width > winWidth) {
			oob.right = pos.left + eb.width - winWidth;
		}

		// bottom bounds
		if (pos.top + eb.height > winHeight) {
			oob.bottom = pos.top + eb.height - winHeight;
		}

		// left bounds
		if (pos.left < 0) {
			oob.left = pos.left;
		}

		return oob;
	};

	var getPosition = function(ob, eb, x, y) {
		var pos = {
			top: 0,
			left: 0
		};

		switch (x) {
			case 'top':
				pos.top = ob.top - eb.height;
				break;
			case 'right':
				pos.left = ob.left + ob.width;
				break;
			case 'bottom':
				pos.top = ob.top + ob.height;
				break;
			case 'left':
				pos.left = ob.left - eb.width;
				break;
			case 'center':
				if (y === 'top' || y === 'bottom') {
					pos.left = ob.left + (ob.width - eb.width) / 2;	
				} else {
					pos.top = ob.top + (ob.height - eb.height) / 2;
				}
				break;
		}

		switch (y) {
			case 'left':
				pos.left = ob.left;
				break;
			case 'right':
				pos.left = ob.left + ob.width - eb.width;
				break;
			case 'center':
				if (x === 'left' || x === 'right') {
					pos.top = ob.top + (ob.height - eb.height) / 2;
				} else {
					pos.left = ob.left + (ob.width - eb.width) / 2;	
				}
				break;
			case 'top':
				pos.top = ob.top + ob.height - eb.height;
				break;
			case 'bottom':
				pos.top = ob.top;
				break;
		}

		return pos;
	};

	var positionElement = function(origin, el, x, y, mode) {
		if (!origin || !el) return;
		mode = mode || 'push';

		var ob = origin[0].getBoundingClientRect();
		var eb = el[0].getBoundingClientRect();
		
		var winWidth = win[0].innerWidth || $document.documentElement.clientWidth || body[0].clientWidth;
		var winHeight = win[0].innerHeight || $document.documentElement.clientHeight || body[0].clientHeight;

		var pos = getPosition(ob, eb, x, y);
		var oob = detectOOB(pos, eb, winWidth, winHeight)

		if (mode === 'push') {
			// top bounds
			if (oob.top) {
				pos.top = 0;
			}

			// right bounds
			if (oob.right) {
				pos.left = winWidth - eb.width;
			}

			// bottom bounds
			if (oob.bottom) {
				pos.top = winHeight - eb.height;
			}

			// left bounds
			if (oob.left) {
				pos.left = 0;
			}
		}

		else if (mode === 'swapWithCenter' && Object.keys(oob).length) {
			var newX = x;
			var newY = y;
			var o;
			
			if (['top', 'center', 'bottom'].indexOf(x) !== -1) {
				// x
				if (oob.top && oob.bottom) {
					newX = 'center';
				} else if (oob.top) {
					o = detectOOB(getPosition(ob, eb, 'center', y), eb, winWidth, winHeight);
					newX = o.top && !o.bottom ? 'bottom' : 'center';
				} else if (oob.bottom) {
					o = detectOOB(getPosition(ob, eb, 'center', y), eb, winWidth, winHeight);
					newX = o.bottom && !o.top ? 'top' : 'center';
				} 

				// y
				if (oob.left && oob.right) {
					newY = 'center';	
				} else if (oob.left ) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight); 
					newY = o.left && !o.right ? 'left' : 'center';
				} else if (oob.right) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.right && !o.left ? 'right' : 'center';	
				} 
			}

			else {
				// x 
				if (oob.left && oob.right) {
					newX = 'center';	
				} else if (oob.left ) {
					o = detectOOB(getPosition(ob, eb, 'center', y), eb, winWidth, winHeight); 
					newX = o.left && !o.right ? 'right' : 'center';
				} else if (oob.right) {
					o = detectOOB(getPosition(ob, eb, 'center', y), eb, winWidth, winHeight);
					newX = o.right && !o.left ? 'left' : 'center';	
				} 

				// y
				if (oob.top && oob.bottom) {
					newY = 'center';
				} else if (oob.top) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.top && !o.bottom ? 'bottom' : 'center';
				} else if (oob.bottom) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.bottom && !o.top ? 'top' : 'center';
				} 

			}

			x = newX;
			y = newY;
			pos = getPosition(ob, eb, x, y);
		}

		else if (mode === 'swap') {
			var newX = x;
			var newY = y;

			if (['top', 'center', 'bottom'].indexOf(x) !== -1) {
				// x
				if (oob.top) {
					newX = 'bottom';
				} else if (oob.bottom) {
					newX = 'top';
				} 

				// y
				if (oob.left && oob.right) {
					newY = 'center';	
				} else if (oob.left ) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight); 
					newY = o.left && !o.right ? 'left' : 'center';
				} else if (oob.right) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.right && !o.left ? 'right' : 'center';	
				} 
			}

			else {
				// x 
				if (oob.left ) {
					newX = 'right';
				} else if (oob.right) {
					newX = 'left';	
				} 

				// y
				if (oob.top && oob.bottom) {
					newY = 'center';
				} else if (oob.top) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.top && !o.bottom ? 'bottom' : 'center';
				} else if (oob.bottom) {
					o = detectOOB(getPosition(ob, eb, x, 'center'), eb, winWidth, winHeight);
					newY = o.bottom && !o.top ? 'top' : 'center';
				} 
			}

			x = newX;
			y = newY;
			pos = getPosition(ob, eb, x, y);
		}


		el.removeClass('x-left x-right x-center x-top x-bottom y-top y-right y-bottom y-left y-center');
		el.addClass('x-' + x + ' y-' + y);

		pos.top = pos.top + 'px';
		pos.left = pos.left + 'px';
		el.css(pos);
	};

	return positionElement
});