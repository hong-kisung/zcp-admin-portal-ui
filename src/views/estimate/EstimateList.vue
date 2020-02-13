<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Estimates <b-badge class="m-1" variant="danger">{{ totalRows }}</b-badge>
            <div class="float-right">
                <b-button variant="success" class="mr-2" @click="addEstimate"><i class="icon-plus"></i> 견적서 추가</b-button>
                <b-button v-b-toggle.collapse1 variant="secondary"><i class="fa fa-filter"></i> 검색상세</b-button>
            </div>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form @submit="search" class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="estName">Name</label>
                                <b-form-input type="text" v-model="estimateListCondition.filter.name" id="estName"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="contractCloud">계약 Cloud</label>
                                <b-form-select id="contractCloud" :plain="true" :options="getCspTypes" v-model="estimateListCondition.filter.contractCspCode">
                                	<template v-slot:first>
        								<option :value="null">전체 </option>
      								</template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="estimateActivation">Activation</label>
                                <div>
                                    <b-form-radio-group v-model="estimateListCondition.filter.activationYn" :options="activationOptions" name="estimateStatusActive">
                            		</b-form-radio-group>
                                </div>
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
                    <b-form-select :value="estimateListCondition.perPage" id="perPageSelect" :options="pageOptions" @change="changePerPage" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination :value="estimateListCondition.currentPage" :total-rows="totalRows" :per-page="estimateListCondition.perPage" @change="changeCurrentPage" align="right" class="my-0"></b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="estimateList" 
                	:current-page="estimateListCondition.currentPage" :per-page="estimateListCondition.perPage" 
                	:filter="filterItem" :filter-function="filterTable"
                	:sort-by.sync="estimateListCondition.sortBy" 
                	:sort-desc.sync="estimateListCondition.sortDesc" 
                	@filtered="onFiltered"
                	@sort-changed="sortingChanged"
                >
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '4%' : '' }">
                    </template>
                    <template slot="rowno" slot-scope="data">
                        {{ (totalRows - ((estimateListCondition.currentPage - 1) * estimateListCondition.perPage)) - data.index }}
                    </template>
                    <template slot="name" slot-scope="data">
                        <router-link :to="{name: 'CostEstimateDetail', params: {estimateId: data.item.id, editable: true}}">{{data.item.name}}</router-link>
                    </template>
                    <template slot="contractCspCode" slot-scope="data">
                    	<router-link :to="{ name: 'CostEstimateCloudDetail', params: {estimateId:data.item.id, cspCode: data.item.contractCspCode, estimateCspId: data.item.contractEstimateCspId}}">
                        	<img v-if="data.item.contractCspCode" :src="cloudImageUrl(data.item.contractCspCode)" v-b-tooltip :title="cloudImageAlt(data.item.contractCspCode)" width="22" height="22" class="mx-1">
                        </router-link>
                    </template>
                    <template slot="estimateCspCodes" slot-scope="data">
                    	<template v-for="(cspCode) in data.item.estimateCspCodes">
                    		<router-link :to="{ name: 'CostEstimateCloudDetail', params: {estimateId:data.item.id, cspCode: cspCode}}">
                    			<img :src="cloudImageUrl(cspCode)" v-b-tooltip :title="cloudImageAlt(cspCode)" width="22" height="22" class="mx-1">
                    		</router-link>
                    	</template>
                    </template>
                    <template slot="project_count" slot-scope="data">
                        <b-link :id="getPopoverId(data.item.id)">{{data.item.projects && data.item.projects.length > 0 ? data.item.projects.length:''}}</b-link>
		              	<b-popover :target="getPopoverId(data.item.id)" v-if="data.item.projects && data.item.projects.length > 0" triggers="hover focus" placement="auto">
			          		<li v-for="(projectName) in data.item.projects">{{ projectName }}</li>
		              	</b-popover>
                    </template>
                    <template slot="activationYn" slot-scope="data">
                        <label class="mx-1 mb-0 switch switch-label switch-success">
                            <input class="switch-input" type="checkbox" v-model="data.item.activationYn" @click="updateActivationYn(data.item)" true-value="Y" false-value="N">
                            <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                        </label>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import variant from '@/mixins/variant'

export default {
	mixins: [perfectScrollbar, variant],
    components: {
        VuePerfectScrollbar
    },
    data()  {
        return {
            fields: [
                { key: 'rowno', label: 'No', tdClass: 'text-center' },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'contractCspCode', label: '계약 Cloud', tdClass: 'text-center', sortable: true },
                { key: 'estimateCspCodes', label: '견적 Clouds', tdClass: 'text-center' },
                { key: 'project_count', label: 'Project Count', tdClass: 'text-center', sortable: true},
                { key: 'customerNameKr', label: 'Customer', tdClass: 'text-center', sortable: true },
                { key: 'estimateCreatedDt', label: 'Estimate Sheet Created Date', tdClass: 'text-center', sortable: true },
                { key: 'estimateLastUpdatedDt', label: 'Estimate Sheet Last Updated Date', tdClass: 'text-center', sortable: true },
                { key: 'activationYn', label: 'Activate', tdClass: 'text-center' }
            ],
            estimateList: [],
        	filterItem: {
        		name: null,
        		contractCspCode: null,
        		activationYn: null
        	},
        	activationOptions: [
        		{ text: 'Active', value: 'Y' },
        		{ text: 'Inactive', value: 'N' },
        		{ text: 'All', value: null }
        	],
            totalRows: 0,
            pageOptions: [10, 20, 30, 50, 100],
        }
    },
    computed: {
		getCspTypes: function() {
			return this.$store.state.estimate.cspTypes
		},
		estimateListCondition: function() {
			return this.$store.state.estimate.estimateListCondition
		}
    },
  	created () {
		this.getEstimates()
		this.$store.dispatch('estimate/getCspTypes')
		Object.assign(this.filterItem, this.estimateListCondition.filter)
	},
    methods: {
    	getEstimates() {
			this.$http.get('/api/estimate/cost-estimates').then(response => {
				this.estimateList = response.data
			}).catch(error => {
				console.log('failed get getProjects')
			})
    	},
    	getPopoverId(id) {
    		return '"popover-' + id
    	},
		changeCurrentPage(value) {
			this.estimateListCondition.currentPage = value
			this.$store.commit('estimate/setEstimateListCondition', this.estimateListCondition)
		},
		changePerPage(value) {
			this.estimateListCondition.currentPage = 1
			this.estimateListCondition.perPage = value
			this.$store.commit('estimate/setEstimateListCondition', this.estimateListCondition)
		},
		search() {
			this.estimateListCondition.currentPage = 1
			Object.assign(this.filterItem, this.estimateListCondition.filter)
			this.$store.commit('estimate/setEstimateListCondition', this.estimateListCondition)
		},
		filterTable(row, filter) {
			if(filter.name != null && !row.name.toLowerCase().includes(filter.name.toLowerCase())) {
				return false
			}
			if(filter.contractCspCode != null && row.contractCspCode !== filter.contractCspCode) {
				return false
			}
			if(filter.activationYn != null && row.activationYn !== filter.activationYn) {
				return false
			}
			
			return true;
		},
 		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
		},
		sortingChanged(ctx) {
			this.estimateListCondition.sortBy = ctx.sortBy
			this.estimateListCondition.sortDesc = ctx.sortDesc
			this.$store.commit('estimate/setEstimateListCondition', this.estimateListCondition)
		},
 		updateActivationYn(item) {
			let changedActivation;
			if(item.activationYn === 'Y') {
				changedActivation = 'N'
			} else {
				changedActivation ='Y'
			}
			
			this.$http.put('/api/estimate/cost-estimates/' + item.id + '/activation', {id: item.id, activationYn: changedActivation}).then(response => {
				this.$zadmin.alert('변경되었습니다.')
				this.getEstimates()
			}).catch(error => {
                console.log(error)
            })
		},
		addEstimate() {
			this.$router.push({ name: 'CostEstimateDetail', params: {estimateId: null, editable: true }});
		}
    }
}
</script>