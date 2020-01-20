import axios from '@/plugins/axios'

export default {
	// customer
	getCustomers: function(store, payload) {
		let q = ''
		let pageNo = payload.page.pageNo
		let pageSize = payload.page.pageSize
		let sort = payload.sortBy
		let orderBy = payload.sortDesc == true ? 'desc' : 'asc'

		axios.get('/api/admin-customer/customers?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize + '&sort=' + sort + '&orderBy=' + orderBy).then(response => {
			store.commit('setCustomers', response.data)
		}).catch(error => {
			console.log('failed get getCustomersReload')
		})
	},
	getCustomersReload: function(store, payload) {
		axios.get('/api/admin-customer/customers').then(response => {
			store.commit('setCustomers', response.data)
		}).catch(error => {
			console.log('failed get getCustomersReload')
		})
	},
	saveCustomer: function (store, payload) {
		axios.post('/api/admin-customer/customers', payload.customer).then(response => {
			if (response.status === 201) {
				store.dispatch('getCustomersReload')
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	},
	getCustomer: function(store, payload) {
		axios.get('/api/admin-customer/customers/' + payload.id).then(response => {
			store.commit('setCustomer', response.data)
		}).catch(error => {
			console.log('failed get getCustomers')
		})
	},
	updateCustomer: function (store, payload) {
		axios.put('/api/admin-customer/customers/' + payload.id, payload.customer).then(response => {
			if (response.status === 200) {
				store.dispatch('getCustomer', {id: payload.id})
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	},

	// customer cloud account
	getCustomerCloudAccounts: function(store, payload) {
		axios.get('/api/admin-customer/customers/' + payload.id + '/cloud-accounts').then(response => {
			store.commit('setCustomerCloudAccounts', response.data)
		}).catch(error => {
			console.log('failed get getCustomerCloudAccounts')
		})
	},
	getCustomerCloudAccount: function(store, payload) {
		axios.get('/api/admin-customer/customers/' + payload.id + '/cloud-accounts/' + payload.customerCloudAccountId).then(response => {
			store.commit('setCustomerCloudAccount', response.data)
		}).catch(error => {
			console.log('failed get getCustomerCloudAccount')
		})
	},

	// projects
	getCustomerProjects: function(store, payload) {
		axios.get('/api/admin-customer/customers/' + payload.id + '/projects').then(response => {
			store.commit('setCustomerProjects', response.data)
		}).catch(error => {
			console.log('failed get getCustomerProjects')
		})
	}
}
