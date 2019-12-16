export default {
    clusters: [],
    clustersCondition: {
        page: {
            pageNo: 1,
            pageSize: 10,
            totalCount: 0
        },
        filter: {
            clusterId: '',
            clusterName: '',
            enviromentType: '',
            nwArchType: '',
            sreIntegrationYn: '',
            activation: 'Y'
        },
        sortBy: 'createdDt',
    	sortDesc: true
    },
    clustersPage: {
        pageNo: 1,
        pageSize: 10
    },
    clustersSearch: {

    },
    cluster: {},
    clustersAll: []
}
