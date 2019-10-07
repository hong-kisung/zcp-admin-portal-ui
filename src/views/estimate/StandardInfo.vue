<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Standard Infomation</h1>
        <h2 class="display-sub mb-3">기준정보의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <standard-info-detail v-bind:generalInfo="generalInfo"
            					 v-bind:editable="true"
            />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-on:click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
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
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import StandardInfoDetail from './StandardInfoDetail'

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
            ],
            items: [
            ]
        }
    },
    components: {
        VuePerfectScrollbar, StandardInfoDetail
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
 		generalInfo: function() {
			return this.$store.state.estimate.general
        },
		history: function() {
			return this.$store.state.estimate.generalHistory;
		}
    },
	created () {
		this.$store.dispatch('estimate/getGeneral')
		this.$store.dispatch('estimate/getGeneralHistory')
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
		save () {
			if(!this.generalInfo.platformCpuPerWorker) {
				this.$zadmin.alert('Platform Reserved CPU를 입력하세요');
				return;
			}
			if(!this.generalInfo.platformMemoryPerWorker) {
				this.$zadmin.alert('Platform Reserved Memory를 입력하세요');
				return;
			} 
			if(!this.generalInfo.ibmDcRate) {
				this.$zadmin.alert('IBM 할인율을 입력하세요');
				return;
			}
			if(!this.generalInfo.exchangeRate) {
				this.$zadmin.alert('매매기준환율을 입력하세요');
				return;
			}
			if(!this.generalInfo.ipAllocation) {
				this.$zadmin.alert('IP Allocation Cost를 입력하세요');
				return;
			}
			
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveGeneral', {generalInfo: this.generalInfo});
			})
		}
    }
}
</script>