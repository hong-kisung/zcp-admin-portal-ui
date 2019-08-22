<template>
  <b-card :header="title">
    <b-form>
      <b-form-group label="버전" label-for="version" :label-cols="4" >
        <b-form-input id="version" type="text" v-model="generalInfo.version" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="생성일시" label-for="createdDt" :label-cols="4" >
        <b-form-input id="createdDt" type="text" v-model="generalInfo.createdDt" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Platform Reserved CPU" label-for="platformCpuPerWorker" label-class="astertisk" :label-cols="4" >
        <b-form-input id="platformCpuPerWorker" type="number" v-model="generalInfo.platformCpuPerWorker"></b-form-input>
      </b-form-group>
      <b-form-group label="Platform Reserved Memory" label-for="platformMemoryPerWorker" label-class="astertisk" :label-cols="4" >
        <b-form-input id="platformMemoryPerWorker" type="number" v-model="generalInfo.platformMemoryPerWorker"></b-form-input>
      </b-form-group>
      <b-form-group label="IBM 할인율(%)" label-for="ibmDcRate" label-class="astertisk" :label-cols="4" >
        <b-form-input id="ibmDcRate" type="number" v-model="generalInfo.ibmDcRate"></b-form-input>
      </b-form-group>
      <b-form-group label="매매기준환율(₩)" label-for="exchangeRate" label-class="astertisk" :label-cols="4" >
        <b-form-input id="exchangeRate" type="number" v-model="generalInfo.exchangeRate"></b-form-input>
      </b-form-group>
      <b-form-group label="IP Allocation Cost(₩)" label-for="ipAllocation" label-class="astertisk" :label-cols="4" >
        <b-form-input id="ipAllocation" type="number" v-model="generalInfo.ipAllocation"></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="4" >
        <b-form-input id="description" type="text" v-model="generalInfo.description"></b-form-input>
      </b-form-group>
    </b-form>
    <b-row v-if="editable">
	  <b-col class="text-right">
	    <b-button size="md" variant="primary" class="m-1" v-if="editable" v-on:click="save">저장</b-button>
	  </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
	data: () => ({
		title: ''
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		generalInfo: function() {
			if(this.versionId) {
				return this.$store.state.estimate.generalHistoryDetail
			} else {
				return this.$store.state.estimate.general
			}
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.title = this.editable ? '기준정보의 최신 버전을 조회 및 수정합니다.' : '';
			
			if(this.versionId) {
				this.$store.dispatch('estimate/getGeneralHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getGeneral')
			}
		},
		getGeneralInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.generalInfo = response.data;
				} else {
					this.generalInto = {};
					alert('조회된 정보가 없습니다.');
				}
			}).catch(error => {
				this.generalInto = {};
				alert(error.response.data.message);
			})
		},
		save () {
			if(!this.generalInfo.platformCpuPerWorker) {
				alert('Platform Reserved CPU를 입력하세요');
				return;
			}
			if(!this.generalInfo.platformMemoryPerWorker) {
				alert('Platform Reserved Memory를 입력하세요');
				return;
			} 
			if(!this.generalInfo.ibmDcRate) {
				alert('IBM 할인율을 입력하세요');
				return;
			}
			if(!this.generalInfo.exchangeRate) {
				alert('매매기준환율을 입력하세요');
				return;
			}
			if(!this.generalInfo.ipAllocation) {
				alert('IP Allocation Cost를 입력하세요');
				return;
			}
			
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveGeneral', {generalInfo: this.generalInfo});
			}
		}
	}
}
</script>
