<template>
<b-list-group class="list-group-accent">
	<b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
		원가 견적 History
	</b-list-group-item>
	<b-list-group-item @click="viewEstimate(item)" class="list-group-item-divider" v-for="(item, index) in history" :key="item.id">
		<div>버전: {{ item.version }}
			<small class="text-muted float-right mt-1"">{{ item.createdDt }}</small>
		</div>
		<small class="text-muted mr-3">{{ item.label }}</small>
	</b-list-group-item>
</b-list-group>
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
