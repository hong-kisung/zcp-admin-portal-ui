<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
        	Estimates
            <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
				            <b-form-group label="Customer" label-for="customerId" :label-cols="3">
						        <b-form-select id="customerId" :plain="true">
						        </b-form-select>
				            </b-form-group>
                        </b-col>
                        <b-col lg="4">
				            <b-form-group label="Status" label-for="status" :label-cols="3">
						        <b-form-select id="status" :plain="true">
						        </b-form-select>
				            </b-form-group>
                        </b-col>
                        <b-col lg="4">
				            <b-form-group label="Cloud" label-for="cloudId" :label-cols="3">
						        <b-form-select id="cloudId" :plain="true">
						        </b-form-select>
				            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group>
                                <label for="estimateStatus">Estimate Status</label>
                                <div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatus" checked>
                                        <label class="custom-control-label" for="orderRequest">active</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatus" checked>
                                        <label class="custom-control-label" for="orderProgress">inactive</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatus" checked>
                                        <label class="custom-control-label" for="orderComplete">all</label>
                                    </div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-button variant="primary" block><i class="fa fa-search"></i> 검색</b-button>
                        </b-col>
                    </b-form>
                </b-card>
            </b-collapse>
        </div>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" @click="addProject"><i class="icon-plus"></i> Project 추가</b-button>
            </b-form-group>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select v-model="perPage" id="perPageSelect" :options="pageOptions" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="my-0"></b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="projects" :current-page="currentPage" :per-page="perPage">
                    <template slot="button_basic" slot-scope="data">
                        <b-button variant="outline-info" size="sm" @click="viewProject(data.item)"><i class="icon-info"></i> 기본정보</b-button>
                    </template>
                    <template slot="button_volume" slot-scope="data">
                        <router-link :to="{ name: 'ProjectVolume', params: { projectId: data.item.id } }">
                            <b-button variant="outline-success" size="sm"><i class="icon-info"></i> 용량산정</b-button>
                        </router-link>
                    </template>
                    <template slot="button_cost" slot-scope="data">
                        <router-link :to="{ name: 'ProjectCostEstimate', params: { projectId: data.item.id, editable: true } }">
                            <b-button variant="outline-warning" size="sm"><i class="icon-info"></i> 원가견적</b-button>
                        </router-link>
                    </template>
                    <template slot="button_activate">
                        <c-switch class="mx-1" color="success" checked label />
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
		    <projectDetail
		    	v-bind:dialogVisible="projectDetailDialog"
		    	v-on:fire-dialog-closed="projectDetailDialog = false"
		    />
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import projectDetail from './project/ProjectDetail'

export default {
    components: {
        VuePerfectScrollbar, cSwitch, projectDetail
    },
    data()  {
        return {
	       	projectDetailDialog: false,
	      	projectId: 0,
            fields: [
                { key: 'rowno', label: 'No' },
                { key: 'customerNameKr', label: 'Customer' },
                { key: 'name', label: 'Project' },
                { key: 'status', label: 'Status', tdClass: 'text-center' },
                { key: 'cloud', label: 'Cloud', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Estimate Sheet Created Date', tdClass: 'text-center' },
                { key: 'updatedDt', label: 'Estimate Sheet Last Updated Date', tdClass: 'text-center' },
                { key: 'button_volume', label: '용량산정', tdClass: 'text-center' },
                { key: 'button_cost', label: '원가견적', tdClass: 'text-center' },
                { key: 'button_activate', label: 'Activate', tdClass: 'text-center' }
            ],
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30, 50, 100]
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
			return this.$store.state.estimate.projects
		},
		totalRows: function() {
			return this.$store.state.estimate.projects.length
		}
    },
 	created () {
		this.$store.dispatch('estimate/getProjects')
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
		addProject() {
			this.$store.commit('estimate/setProject', {})
			this.projectDetailDialog = true;
		},
		viewProject(project) {
			this.$store.dispatch('estimate/getProject', {projectId: project.id})
			this.projectDetailDialog = true;
		}
    }
}
</script>