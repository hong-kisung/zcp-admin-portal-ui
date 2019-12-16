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
            estimatedYn: '',
            activation: 'Y'
        },
        sortBy: 'createdDt',
    	sortDesc: true
    },
    projectsPage: {
        pageNo: 1,
        pageSize: 10
    },
    projectsSearch: {
        customerId: '',
        name: '',
        status: '',
        estimatedYn: '',
        activation: 'Y'
    },
    project: {},
    projectsAll: [],

    // project clusters
    projectClusters: [],
    projectCluster: {
        projectClusterProducts: []
    },
    projectsClusters: [],
    products: [],

    // project stakeholders
    projectStakeholders: [],
    projectStakeholder: {},
    projectMngUsers: []
}
