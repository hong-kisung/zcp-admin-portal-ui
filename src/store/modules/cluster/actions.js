import axios from '@/plugins/axios'

export default {
	getClusters: function(store, payload) {
		axios.get('/api/admin-cluster/clusters').then(response => {
			store.commit('setClusters', response.data)
		}).catch(error => {
			console.log('failed get getClusters')
		})
	}
}
