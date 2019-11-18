import axios from '@/plugins/axios'

export default {
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
	saveProject: function (store, payload) {
		axios.post('/api/admin-project/projects', payload.project).then(response => {
			if (response.status === 201) {
				store.dispatch('getProjectsReload')
				store.dispatch('getProjectsAll', {sort: 'name', orderBy: 'asc'})
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	},
	getProject: function(store, payload) {
		axios.get('/api/admin-project/projects/' + payload.id).then(response => {
			store.commit('setProject', response.data)
		}).catch(error => {
			console.log('failed get getProjects')
		})
	},
	updateProject: function (store, payload) {
		axios.put('/api/admin-project/projects/' + payload.id, payload.project).then(response => {
			if (response.status === 200) {
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	},
	getProjectsAll: function(store, payload) {
		axios.get('/api/admin-project/projects/all').then(response => {
			store.commit('settProjectsAll', response.data)
		}).catch(error => {
			console.log('failed get getProjectsAll')
		})
	}
}
