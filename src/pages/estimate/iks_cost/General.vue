<template>
<div class="animated fadeIn">
    <b-row>
      <b-col>
		<general-detail v-bind:editable="true" 
		/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card header="History">
          <div class="table-responsive-sm">
            <table class="table b-table table-striped table-hover table-bordered table-sm">
			    <colgroup>
			      <col width="80">
			      <col width="100">
			      <col width="180">
			      <col width="200">
			      <col width="120">
			      <col width="150">
			      <col>
			      <col width="180">
			    </colgroup>
              <thead>
		        <tr>
		          <th class="text-center">버전</th>
		          <th class="text-center">IBM 할인율</th>
		          <th class="text-center">Platform Resolved CPU</th>
		          <th class="text-center">Platform Resolved Memory</th>
		          <th class="text-center">매매기준환율</th>
		          <th class="text-center">IP Allocation Cost</th>
		          <th class="text-center">설명</th>
		          <th class="text-center">생성일시</th>
		        </tr>
              </thead>
              <tbody>
				<tr v-for="(item) in history">
				  <td class="text-center">{{ item.version }}</td>
				  <td class="text-center">{{ item.ibmDcRate }}%</td>
				  <td class="text-center">{{ item.platformCpuPerWorker }}</td>
				  <td class="text-center">{{ item.platformMemoryPerWorker }}</td>
				  <td class="text-right">{{ item.exchangeRate }} 원</td>
				  <td class="text-right">{{ item.ipAllocation }} 원</td>
				  <td class="text-left">{{ item.description }}</td>
				  <td class="text-center">{{ item.createdDt }}</td>
				</tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
</div>

</template>

<script>
import generalDetail from './GeneralDetail'

export default {
  	components: {
    	generalDetail
  	},
	data: () => ({
	}),
	computed: {
		history: function() {
			return this.$store.state.estimate.generalHistory;
		},
	},
	created () {
		this.$store.dispatch('estimate/getGeneralHistory')
	}
}
</script>
