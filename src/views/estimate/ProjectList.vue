<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
        	Estimates
        	<div class="float-right">
        		<b-button variant="success" class="mr-2" @click="addProject"><i class="icon-plus"></i> Project 추가</b-button>
            	<b-button v-b-toggle.collapse1 variant="secondary"><i class="fa fa-filter"></i> 검색상세</b-button>
            </div>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="customer">Customer</label>
                                <b-form-select id="customer" :plain="true" v-model="projectListCondition.filter.customerId">
                                 	<template v-slot:first>
        								<option :value="null">선택 </option>
      								</template>
                                	<option v-for="(item, index) in customers" :value="item.id">{{ item.name_kr }}</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="status">Status</label>
                                <b-form-select id="status" :plain="true" :options="projectStatus" v-model="projectListCondition.filter.status">
                                	<template v-slot:first>
        								<option :value="null">선택 </option>
      								</template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="cloud">Cloud</label>
                                <b-form-select id="cloud" :plain="true" :options="getCspTypes" v-model="projectListCondition.filter.cspCode">
                                	<template v-slot:first>
        								<option :value="null">선택 </option>
      								</template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group>
                            	<label for="estimateStatusActive">Activation</label>
                            	<b-form-radio-group v-model="projectListCondition.filter.activation" :options="activationOptions" name="estimateStatusActive">
                            	</b-form-radio-group>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-button variant="primary" block @click="search"><i class="fa fa-search"></i> 검색</b-button>
                        </b-col>
                    </b-form>
                </b-card>
            </b-collapse>
        </div>
        <b-card>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select :value="projectListCondition.perPage" id="perPageSelect" :options="pageOptions" @change="changePerPage" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination :value="projectListCondition.currentPage" :total-rows="totalRows" :per-page="projectListCondition.perPage" @change="changeCurrentPage" align="right" class="my-0"></b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="projects" :current-page="projectListCondition.currentPage" :per-page="projectListCondition.perPage" 
                	:filter="filterItem" :filter-function="filterTable"
                	:sort-by.sync="projectListCondition.sortBy" :sort-desc.sync="projectListCondition.sortDesc" @sort-changed="sortingChanged"
                >
                    <template slot="rowno" slot-scope="data">
                        {{ data.index + 1 }}
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
                    <template slot="activation" slot-scope="data">
                        {{ data.value === 1 ? 'Activate':'Inactivate' }}
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
        	filterItem: {
        		customerId: null,
        		status: null,
        		cspCode: null,
        		activation: null
        	},
        	activationOptions: [
        		{ text: 'Active', value: 1 },
        		{ text: 'Inactive', value: 0 },
        		{ text: 'All', value: null }
        	],
	       	projectDetailDialog: false,
	      	projectId: 0,
            fields: [
                { key: 'rowno', label: 'No', sortable: true },
                { key: 'customerNameKr', label: 'Customer', sortable: true },
                { key: 'name', label: 'Project', sortable: true },
                { key: 'status', label: 'Status', tdClass: 'text-center', sortable: true },
                { key: 'cloud', label: 'Cloud', tdClass: 'text-center', sortable: true },
                { key: 'createdDt', label: 'Estimate Sheet Created Date', tdClass: 'text-center', sortable: true },
                { key: 'updatedDt', label: 'Estimate Sheet Last Updated Date', tdClass: 'text-center', sortable: true },
                { key: 'button_volume', label: '용량산정', tdClass: 'text-center' },
                { key: 'button_cost', label: '원가견적', tdClass: 'text-center' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center', sortable: true }
            ],
            pageOptions: [10, 20, 30, 50, 100]
        }
    },
    computed: {
		customers: function() {
			return this.$store.state.estimate.customers
		},
		projectStatus: function() {
			return this.$store.state.estimate.projectStatusTypes
		},
		getCspTypes: function() {
			return this.$store.state.estimate.cspTypes
		},
		projects: function() {
			return this.$store.state.estimate.projects
		},
		totalRows: function() {
			return this.$store.state.estimate.projects.length
		},
		projectListCondition: function() {
			return this.$store.state.estimate.projectListCondition
		}
    },
 	created () {
		this.$store.dispatch('estimate/getProjects')
		this.$store.dispatch('estimate/getCustomers')
		this.$store.dispatch('estimate/getProjectStatus')
		this.$store.dispatch('estimate/getCspTypes')
	},
    methods: {
		addProject() {
			this.projectDetailDialog = true;
		},
		changeCurrentPage(value) {
			this.projectListCondition.currentPage = value
			this.$store.commit('estimate/setProjectListCondition', this.projectListCondition)
		},
		changePerPage(value) {
			this.projectListCondition.currentPage = 1
			this.projectListCondition.perPage = value
			this.$store.commit('estimate/setProjectListCondition', this.projectListCondition)
		},
		closeProjectDetailDialog() {
			this.projectDetailDialog = false
			this.$store.dispatch('estimate/getProjects')
		},
		filterTable(row, filter) {
			if(filter.customerId != null && row.customerId !== filter.customerId) {
				return false
			}
			if(filter.status != null && row.status !== filter.status) {
				return false
			}
			if(filter.cspCode != null && row.cspCode !== filter.cspCode) {
				return false
			}
			if(filter.activation != null && row.activation !== filter.activation) {
				return false
			}
			
			return true;
		},
		search() {
			this.projectListCondition.currentPage = 1
			Object.assign(this.filterItem, this.projectListCondition.filter)
			this.$store.commit('estimate/setProjectListCondition', this.projectListCondition)
		},
		sortingChanged(ctx) {
			this.projectListCondition.sortBy = ctx.sortBy
			this.projectListCondition.sortDesc = ctx.sortDesc
			this.$store.commit('estimate/setProjectListCondition', this.projectListCondition)
		}
    }
}
</script>