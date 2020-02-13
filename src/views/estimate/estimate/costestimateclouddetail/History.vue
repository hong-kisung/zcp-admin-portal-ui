<template>
    <div>
        <b-tabs>
            <b-tab>
                <template slot="title">
                    <b-link href="#" @click="showHistory()"><i class="fa fa-close"></i></b-link>
                </template>
                <b-list-group class="list-group-accent">
                    <b-list-group-item class="list-group-item-accent-primary bg-light text-center font-weight-bold text-muted text-uppercase">
                        <i class="fa fa-history"></i> 원가견적 History
                    </b-list-group-item>
                    <b-list-group-item href="#" class="list-group-item-accent-secondary list-group-item-divider" @click="viewEstimate(item)" v-for="(item, index) in history" :key="item.id">
                        <div>
                        	Version : {{ item.version + (item.label ? ' - ' + item.label : '') }}
                        	<b-badge variant="success" v-if="item.contractVersionYn == 'Y'">계약된 버전입니다</b-badge>
                        </div>
                        <small class="text-muted">
                            <i class="icon-calendar"></i>&nbsp;&nbsp;{{ item.createdDt }}
                        </small>
                        <div class="text-muted">{{ item.description }}</div>
                    </b-list-group-item>
                </b-list-group>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    components: {
    },
    computed: {
		history: function() {
			return this.$store.state.estimate.projectCostEstimateHistory
		}
    },
    methods: {
        showHistory () {
            document.body.classList.toggle("local-aside-show")
        },
		viewEstimate(item) {
			this.$zadmin.confirm('원가견적 화면에서 선택한 버전이 조회됩니다. \n저장하지 않은 내용이 있을 경우 취소 버튼을 클릭하세요.', (result) => {
				if(result) {
					this.$store.dispatch('estimate/getProjectCostEstimateHistoryDetail', {estimateId: item.estimateId, cspCode: item.cspCode, estimateCspId: item.id})
					this.$store.commit('estimate/setProjectCostEstimateHistoryDetailStatus', true)
				}
			})
		}
    }
}
</script>