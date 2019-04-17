<template>
  <v-container fluid grid-list-xl>
    <h2> 원가 견적 </h2>
    <v-layout row wrap>
      <v-flex lg12>
        <v-card>
		  <v-card-title class="title">Project 목록</v-card-title>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="projects"
				class="elevation-1"
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass" rowspan="2">Project</th>
					<th :class="headerClass" rowspan="2">견적서 버전</th>
					<th :class="headerClass" colspan="2">Cloud Z Service 비용</th>
					<th :class="headerClass" colspan="2">Application Storage Service 비용</th>
					<th :class="headerClass" rowspan="2">생성일시</th>
				  </tr>
				  <tr>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				<tr @click="viewProject(props.item)">
				  <td class="text-xs-center">{{ props.item.name }}</td>
				  <td class="text-xs-center">{{ props.item.estimateVersion }}</td>
				  <td class="text-xs-right">{{ props.item.cloudZServiceMonthlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.cloudZServiceYearlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.storageServiceMonthlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.storageServiceYearlyPrice | formatNumber }}</td>
				  <td class="text-xs-center">{{ props.item.createdDt }}</td>
				</tr>
				</template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="7">
        			{{ no_data_text }}
      			  </td>
    			</template>
			</v-data-table>
	      </v-card-text>
 	      <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="addProject">Project 추가</v-btn>
	      </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
	  	no_data_text: 'No data available',
      	projects: []
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/project').then(response => {
				this.projects = response.data
			})
		},
		addProject() {
			this.$router.push({ name: 'project_new'});
		},
		viewProject(project) {
			this.$router.push({ name: 'project_detail', params: { projectId: project.id }});
		}
	}
}
</script>

<style>
</style>
