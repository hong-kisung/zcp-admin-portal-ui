export default {
    orders: [],
    ordersCondition: {
        page: {
            pageNo: 1,
            pageSize: 10,
            totalCount: 0
        },
        filter: {
            orderType: ['PURCHASE', 'DISPOSAL'],
            orderStatus: ['REQUESTED', 'PROCEEDING', 'DONE', 'DENIED'],
            orderId: '',
            batchTargetYn: '',
            orderUserName: '',
            clusterName: ''
        },
        sortBy: 'orderDate',
    	sortDesc: true
    },
    orderDetail: {
        order: {},
        orderProduct: {},
        orderPackageCategories: [],
        orderStatusLogs: [],
        orderClusters: []
    }
}
