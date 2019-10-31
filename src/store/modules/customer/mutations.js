export default {
    setCustomers: function(state, data) {
        state.customers = data.content.resources
        state.customersPage = data.page
    },
    setCustomersPageNo: function(state, data) {
        state.customersPage.pageNo = data
    },
    setCustomer: function(state, data) {
        if (data.id) {
            state.customer = {}
            state.customer.nameEn = data.nameEn
            state.customer.nameKr = data.nameKr

            if (data.customerCloudAccounts.length != 0) {
                state.customer.awsCspId = data.customerCloudAccounts.find(o => o.cspCode == 'AWS').cspId
                state.customer.awsAccountAlias = data.customerCloudAccounts.find(o => o.cspCode == 'AWS').accountAlias
                state.customer.azureCspId = data.customerCloudAccounts.find(o => o.cspCode == 'AZURE').cspId
                state.customer.azureAccountAlias = data.customerCloudAccounts.find(o => o.cspCode == 'AZURE').accountAlias
                state.customer.cloudzCspId = data.customerCloudAccounts.find(o => o.cspCode == 'CLOUDZ').cspId
                state.customer.cloudzAccountAlias = data.customerCloudAccounts.find(o => o.cspCode == 'CLOUDZ').accountAlias
                state.customer.gcpCspId = data.customerCloudAccounts.find(o => o.cspCode == 'GCP').cspId
                state.customer.gcpAccountAlias = data.customerCloudAccounts.find(o => o.cspCode == 'GCP').accountAlias
                state.customer.ibmCspId = data.customerCloudAccounts.find(o => o.cspCode == 'IBM').cspId
                state.customer.ibmAccountAlias = data.customerCloudAccounts.find(o => o.cspCode == 'IBM').accountAlias
            }
        } else {
            state.customer = {}
        }
    }
}
