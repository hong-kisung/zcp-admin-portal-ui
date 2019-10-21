import axios from '@/plugins/axios'

export default {
	getCustomers: function(store, payload) {
		let q = '';
		let pageNo = payload.page.pageNo || 1;
		let pageSize = payload.page.pageSize || 10;
		let sort = 'createdDt';
		let orderBy = 'desc';

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
				this._vm.$zadmin.alert('저장 되었습니다.')
			} else {
				this._vm.$zadmin.alert('처리 중 오류가 발생하였습니다.')
			}
		})
	}
}
