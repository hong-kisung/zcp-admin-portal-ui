<template>
<b-card header="History">
  <b-row>
    <b-col>
      <div class="table-responsive-sm">
        <table class="table b-table table-striped table-hover table-bordered table-sm">
		  <colgroup>
		    <col width="80">
		    <col>
		    <col width="180">
		    <col width="100">
		    <col width="100">
		  </colgroup>
          <thead>
	        <tr>
	          <th class="text-center">버전</th>
	          <th class="text-center">설명</th>
	          <th class="text-center">생성일시</th>
	          <th class="text-center">생성자</th>
	          <th class="text-center">상세보기</th>
	        </tr>
          </thead>
          <tbody>
			<tr v-for="(item) in historyList">
			  <td class="text-center">{{ item.version }}</td>
			  <td class="text-center">{{ item.description }}</td>
			  <td class="text-center">{{ item.createdDt }}</td>
			  <td class="text-center">{{ item.created }}</td>
			  <td class="text-center">
			    <b-link @click="clickHistoryDetail(item)">
			      <i class="fa fa-search fa-sm"></i>
                </b-link>
			  </td>
			</tr>
          </tbody>
        </table>
      </div>
    </b-col>
  </b-row>
</b-card>
</template>

<script>
export default {
	data: () => ({
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
