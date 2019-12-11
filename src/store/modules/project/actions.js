import axios from '@/plugins/axios'

export default {
	// project
	getProjects: function(store, payload) {
		// set search
		let customerId = 'customerId=' + payload.search.customerId
		let name = ',name=' + payload.search.name
		let status = ',status=' + payload.search.status
		let activation = ',activation=' + payload.search.activation
		let estimatedYn = ',estimatedYn=' + payload.search.estimatedYn

		let q = encodeURIComponent(customerId + name + status + estimatedYn + activation)

		// set page
		let pageNo = payload.page.pageNo
		let pageSize = payload.page.pageSize
		let sort = 'createdDt'
		let orderBy = 'desc'

		axios.get('/api/admin-project/projects?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize + '&sort=' + sort + '&orderBy=' + orderBy).then(response => {
			store.commit('setProjects', response.data)
		}).catch(error => {
			console.log('failed get getProjects')
		})
	},
	getProjectsReload: function(store, payload) {
		axios.get('/api/admin-project/projects').then(response => {
			store.commit('setProjects', response.data)
		}).catch(error => {
			console.log('failed get getProjectsReload')
		})
	},
	getProject: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id).then(response => {
			store.commit('setProject', response.data)
		}).catch(error => {
			console.log('failed get getProjects')
		})
	},
	getProjectsAll: function(store, payload) {
		axios.get('/api/admin-project/projects/all').then(response => {
			store.commit('setProjectsAll', response.data)
		}).catch(error => {
			console.log('failed get getProjectsAll')
		})
	},

	// project cluster
	getProjectClusters: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id + '/clusters').then(response => {
			store.commit('setProjectClusters', response.data)
		}).catch(error => {
			console.log('failed get getProjectClusters')
		})
	},
	getProjectCluster: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id + '/clusters/' + payload.projectClusterId).then(response => {
			store.commit('setProjectCluster', response.data)
		}).catch(error => {
			console.log('failed get getProjectCluster')
		})
	},

	// product
	getProducts: function(store, payload) {
		axios.get('/api/admin-project/products').then(response => {
			store.commit('setProducts', response.data)
		}).catch(error => {
			console.log('failed get getProducts')
		})
	},

	// project stakeholders
	getProjectStakeholders: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id + '/stakeholders').then(response => {
			store.commit('setProjectStakeholders', response.data)
		}).catch(error => {
			console.log('failed get getProjectStakeholders')
		})
	},
	getProjectStakeholder: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id + '/stakeholders/' + payload.projectStakeholderId).then(response => {
			store.commit('setProjectStakeholder', response.data)
		}).catch(error => {
			console.log('failed get getProjectStakeholder')
		})
	},
	getProjectMngUsers: function(store, payload) {
		axios.get('/api/admin-project/projects/mng-users').then(response => {
			store.commit('setProjectMngUsers', response.data)
		}).catch(error => {
			console.log('failed get getProjectMngUsers')
		})
	}
}
