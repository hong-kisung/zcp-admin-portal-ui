<template>
  <v-container fluid grid-list-xl>
    <h2> 기준정보 </h2>
    <v-layout row wrap>
      <v-flex lg12>
		<general-detail v-bind:editable="true" 
						v-on:fire-saved="initialize"
						/>
      </v-flex>
      <v-flex lg12>
       <v-card >
         <v-card-title class="title">History</v-card-title>
         <v-card-text>
		  <v-data-table
			class="table"
			disable-initial-sort
			:headers="headers"
			:items="history"
			:rows-per-page-items="[10, 25]">
			<template v-slot:items="props">
			  <td class="text-xs-center">{{ props.item.version }}</td>
			  <td class="text-xs-right">{{ props.item.ibmDcRate }}%</td>
			  <td class="text-xs-right">{{ props.item.platformCpuPerWorker }}</td>
			  <td class="text-xs-right">{{ props.item.platformMemoryPerWorker }}</td>
			  <td class="text-xs-right">{{ props.item.exchangeRate }}원</td>
			  <td class="text-xs-right">{{ props.item.ipAllocation }}원</td>
			  <td class="text-xs-left">{{ props.item.description }}</td>
			  <td class="text-xs-center">{{ props.item.createdDt }}</td>
			</template>
		  </v-data-table>
         </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	data: () => ({
		history: [],
		headers: [
			{ text: 'Version', value: 'version', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: 'IBM 할인율', value: 'ibmDcRate', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: 'Platform CPU/Worker', value: 'platformCpuPerWorker', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: 'Platform Memory/Worker', value: 'platformMemoryPerWorker', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: '매매기준환율', value: 'exchangeRate', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: 'IP Allocation', value: 'ipAllocation', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: '설명', value: 'description', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] },
			{ text: '생성일시', value: 'createdDt', align: 'center', sortable: true, class:['grey lighten-1 body-2 text-weight-bold'] }
		]
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/general/history').then(response => {
				this.history = response.data;
			})
		}
	}
}
</script>

<style>
</style>
