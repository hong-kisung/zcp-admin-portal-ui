import axios from '@/plugins/axios'

export default {
	getClusters: function(store, payload) {
		// set search
		let clusterId = 'clusterId=' + payload.filter.clusterId
		let clusterName = ',clusterName=' + payload.filter.clusterName
		let status = ',status=' + payload.filter.status
		let enviromentType = ',enviromentType=' + payload.filter.enviromentType
		let nwArchType = ',nwArchType=' + payload.filter.nwArchType
		let sreIntegrationYn = ',sreIntegrationYn=' + payload.filter.sreIntegrationYn
		let activation = ',activation=' + payload.filter.activation

		let q = encodeURIComponent(clusterId + clusterName + status + enviromentType + nwArchType + sreIntegrationYn + activation)

		// set page
		let pageNo = payload.page.pageNo
		let pageSize = payload.page.pageSize
		let sort = payload.sortBy
		let orderBy = payload.sortDesc == true ? 'desc' : 'asc'

		axios.get('/api/admin-cluster/clusters?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize + '&sort=' + sort + '&orderBy=' + orderBy).then(response => {
			store.commit('setClusters', response.data)
		}).catch(error => {
			console.log('failed get getClusters')
		})
	},
	getClustersReload: function(store, payload) {
		axios.get('/api/admin-cluster/clusters').then(response => {
			store.commit('setClusters', response.data)
		}).catch(error => {
			console.log('failed get getClustersReload')
		})
	},
	getCluster: function(store, payload) {
		axios.get('/api/admin-cluster/clusters/' + payload.id).then(response => {
			store.commit('setCluster', response.data)
		}).catch(error => {
			console.log('failed get getClusters')
		})
	},
	getClustersAll: function(store, payload) {
		axios.get('/api/admin-cluster/clusters/all').then(response => {
			store.commit('settClustersAll', response.data)
		}).catch(error => {
			console.log('failed get getClustersAll')
		})
	},
	getClusterOrders: function(store, payload) {
		axios.get('/api/admin-cluster/clusters/' + payload.id + '/orders').then(response => {
			store.commit('setClusterOrders', response.data)
		}).catch(error => {
			console.log('failed get getClusterOrders')
		})
	}
}
