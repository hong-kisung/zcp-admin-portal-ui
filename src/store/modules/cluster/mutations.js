export default {
    setClusters: function(state, data) {
        state.clusters = data.content.resources
        state.clustersCondition.page = data.page
    },
    setClustersPageNo: function(state, data) {
        state.clustersCondition.page.pageNo = data
    },
    settClustersAll: function(state, data) {
        state.clustersAll = data.content.resources
    },
    setCluster: function(state, data) {
        if (data.content) {
            state.cluster = data.content.resource
        } else {
            state.cluster = {}
        }
    },
    setClusterOrders: function(state, data) {
        state.clusterOrders = data.content.resources
    }
}
