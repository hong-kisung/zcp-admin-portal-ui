export default {
    // customer
    setCustomers: function(state, data) {
        state.customers = data.content.resources
        state.customersPage = data.page
    },
    setCustomersPageNo: function(state, data) {
        state.customersPage.pageNo = data
    },
    setCustomer: function(state, data) {
        if (data.content) {
            state.customer = data.content.resource
        } else {
            state.customer = {}
        }
    },

    // customer cloud account
    setCustomerCloudAccounts: function(state, data) {
        state.customerCloudAccounts = data.content.resources;
    },
    setCustomerCloudAccount: function(state, data) {
        if (data.content) {
            state.customerCloudAccount = data.content.resource;
        } else {
            state.customerCloudAccount = {cspCode: ''}
        }
    }
}
