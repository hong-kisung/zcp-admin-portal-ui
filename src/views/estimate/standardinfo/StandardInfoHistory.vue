<template>
    <b-card>
        <h5 class="mb-2">History</h5>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="fields" :items="history">
                <template v-slot:cell(ipAllocation)="data">
                    {{ item.ipAllocation | formatNumber | toKRW}}
                </template>
                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'description' ? '40%' : '' }">
                </template>
            </b-table>
        </VuePerfectScrollbar>
    </b-card>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    data()  {
        return {
            fields: [
                { key: 'version', label: '버전', tdClass: 'text-center' },
                { key: 'platformCpuPerWorker', label: 'Platform Reserved CPU', tdClass: 'text-center' },
                { key: 'platformMemoryPerWorker', label: 'Platform Reserved Memory', tdClass: 'text-center' },
                { key: 'ibmDcRate', label: 'IBM 할인율(%)', tdClass: 'text-center' },
                { key: 'exchangeRate', label: '매매기준환율(₩)', tdClass: 'text-right', 
                  formatter: (value, key, item) => {
                  	return this.$options.filters.toKRW(this.$options.filters.formatNumber(item.exchangeRate))
                  }
                },
                { key: 'ipAllocation', label: 'IP Allocation Cost(₩)', tdClass: 'text-right', 
                  formatter: (value, key, item) => {
                  	return this.$options.filters.toKRW(this.$options.filters.formatNumber(item.ipAllocation))
                  }
                },
                { key: 'description', label: '설명' },
                { key: 'createdDt', label: '생성일시', tdClass: 'text-center' }
            ]
        }
    },
    components: {
        VuePerfectScrollbar
    },
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        },
		history: function() {
			return this.$store.state.estimate.generalHistory;
		}
    },
	created () {
		this.$store.dispatch('estimate/getGeneralHistory')
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>