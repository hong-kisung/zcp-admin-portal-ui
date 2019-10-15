import axios from '@/plugins/axios'

export default {
	getOrders: function(store, payload) {
		let orderStatus = payload.search.orderStatus.join('-');
		let orderType = payload.search.orderType.join('-');
		let batchTargetYn = payload.search.batchTargetYn;
		let orderUserName = payload.search.orderUserName;
		let clusterName = payload.search.clusterName;
		let orderId = payload.search.orderId;

		// set search
		let orderStatusQ = 'orderStatus=' + orderStatus;
		let orderTypeQ = ',orderType=' + orderType;
		let orderUserNameQ = ',orderUserName=' + orderUserName;
		let batchTargetYnQ = ',batchTargetYn=' + batchTargetYn;
		let clusterNameQ = ',clusterName=' + clusterName;
		let orderIdQ = ',orderId=' + orderId;

		let q = encodeURIComponent(orderStatusQ + orderTypeQ + orderUserNameQ + batchTargetYnQ + clusterNameQ + orderIdQ);

		// set page
		let pageNo = payload.page.pageNo;
		let pageSize = payload.page.pageSize;
		let sort = 'orderDate';
		let orderBy = 'desc';

		axios.get('/api/admin-order/orders?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize + '&sort=' + sort + '&orderBy=' + orderBy).then(response => {
			store.commit('setOrders', response.data)
		}).catch(error => {
			console.log('failed get orders')
		})
	},
	getOrder: function (store, payload) {
		axios.get('/api/admin-order/orders/' + payload.id).then(response => {
			store.commit('setOrder', response.data)
		}).catch(error => {
			console.log('failed get order')
		})
	},
	getOrderStatusLogs: function (store, payload) {
		axios.get('/api/admin-order/orders/' + payload.id + '/status').then(response => {
			store.commit('setOrderStatusLogs', response.data)
		}).catch(error => {
			console.log('failed get getOrderStatusLogs')
		})
	}
}
