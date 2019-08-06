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

// order/billing filter
Vue.filter('toOrderTypeText', function (value) {
	if (!value || value == '') return;

	let val;
	switch(value) {
	case 'PURCHASE':
		val = '구매';
		break;
	case 'DISPOSAL':
		val = '취소';
		break;
	}

	return val;
})

Vue.filter('toOrderStatusText', function (value) {
	if (!value || value == '') return;

	let val;
	switch(value) {
	case 'REQUESTED':
		val = '요청';
		break;
	case 'PROCEEDING':
		val = '처리중';
		break;
	case 'DONE':
		val = '완료';
		break;
	case 'DENIED':
		val = '거절';
		break;
	}

	return val;
})

Vue.filter('toBillingCycleText', function (value) {
	if (!value || value == '') return;

	let val;
	switch(value) {
	case 'MONTHLY':
		val = '월 과금';
		break;
	case 'ONE_TIME':
		val = '1회 과금상품';
		break;
	}

	return val;
})
