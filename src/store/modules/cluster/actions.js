import axios from '@/plugins/axios'

export default {
	getClusters: function(store, payload) {
		// set search
		let clusterId = 'clusterId=' + payload.search.clusterId
		let clusterName = ',clusterName=' + payload.search.clusterName
		let environmentType = ',environmentType=' + payload.search.environmentType
		let nwArchType = ',nwArchType=' + payload.search.nwArchType
		let sreIntegrationYn = ',sreIntegrationYn=' + payload.search.sreIntegrationYn
		let activation = ',activation=' + payload.search.activation

		let q = encodeURIComponent(clusterId + clusterName + environmentType + nwArchType + sreIntegrationYn + activation)

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
	saveCluster: function (store, payload) {
		axios.post('/api/admin-cluster/clusters', payload.cluster).then(response => {
			if (response.status === 201) {
				store.dispatch('getClustersReload')
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		}).catch(error => {
			let response = error.response
			if (response.data) {
				let errorMsg = response.data.message + ' [' + response.data.code + ']'

				this._vm.$zadmin.alert(errorMsg)
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	},
	getCluster: function(store, payload) {
		axios.get('/api/admin-cluster/clusters/' + payload.id).then(response => {
			store.commit('setCluster', response.data)
		}).catch(error => {
			console.log('failed get getClusters')
		})
	},
	updateCluster: function (store, payload) {
		axios.put('/api/admin-cluster/clusters/' + payload.id, payload.cluster).then(response => {
			if (response.status === 200) {
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
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
