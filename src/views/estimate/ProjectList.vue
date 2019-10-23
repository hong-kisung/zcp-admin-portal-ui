<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
        	Estimates<b-button variant="success" size="sm" class="ml-2" @click="addProject"><i class="icon-plus"></i> Project 추가</b-button>
            <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="customer">Customer</label>
                                <b-form-select id="customer" :plain="true" :options="['선택', 'SKI', 'SKN', 'SK E&S', 'FSK', 'SK C&C']" value="선택"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="status">Status</label>
                                <b-form-select id="status" :plain="true" :options="['선택', 'Running', 'Proposal', 'Development']" value="선택"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="cloud">Cloud</label>
                                <b-form-select id="cloud" :plain="true" :options="['선택', 'IBM', 'Azure', 'AWS']" value="선택"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group>
                                <label for="estimateStatusActive">Estimate Status</label>
                                <div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatusActive" checked>
                                        <label class="custom-control-label" for="estimateStatusActive">Active</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatusInactive" checked>
                                        <label class="custom-control-label" for="estimateStatusInactive">Inactive</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="estimateStatusAll" checked>
                                        <label class="custom-control-label" for="estimateStatusAll">All</label>
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
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select :value="perPage" id="perPageSelect" :options="pageOptions" @change="changePerPage" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination :value="currentPage" :total-rows="totalRows" :per-page="perPage" @change="changeCurrentPage" align="right" class="my-0"></b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="projects" :current-page="currentPage" :per-page="perPage">
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
		    	v-on:fire-dialog-closed="closeProjectDetailDialog"
		    />
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import projectDetail from './project/ProjectDetail'

export default {
	mixins: [perfectScrollbar],
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
            pageOptions: [10, 20, 30, 50, 100]
        }
    },
    computed: {
		projects: function() {
			return this.$store.state.estimate.projects
		},
		totalRows: function() {
			return this.$store.state.estimate.projects.length
		},
		currentPage: function() {
			return this.$store.state.estimate.projectListCondition.currentPage
		}, 
		perPage: function() {
			return this.$store.state.estimate.projectListCondition.perPage
		}
    },
 	created () {
		this.$store.dispatch('estimate/getProjects')
	},
    methods: {
		addProject() {
			this.projectDetailDialog = true;
		},
		changeCurrentPage(value) {
			this.$store.commit('estimate/setProjectListCurrentPage', value)
		},
		changePerPage(value) {
			this.$store.commit('estimate/setProjectListCurrentPage', 1)
			this.$store.commit('estimate/setProjectListPerPage', value)
		},
		closeProjectDetailDialog() {
			this.projectDetailDialog = false
			this.$store.dispatch('estimate/getProjects')
		}
    }
}
</script>