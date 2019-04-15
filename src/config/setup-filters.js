function setupFilters(Vue) {
	Vue.filter('formatNumber', function(num) {
		if(num == undefined || num == '')
			return;
		
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	});
	
	Vue.filter('readMore', function (text, length, suffix) {
	    return text.substring(0, length) + suffix;
	});
	
	Vue.filter('json', function (value) {
	    return JSON.stringify(value);
	});	
}

export {
	setupFilters
}