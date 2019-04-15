<template>
	<div>
        <v-card>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="history"
				item-key="id"
				class="elevation-1"
				:rows-per-page-items="[10, 25]"
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass" rowspan="2">버전</th>
					<th :class="headerClass" rowspan="2">라벨</th>
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
				  <tr @click="viewEstimate(props.item)">
				    <td class="text-xs-center">{{ props.item.version }}</td>
				    <td class="text-xs-center">{{ props.item.label }}</td>
				    <td class="text-xs-right">{{ props.item.cloudZServiceMonthlyPrice | formatNumber }}</td>
				    <td class="text-xs-right">{{ props.item.cloudZServiceYearlyPrice | formatNumber }}</td>
				    <td class="text-xs-right">{{ props.item.storageServiceMonthlyPrice | formatNumber }}</td>
				    <td class="text-xs-right">{{ props.item.storageServiceYearlyPrice | formatNumber }}</td>
				    <td class="text-xs-center">{{ props.item.createdDt }}</td>
				  </tr>
				</template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="8">
        			{{ no_data_text }}
      			  </td>
    			</template>
			</v-data-table>
	      </v-card-text>
 	      <v-card-actions>
	      </v-card-actions>
        </v-card>
        
	 	<v-dialog v-model="detailDialog" max-width="1800px">
          <v-card>
		    <v-card-text>
		      <v-container fluid grid-list-xl>
		  		<project-estimate 
		  			v-bind:projectId="projectId"
		  			v-bind:estimateId="estimateId"
		  			v-bind:editable="false" 
		  			v-on:fire-dialog-closed="closeDetailDialog"
		  			v-on:fire-removed="removeHistory"
		 		/>
		      </v-container>
	        </v-card-text>
          </v-card>
		</v-dialog>
    </div>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
	  	no_data_text: 'No data available',
      	history: [],
      	detailDialog: false,
      	estimateId: 0
	}),
	props: [
		'projectId',
		'refreshStatus'
	],
	watch: {
		refreshStatus: function() {
			if(this.refreshStatus) {
				this.initialize();
				this.$emit('fire-refresh-finished');
			}
		}
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize() {
			this.$http.get('/project/' + this.projectId + '/estimate/history').then(response => {
				this.history = response.data
			})
		},
		viewEstimate(item) {
			this.estimateId = item.id; 
			this.detailDialog = true;
		},
		closeDetailDialog() {
			this.detailDialog = false;
		},
		removeHistory() {
			this.closeDetailDialog();
			this.initialize();
		}
	}
}
</script>

<style>
</style>
