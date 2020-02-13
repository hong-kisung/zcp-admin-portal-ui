<template>
    <div>
        <b-card>
            <h5 class="mb-3">
                <i class="icon-folder-alt mr-1"></i> Project

                <div class="float-right">
                    <b-button variant="success" size="sm" v-b-modal.project-add-modal v-if="costEstimateDetail.estimateId > 0"><i class="icon-plus"></i> Project 추가/삭제</b-button>
                </div>
            </h5>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="project_fields" :items="projectList">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'project_number' ? '4%' : '' }">
                    </template>
                    <template slot="project_number" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <template slot="status" slot-scope="data">
                        <b-badge :variant="projectStatus(data.item.status)">{{data.item.status}}</b-badge>
                    </template>
                    <template slot="project_volume" slot-scope="data">
                        <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.id, name: data.item.name, active: 'Sizing' } }">
                            <b-button variant="outline-primary" size="sm" v-b-modal.iks-vm-modal><i class="icon-info"></i> {{data.item.project_volume}}</b-button>
                        </router-link>
                    </template>
                </b-table>
            </VuePerfectScrollbar>

            <!-- modal : Project Add -->
            <b-modal id="project-add-modal" title="Project Selection" centered @hidden="closeProjectDialog" @ok="saveProjectDialog">
                <b-form>
                    <b-form-group label="Project" label-for="projectSelect" :label-cols="3" label-class="required">
                    	<multiselect v-model="selectedProjectList" :options="allProjectList" :multiple="true" label="name" track-by="name" placeholder="Project를 선택해주세요."></multiselect>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Project Add -->
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import variant from '@/mixins/variant'
import Multiselect from 'vue-multiselect'

export default {
	mixins: [perfectScrollbar, variant],
    components: {
        VuePerfectScrollbar, Multiselect
    },
    data()  {
        return {
            project_fields: [
                { key: 'project_number', label: 'No', tdClass: 'text-center' },
                { key: 'name', label: 'Project' },
                { key: 'status', label: 'Status', tdClass: 'text-center' },
                { key: 'project_volume', label: '용량산정', tdClass: 'text-center' }
            ],
            projectList: [],
            allProjectList: [],
            selectedProjectList: []
        }
    },
    computed: {
    	costEstimateDetail: function() {
    		return this.$store.state.estimate.costEstimateDetail
    	},
    },
    created() {
    	if(this.costEstimateDetail.estimateId > 0) {
    		this.getProjectList()
    	}
    	if(this.costEstimateDetail.editable) {
    		this.getAllProjectList()
    	}
    },
    methods: {
    	getProjectList() {
			this.$http.get('/api/estimate/cost-estimates/' + this.costEstimateDetail.estimateId + '/projects').then(response => {
				this.projectList = response.data
				this.selectedProjectList = this.projectList
			}).catch(error => {
			})
    	},
    	getAllProjectList() {
			this.$http.get('/api/estimate/projects').then(response => {
				this.allProjectList = response.data
			}).catch(error => {
			})
    	},
    	saveProjectDialog() {
    		let projectIds = new Array()
    		for(let project of this.selectedProjectList) {
    			projectIds.push(project.id)
    		}
			this.$zadmin.confirm('저장하시겠습니까?', (result) => {
				if(result) {
					this.$http.put('/api/estimate/cost-estimates/' + this.costEstimateDetail.estimateId + '/projects', projectIds).then(response => {
						this.$zadmin.alert('저장되었습니다.')
						this.getProjectList()
					})
				}
			})
    	},
    	closeProjectDialog() {
    		this.selectedProjectList = this.projectList
    	},
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>