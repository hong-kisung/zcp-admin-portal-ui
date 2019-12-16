<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Projects <b-badge class="m-1" variant="danger">{{ projectsCondition.page.totalCount }}</b-badge>
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
                                <b-form-select id="customerId" :plain="true" v-model="projectsCondition.filter.customerId" >
                                    <option value="">All</option>
                                    <option v-for="(item, index) in customersAll" :value="item.id">{{ item.nameEn }}</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="project">Project Name</label>
                                <b-form-input type="text" id="name" placeholder="Project Name을 입력하세요." v-model="projectsCondition.filter.name"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="status">Status</label>
                                <b-form-select id="status" :plain="true" value="선택" v-model="projectsCondition.filter.status">
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
                                    <b-form-radio-group id="estimatedYn" name="estimatedYn" v-model="projectsCondition.filter.estimatedYn">
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
                                    <b-form-radio-group id="activation" name="activation" v-model="projectsCondition.filter.activation">
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
                    <b-form-select v-model="projectsCondition.page.pageSize" id="perPageSelect" :options="pageOptions" @change="getProjectsByPage(1)" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="projectsCondition.page.pageNo" :total-rows="projectsCondition.page.totalCount" :per-page="projectsCondition.page.pageSize" @input="getProjectsByPage(projectsCondition.page.pageNo)" align="right" class="my-0">
                </b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="projects_fields" :items="projects"
                    :sort-by.sync="projectsCondition.sortBy" :sort-desc.sync="projectsCondition.sortDesc" @sort-changed="sortingChanged">

                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'projects_number' ? '5%' : '' }">
                    </template>

                    <template slot="no" slot-scope="data">
                        {{ (projectsCondition.page.totalCount - ((projectsCondition.page.pageNo - 1) * projectsCondition.page.pageSize)) - data.index }}
                    </template>
                    <template slot="customer" slot-scope="data">
                        {{toCustomerLabel(data.item.customerId)}}
                    </template>
                    <template slot="name" slot-scope="data">
                        <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.id, name: data.item.name, active: 'BasicInfomation' }}">
                            {{data.item.name}}
                        </router-link>
                    </template>
                    <template slot="period" slot-scope="data">
                        {{data.item.devStartDt | toDevPeriod}} ~ {{data.item.devEndDt | toDevPeriod}}
                    </template>
                    <template slot="projects_stakeholder" slot-scope="data">
                        <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.id, name: data.item.name, active: 'Stakeholders' }}">
                            <b-button variant="primary" size="sm"><i class="icon-people"></i></b-button>
                        </router-link>
                    </template>
                    <template slot="projects_estimates" slot-scope="data">
                        <b-button variant="warning" size="sm"><i class="icons cui-note"></i></b-button>
                    </template>
                    <template slot="projects_clusters" slot-scope="data">
                        <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.id, name: data.item.name, active: 'Clusters' }}">
                            <img src="img/img_k8s.png" alt="kubernetes" width="22">
                        </router-link>
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
                { key: 'customer', label: 'Customer', tdClass: 'text-left', sortable: true },
                { key: 'name', label: 'Project Name', tdClass: 'text-left', sortable: true },
                { key: 'status', label: 'Status', tdClass: 'text-center', sortable: true },
                { key: 'period', label: 'Dev. Period', tdClass: 'text-center' },
                { key: 'launchDt', label: 'Launching Date', tdClass: 'text-center', sortable: true },
                { key: 'estimatedYn', label: 'estimated YN', tdClass: 'text-center', sortable: true },
                { key: 'projects_stakeholder', label: 'Stakeholder', tdClass: 'text-center' },
                { key: 'projects_estimates', label: 'Estimates', tdClass: 'text-center' },
                { key: 'projects_clusters', label: 'Clusters', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center', sortable: true },
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
        projectsCondition: function() {
            return this.$store.state.project.projectsCondition
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
        this.initialize()
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        initialize() {
            this.getProjects()
            this.getCustomersAll()
        },
        getCustomersAll() {
            axios.get('/api/admin-customer/customers/all').then(response => {
                this.customersAll = response.data.content.resources
            })
        },
        getProjects() {
            this.$store.dispatch('project/getProjects', this.projectsCondition)
        },
        getProjectsByPage(pageNo) {
            this.$store.commit('project/setProjectsPageNo', pageNo)
            this.$store.dispatch('project/getProjects', this.projectsCondition)
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
        },
        sortingChanged(ctx) {
    		this.projectsCondition.sortBy = ctx.sortBy
			this.projectsCondition.sortDesc = ctx.sortDesc
			this.$store.dispatch('project/getProjects', this.projectsCondition)
		}
    }
}
</script>
