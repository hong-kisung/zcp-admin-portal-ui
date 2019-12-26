import axios from '@/plugins/axios'

export default {
	getOrders: function(store, payload) {
		// set search
		let orderStatus = 'orderStatus=' + payload.filter.orderStatus.join('-')
		let orderType = ',orderType=' + payload.filter.orderType.join('-')
		let orderId = ',orderId=' + payload.filter.orderId
		let orderUserName = ',orderUserName=' + payload.filter.orderUserName
		let clusterName = ',clusterName=' + payload.filter.clusterName
		let batchTargetYn = ',batchTargetYn=' + payload.filter.batchTargetYn
		let clientId = ',clientId=' + payload.filter.clientId

		let q = encodeURIComponent(orderStatus + orderType + orderId + orderUserName + clusterName + batchTargetYn + clientId)

		// set page
		let pageNo = payload.page.pageNo
		let pageSize = payload.page.pageSize
		let sort = payload.sortBy
		let orderBy = payload.sortDesc == true ? 'desc' : 'asc'

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
	},
	getOrderProductClients: function (store, payload) {
		axios.get('/api/admin-order//orders/product/clients').then(response => {
			store.commit('setOrderProductClients', response.data)
		}).catch(error => {
			console.log('failed get getOrderProductClients')
		})
	},
}
