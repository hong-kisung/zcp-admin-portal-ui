export default {
	setOrders: function(state, data) {
		state.orders = data.content.resources;
		state.ordersPage = data.page;
	},
	setOrder: function(state, data) {
		state.orderDetail.order = data;
		state.orderDetail.orderProduct = data.orderProduct;
		state.orderDetail.orderPackageCategories = data.orderProduct.orderPackageCategories;
		state.orderDetail.orderStatusLogs = data.orderStatusLogs;

		if (data.cluster) {
			state.orderDetail.orderCluster = {
				clusterModDate: data.clusterModDate,
				clusterModId: data.clusterModId,
				clusterId: data.cluster.clusterId,
				clusterName: data.cluster.clusterName,
			}
		} else {
			state.orderDetail.orderCluster = null;
		}
	},
	setOrderClusters: function(state, data) {
		state.orderDetail.orderClusters = data;
	},
	setClusters: function(state, data) {
		state.clusters = data;
	}
}
