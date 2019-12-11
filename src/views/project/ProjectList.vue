<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Projects <b-badge class="m-1" variant="danger">{{ projectsPage.totalCount }}</b-badge>
            <div class="float-right">
                <b-button variant="success" class="mr-2" @click="projectAdd"><i class="icon-plus"></i> Project 추가</b-button>
                <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
            </div>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="customer">Customer</label>
                                <b-form-select id="customerId" :plain="true" v-model="projectsSearch.customerId" >
                                    <option value="">All</option>
                                    <option v-for="(item, index) in customersAll" :value="item.id">{{ item.nameEn }}</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="project">Project</label>
                                <b-form-input type="text" id="name" placeholder="Project Name을 입력하세요." v-model="projectsSearch.name"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="status">Status</label>
                                <b-form-select id="status" :plain="true" value="선택" v-model="projectsSearch.status">
                                    <option value="">All</option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Development">Development</option>
                                    <option value="Operation">Operation</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="activation">estimated YN</label>
                                <div>
                                    <b-form-radio-group id="estimatedYn" name="estimatedYn" v-model="projectsSearch.estimatedYn">
                                        <b-form-radio value="">All</b-form-radio>
                                        <b-form-radio value="Y">Yes</b-form-radio>
                                        <b-form-radio value="N">No</b-form-radio>
                                    </b-form-radio-group>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="activation">Activation</label>
                                <div>
                                    <b-form-radio-group id="activation" name="activation" v-model="projectsSearch.activation">
                                        <b-form-radio value="">All</b-form-radio>
                                        <b-form-radio value="Y">Yes</b-form-radio>
                                        <b-form-radio value="N">No</b-form-radio>
                                    </b-form-radio-group>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-button variant="primary" block @click="getProjectsByPage(1)"><i class="fa fa-search"></i> 검색</b-button>
                        </b-col>
                    </b-form>
                </b-card>
            </b-collapse>
        </div>
        <b-card>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select v-model="projectsPage.pageSize" id="perPageSelect" :options="pageOptions" @change="getProjectsByPage(1)" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="projectsPage.pageNo" :total-rows="projectsPage.totalCount" :per-page="projectsPage.pageSize" @input="getProjectsByPage(projectsPage.pageNo)" align="right" class="my-0">
                </b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="projects_fields" :items="projects">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'projects_number' ? '5%' : '' }">
                    </template>

                    <template slot="no" slot-scope="data">
                        {{ (projectsPage.totalCount - ((projectsPage.pageNo - 1) * projectsPage.pageSize)) - data.index }}
                    </template>
                    <template slot="customer" slot-scope="data">
                        {{toCustomerLabel(data.item.customerId)}}
                    </template>
                    <template slot="name" slot-scope="data">
                        <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.id, name: data.item.name }}">
                            {{data.item.name}}
                        </router-link>
                    </template>
                    <template slot="period" slot-scope="data">
                        {{data.item.devStartDt | toDevPeriod}} ~ {{data.item.devEndDt | toDevPeriod}}
                    </template>
                    <template slot="projects_clusters" slot-scope="data">
                        <b-link><img src="img/img_k8s.png" alt="kubernetes" width="22"></b-link>
                    </template>
                    <template slot="projects_stakeholder" slot-scope="data">
                        <b-button variant="primary" size="sm"><i class="icon-people"></i></b-button>
                    </template>
                    <template slot="projects_estimates" slot-scope="data">
                        <b-button variant="warning" size="sm"><i class="icons cui-note"></i></b-button>
                    </template>
                    <template slot="activation" slot-scope="data">
                        <label class="mx-1 mb-0 switch switch-label switch-success">
                            <input class="switch-input" type="checkbox" checked="" v-model="data.item.activation" @click="updateProjectActivation(data.item.id, data.item.activation)">
                            <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                        </label>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button variant="danger" size="sm" @click="removeProject(data.item.id, data.item.name)"><i class="fa fa-close"></i></b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>

            <projectAdd v-bind:dialogVisible="projectAddDialog" v-on:fire-dialog-closed="projectAddDialog = false" />

        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import projectAdd from './ProjectAdd'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        projectAdd
    },
    data()  {
        return {
            projects_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'customer', label: 'Customer', tdClass: 'text-left' },
                { key: 'name', label: 'Project Name', tdClass: 'text-left' },
                { key: 'status', label: 'Status', tdClass: 'text-center' },
                { key: 'period', label: 'Dev. Period', tdClass: 'text-center' },
                { key: 'launchDt', label: 'Launching Date', tdClass: 'text-center' },
                { key: 'estimatedYn', label: 'estimated YN', tdClass: 'text-center' },
                { key: 'projects_stakeholder', label: 'Stakeholder', tdClass: 'text-center' },
                { key: 'projects_estimates', label: 'Estimates', tdClass: 'text-center' },
                { key: 'projects_clusters', label: 'Clusters', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            pageOptions: [10, 20, 30, 50, 100],
            projectAddDialog: false,
            projectId: 0,
            customersAll: []
        }
    },
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        },
        projects: function() {
            return this.$store.state.project.projects
        },
        projectsPage: function() {
            return this.$store.state.project.projectsPage
        },
        projectsSearch: function() {
            return this.$store.state.project.projectsSearch
        }
    },
    filters: {
        toDevPeriod(val) {
            if (val) {
                return val
            } else {
                return ''
            }
        }
    },
    created() {
        this.getProjects()
        this.getCustomersAll()
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        getCustomersAll() {
            axios.get('/api/admin-customer/customers/all').then(response => {
                this.customersAll = response.data.content.resources
            })
        },
        getProjects() {
            const params = {
                search: this.projectsSearch,
                page: this.projectsPage
            }

            this.$store.dispatch('project/getProjects', params)
        },
        getProjectsByPage(pageNo) {
            this.$store.commit('project/setProjectsPageNo', pageNo)

            const params = {
                search: this.projectsSearch,
                page: this.projectsPage
            }
            this.$store.dispatch('project/getProjects', params)
        },
        projectAdd() {
            const project = {
                content: {
                    resource: {
                        customerId: '',
                        status: '',
                        estimatedYn: 'Y',
                        parentId: '',
                        customerCloudAccountCspCode: '',
                        customerCloudAccountId: ''
                    }
                }
            }

            this.$store.commit('project/setProject', project)
            this.projectAddDialog = true
        },
        updateProjectActivation(id, activation) {
            let yn = (activation == true) ? 'N' : 'Y'
            axios.put('/api/admin-project/projects/' + id + '/activation/' + yn).then(response => {
                let project = this.$store.state.project.projects.find(o => o.id == id) || {}
                project.activation = (yn === 'N') ? false : true
            }).catch(error => {
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeProject(id, name) {
            this.$zadmin.confirm(name + '을(를) 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-project/projects/' + id).then(response => {
                    if (response && response.status === 204) {
                        this.getProjects()
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    let response = error.response
                    if (response.data) {
                        this.$zadmin.alert(response.data.message)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        toCustomerLabel(val) {
            let project = this.customersAll.find(o => o.id == val)
            if (project != null) {
                return project.nameKr
            }
        }
    }
}
</script>
