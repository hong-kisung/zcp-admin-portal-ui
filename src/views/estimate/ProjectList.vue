<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Estimates</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" @click="addProject"><i class="icon-plus"></i> Project 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="projects">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '' : '15%' }">
                    </template>
                    <template slot="button_basic" slot-scope="data">
                        <b-button variant="outline-info" size="sm" @click="viewProject(data.item)"><i class="icon-info"></i> 기본정보</b-button>
                    </template>
                    <template slot="button_volume" slot-scope="data">
                        <router-link :to="{ name: 'ProjectVolume', params: { projectId: data.item.id, projectName: data.item.name } }">
                            <b-button variant="outline-success" size="sm"><i class="icon-info"></i> 용량산정</b-button>
                        </router-link>
                    </template>
                    <template slot="button_cost" slot-scope="data">
                        <router-link :to="{ name: 'ProjectCostEstimate', params: { projectId: data.item.id, projectName: data.item.name, editable: true } }">
                            <b-button variant="outline-warning" size="sm"><i class="icon-info"></i> 원가견적</b-button>
                        </router-link>
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
import projectDetail from './project/ProjectDetail'

export default {
    components: {
        VuePerfectScrollbar, projectDetail
    },
    data()  {
        return {
	       	projectDetailDialog: false,
	      	projectId: 0,
            fields: [
                { key: 'name', label: 'Project명' },
                { key: 'button_basic', label: '기본정보', tdClass: 'text-center' },
                { key: 'button_volume', label: '용량산정', tdClass: 'text-center' },
                { key: 'button_cost', label: '원가견적', tdClass: 'text-center' },
                { key: 'createdDt', label: '생성일시', tdClass: 'text-center' }
            ]
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