export default {
	setOrders: function(state, data) {
		state.orders = data.content.resources;
		state.ordersCondition.page = data.page
	},
	setOrdersPageNo: function(state, data) {
        state.ordersCondition.page.pageNo = data
    },
	setOrder: function(state, data) {
		state.orderDetail.order = data;
		state.orderDetail.orderProduct = data.orderProduct;
		state.orderDetail.orderPackageCategories = data.orderProduct.orderPackageCategories;
		state.orderDetail.orderStatusLogs = data.orderStatusLogs;

		if (data.cluster) {
			let orderCluster = {
				clusterModDate: data.clusterModDate,
				clusterModId: data.clusterModId,
				clusterId: data.cluster.clusterId,
				clusterName: data.cluster.clusterName,
			}

			state.orderDetail.orderClusters = [];
			state.orderDetail.orderClusters.push(orderCluster);
		} else {
			state.orderDetail.orderClusters = [];
		}
	},
	setOrderStatusLogs: function(state, data) {
		state.orderDetail.orderStatusLogs = data;
	},
	setOrderClusters: function(state, data) {
		state.orderDetail.orderClusters = data;
	}
}
