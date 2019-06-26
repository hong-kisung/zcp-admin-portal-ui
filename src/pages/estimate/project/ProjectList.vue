<template>
<div class="animated fadeIn">
  <b-card>
    <b-row>
      <b-col>
        <div class="table-responsive-sm">
          <table class="table b-table table-striped table-hover table-bordered table-sm">
		    <colgroup>
		      <col>
		      <col width="150">
		      <col width="150">
		      <col width="150">
		      <!--col width="150"-->
		      <col width="180">
		    </colgroup>
          <thead>
	        <tr>
	          <th class="text-center">Project명</th>
	          <th class="text-center">기본정보</th>
	          <th class="text-center">용량산정</th>
	          <th class="text-center">원가견적</th>
	          <!--th class="text-center">실견적</th-->
	          <th class="text-center">생성일시</th>
	        </tr>
          </thead>
          <tbody>
			<tr v-for="(item) in projects">
			  <td class="text-left">{{ item.name }}</td>
			  <td class="text-center">
			  	<b-button variant="outline-primary" size="sm" @click="viewProject(item)">기본정보</b-button>
			  </td>
			  <td class="text-center">
			  	<b-button variant="outline-primary" size="sm" @click="goVolume(item)">용량산정</b-button>
			  </td>
			  <td class="text-center">
			  	<b-button variant="outline-primary" size="sm" @click="goCostEstimate(item)">원가견적</b-button>
			  </td>
			  <!--td class="text-center">
			  	<b-button variant="outline-primary" size="sm" @click="goActualEstimate(item)">실견적</b-button>
			  </td-->
			  <td class="text-center">{{ item.createdDt }}</td>
			</tr>
          </tbody>
          </table>
        </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button variant="primary" size="sm" @click="addProject">Project 추가</b-button>
        </b-col>
      </b-row>
  </b-card>
    <projectDetail
    	v-bind:projectId="projectId"
    	v-bind:dialogVisible="projectDetailDialog"
    	v-on:fire-dialog-saved="saveProjectDetailDialog"
    	v-on:fire-dialog-closed="closeProjectDetailDialog"
    />
</div>
</template>

<script>
import projectDetail from './ProjectDetail'

export default {
  	components: {
  		projectDetail
  	},
	data: () => ({
      	projects: [],
      	projectDetailDialog: false,
      	projectId: 0
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/estimate/project').then(response => {
				this.projects = response.data
			})
		},
		addProject() {
			this.projectId = 0;
			this.projectDetailDialog = true;
		},
		viewProject(project) {
			this.projectId = project.id;
			this.projectDetailDialog = true;
		},
		saveProjectDetailDialog() {
			this.projectDetailDialog = false;
			this.initialize();
		},
		closeProjectDetailDialog() {
			this.projectDetailDialog = false;
		},
		goVolume(project) {
			this.$router.push({ name: 'ProjectVolume', params: { projectId: project.id }});
		},
		goCostEstimate(project) {
			this.$router.push({ name: 'project_cost_estimate', params: { projectId: project.id, editable: true }});
		},
		goActualEstimate(project) {
			this.$router.push({ name: 'project_actual_estimate', params: { projectId: project.id }});
		}
	}
}
</script>

<style>
</style>
