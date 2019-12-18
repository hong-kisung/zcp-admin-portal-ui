export default {
	setOrders: function(state, data) {
		state.orders = data.content.resources
		state.ordersCondition.page = data.page
	},
	setOrdersPageNo: function(state, data) {
        state.ordersCondition.page.pageNo = data
    },
	setOrder: function(state, data) {
		const order = data.content.resource

		state.orderDetail.order = order
		state.orderDetail.orderProduct = order.orderProduct
		state.orderDetail.orderPackageCategories = order.orderProduct.orderPackageCategories
		state.orderDetail.orderStatusLogs = order.orderStatusLogs

		if (order.orderCluster) {
			const orderCluster = {
				clusterId: order.orderCluster.clusterId,
				clusterName: order.orderCluster.clusterName,
				clusterRegDate: order.orderCluster.clusterRegDate,
				clusterRegId: order.orderCluster.clusterRegId
			}

			state.orderDetail.orderClusters = []
			state.orderDetail.orderClusters.push(orderCluster)
		} else {
			state.orderDetail.orderClusters = []
		}
	},
	setOrderStatusLogs: function(state, data) {
		state.orderDetail.orderStatusLogs = data.content.resources
	},
	setOrderClusters: function(state, data) {
		state.orderDetail.orderClusters = data
	}
}
