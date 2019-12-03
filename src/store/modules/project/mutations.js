export default {
    // project
    setProjects: function(state, data) {
        state.projects = data.content.resources
        state.projectsPage = data.page
    },
    setProjectsPageNo: function(state, data) {
        state.projectsPage.pageNo = data
    },
    settProjectsAll: function(state, data) {
        state.projectsAll = data
    },
    setProject: function(state, data) {
        state.project = data
    },

    // project cluster
    setProjectClusters: function(state, data) {
        state.projectClusters = data.content.resources
    },
    setProjectCluster: function(state, data) {
        state.projectCluster = data
    },

    // product
    setProducts: function(state, data) {
        state.products = data
    }
}
