import axios from '@/util/axios'

export default {
	getOrders: function(store, payload) {
		let orderStatus = payload.search.orderStatus.join('-');
		let orderType = payload.search.orderType.join('-');
		let batchTargetYn = payload.search.batchTargetYn;
		let orderUserName = payload.search.orderUserName;
		let clusterName = payload.search.clusterName;

		// set search
		let orderStatusQ = 'orderStatus=' + orderStatus;
		let orderTypeQ = ',orderType=' + orderType;
		let orderUserNameQ = ',orderUserName=' + orderUserName;
		let batchTargetYnQ = ',batchTargetYn=' + batchTargetYn;
		let clusterNameQ = ',clusterName=' + clusterName;

		let q = encodeURIComponent(orderStatusQ + orderTypeQ + orderUserNameQ + batchTargetYnQ + clusterNameQ);

		// set page
		let pageNo = payload.page.pageNo;
		let pageSize = payload.page.pageSize;

		axios.get('api/admin-order/orders?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize).then(response => {
			store.commit('setOrders', response.data)
		}).catch(error => {
			console.log('failed get orders')
		})
	},
	getOrder: function (store, payload) {
		axios.get('api/admin-order/orders/' + payload.id).then(response => {
			store.commit('setOrder', response.data)
		}).catch(error => {
			console.log('failed get order')
		})
	},
	getClusters: function(store, payload) {
		axios.get('api/admin-cluster/clusters').then(response => {
			store.commit('setClusters', response.data)
		}).catch(error => {
			console.log('failed get getClusters')
		})
	}
}
