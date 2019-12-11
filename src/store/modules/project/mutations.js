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
        state.projectsAll = data.content.resources
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
    setProjectsClusters: function(state, data) {
        state.projectsClusters = data.content.resources
    },

    // product
    setProducts: function(state, data) {
        state.products = data.content.resources
    },

    // project stakeholders
    setProjectStakeholders: function(state, data) {
        state.projectStakeholders = data.content.resources
    },
    setProjectStakeholder: function(state, data) {
        if (data.content) {
            state.projectStakeholder = data.content.resource
        } else {
            state.projectStakeholder = {}
        }
    },
    setProjectMngUsers: function(state, data) {
        state.projectMngUsers = data.content.resources
    }
}
