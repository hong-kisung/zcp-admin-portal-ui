export default {
    // project
    projects: [],
    projectsCondition: {
        page: {
            pageNo: 1,
            pageSize: 10,
            totalCount: 0
        },
        filter: {
            customerId: '',
            name: '',
            status: '',
            customerCloudAccountCspCode: '',
            activation: 'Y'
        },
        sortBy: 'createdDt',
    	sortDesc: true
    },
    project: {},
    projectsAll: [],

    // project clusters
    projectClusters: [],
    projectCluster: {
        projectClusterProducts: []
    },
    products: [],

    // project stakeholders
    projectStakeholders: [],
    projectStakeholder: {},
    projectMngUsers: [],

    // project cluster orders
    projectClustersOrders: []
}
