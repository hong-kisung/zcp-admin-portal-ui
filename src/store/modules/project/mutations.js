export default {
    // project
    setProjects: function(state, data) {
        state.projects = data.content.resources
        state.projectsPage = data.page
    },
    setProjectsPageNo: function(state, data) {
        state.projectsPage.pageNo = data
    },
    setProject: function(state, data) {
        if (data.content) {
            state.project = data.content.resource
        } else {
            state.project = {}
        }
    },
    setProjectsAll: function(state, data) {
        state.projectsAll = data
    },

    // project cluster
    setProjectClusters: function(state, data) {
        state.projectClusters = data.content.resources
    },
    setProjectCluster: function(state, data) {
        if (data.content) {
            state.projectCluster = data.content.resource
        } else {
            state.projectCluster = {}
        }
    },

    // product
    setProducts: function(state, data) {
        state.products = data.content.resources
    }
}
