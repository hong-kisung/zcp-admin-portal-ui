<template>
  <b-tabs>
    <b-tab title="원가 견적 History">
		<b-list-group class="list-group-accent">
			<b-list-group-item href="#" @click="viewEstimate(item)" class="list-group-item-divider" v-for="(item, index) in history" :key="item.id">
		      <div class="d-flex w-100 justify-content-between">
		        <p class="mb-1">버전: {{ item.version }}</p>
		        <small class="text-muted">{{ item.createdDt }}</small>
		      </div>
		      <small class="text-muted mr-3">{{ item.label }}</small>
			</b-list-group-item>
		</b-list-group>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
	data: () => ({
	}),
	computed: {
		history: function() {
			return this.$store.state.estimate.projectCostEstimateHistory
		}
	},
	methods: {
		viewEstimate(item) {
			if(confirm('원가견적 화면에서 선택한 버전이 조회됩니다. \n저장하지 않은 내용이 있을 경우 취소 버튼을 클릭하세요.')) {
				this.$store.dispatch('estimate/getProjectCostEstimateHistoryDetail', {projectId: this.$router.currentRoute.params.projectId, estimateId: item.id})
				this.$store.commit('estimate/setProjectCostEstimateHistoryDetailStatus', true)
			}
		}
	}
}
</script>
