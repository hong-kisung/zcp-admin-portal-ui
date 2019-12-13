import axios from '@/plugins/axios'

export default {
	getClusters: function(store, payload) {
		// set search
		let clusterId = 'clusterId=' + payload.search.clusterId
		let clusterName = ',clusterName=' + payload.search.clusterName
		let enviromentType = ',enviromentType=' + payload.search.enviromentType
		let nwArchType = ',nwArchType=' + payload.search.nwArchType
		let sreIntegrationYn = ',sreIntegrationYn=' + payload.search.sreIntegrationYn
		let activation = ',activation=' + payload.search.activation

		let q = encodeURIComponent(clusterId + clusterName + enviromentType + nwArchType + sreIntegrationYn + activation)

		// set page
		let pageNo = payload.page.pageNo
		let pageSize = payload.page.pageSize
		let sort = 'createdDt'
		let orderBy = 'desc'

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
	}
}
