export default {
    setClusters: function(state, data) {
        state.clusters = data.content.resources
        state.clustersPage = data.page
    },
    setClustersPageNo: function(state, data) {
        state.clustersPage.pageNo = data
    },
    settClustersAll: function(state, data) {
        state.clustersAll = data
    },
    setCluster: function(state, data) {
        state.cluster = data
    }
}
