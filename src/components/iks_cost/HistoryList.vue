<template>
        <v-card >
          <v-card-title class="title">History</v-card-title>
          <v-card-text>
			  <v-data-table
			    class="table"
				disable-initial-sort
			    :headers="headers"
			    :items="historyList"
			    :rows-per-page-items="[10, 25]">
			    <template v-slot:items="props">
			      <td class="text-xs-center">{{ props.item.version }}</td>
			      <td class="text-xs-left">{{ props.item.description }}</td>
			      <td class="text-xs-center">{{ props.item.createdDt }}</td>
			      <td class="text-xs-center">{{ props.item.created }}</td>
			      <td class="text-xs-center">
					<v-icon
					  small
					  class="mr-2"
					  @click="clickHistoryDetail(props.item)"
					>
					  search
					</v-icon>
				  </td>
			    </template>
			  </v-data-table>
          </v-card-text>
        </v-card>
</template>

<script>
export default {
	data: () => ({
		headers: [
			{ text: '버전', value: 'version', align: 'center', sortable: true, class:['grey lighten-1','body-2','text-weight-bold'] },
			{ text: '설명', value: 'description', align: 'center', sortable: false, class:['grey lighten-1','body-2','text-weight-bold'] },
			{ text: '생성일시', value: 'createdDt', align: 'center', sortable: true, class:['grey lighten-1','body-2','text-weight-bold'] },
			{ text: '생성자', value: 'created', align: 'center', sortable: true, class:['grey lighten-1','body-2','text-weight-bold'] },
			{ text: '상세보기', value: 'detail', align: 'center', sortable: false, class:['grey lighten-1','body-2','text-weight-bold'] }
		]
	}),
	props: [
		'historyList'
	],
	methods: {
		clickHistoryDetail (item) {
			this.$emit('fire-detail-clicked', item);
		}
	}
}
</script>

<style>
  .table {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>
