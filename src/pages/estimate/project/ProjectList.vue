<template>
  <section>
    <mdb-row>
      <mdb-col>
        <mdb-card>
          <mdb-card-body>
		    <mdb-tbl sm bordered hover responsive>
			    <colgroup>
			      <col>
			      <col width="150">
			      <col width="150">
			      <col width="150">
			      <!--col width="150"-->
			      <col width="180">
			    </colgroup>
		      <mdb-tbl-head>
		        <tr>
		          <th class="text-center">Project</th>
		          <th class="text-center">기본정보</th>
		          <th class="text-center">용량산정</th>
		          <th class="text-center">원가견적</th>
		          <!--th class="text-center">실견적</th-->
		          <th class="text-center">생성일시</th>
		        </tr>
		      </mdb-tbl-head>
		      <mdb-tbl-body>
				<tr v-for="(item) in projects">
				  <td class="text-left">{{ item.name }}</td>
				  <td class="text-center">
				  	<button type="button" class="btn btn-outline-indigo btn-sm m-0" @click="viewProject(item)">기본정보</button>
				  </td>
				  <td class="text-center">
				  	<button type="button" class="btn btn-outline-indigo btn-sm m-0" @click="goVolume(item)">용량산정</button>
				  </td>
				  <td class="text-center">
				  	<button type="button" class="btn btn-outline-indigo btn-sm m-0" @click="goCostEstimate(item)">원가견적</button>
				  </td>
				  <!--td class="text-center">
				  	<button type="button" class="btn btn-outline-indigo btn-sm m-0" @click="goActualEstimate(item)">실견적</button>
				  </td-->
				  <td class="text-center">{{ item.createdDt }}</td>
				</tr>
		      </mdb-tbl-body>
		    </mdb-tbl>
	        <mdb-row>
	          <mdb-col class="text-right">
		        <mdb-btn size="md" color="primary" @click="addProject">Project 추가</mdb-btn>                   
	          </mdb-col>
	        </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <projectDetail
    	v-bind:projectId="projectId"
    	v-bind:dialogVisible="projectDetailDialog"
    	v-on:fire-dialog-saved="saveProjectDetailDialog"
    	v-on:fire-dialog-closed="closeProjectDetailDialog"
    />
  </section>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import projectDetail from './ProjectDetail'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbTbl, mdbTblHead, mdbTblBody,
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
			this.$router.push({ name: 'project_volume', params: { projectId: project.id }});
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
