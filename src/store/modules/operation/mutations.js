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

		state.orderDetail.orderClusters = [];
		if (data.orderClusters.length !== 0) {
			let orderCluster = data.orderClusters[0];

			orderCluster.clusterId = orderCluster.cluster.clusterId;
			orderCluster.clusterName = orderCluster.cluster.clusterName;
			
			state.orderDetail.orderClusters.push(orderCluster);
		}
	},
	setOrderClusters: function(state, data) {
		state.orderDetail.orderClusters = data;
	},
	setClusters: function(state, data) {
		state.clusters = data;
	}
}
