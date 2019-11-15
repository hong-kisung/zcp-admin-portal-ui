export default {
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
    }
}
