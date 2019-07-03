import Vue from 'vue'

Vue.filter('formatNumber', function(num) {
	if(num == undefined || num == '')
		return
	
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('readMore', function (text, length, suffix) {
    return text.substring(0, length) + suffix
})

Vue.filter('json', function (value) {
    return JSON.stringify(value)
})

Vue.filter('toUSD', function (value) {
	if(!value || value=='')
		return
		
	return '$ '+value
})

Vue.filter('toKRW', function (value) {
	if(!value || value=='')
		return
		
	return '₩ '+value
})

Vue.filter('toMonthlyPrice', function (value, exchangeRate) {
	return Math.ceil(value * 730 * exchangeRate)
})

Vue.filter('toSKPrice', function (value, ibmDcRate) {
	if(ibmDcRate == undefined) {
		return ''
	} else {
		return Math.ceil(value * (1 - ibmDcRate/100))
	}
	
})
