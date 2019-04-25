<template>
	<ValidationObserver ref="obs">
        <v-card slot-scope="{ invalid, validated }">
		  <v-card-title>{{ formTitle }}</v-card-title>
		  <v-card-text>
		    	<v-alert v-model="alert" dismissible type="info">{{alertMessage}}</v-alert>
				<v-layout wrap>
				  <v-flex xs12 sm6 md6>
					<v-text-field v-model="generalInfo.version" label="버전" value="" readonly />
				  </v-flex>
				  <v-flex xs12 sm6 md6>
					<v-text-field v-model="generalInfo.createdDt" label="생성일시" value="" readonly />
				  </v-flex>
				  <v-flex xs12 sm6 md6>
					<VTextFieldWithValidation rules="required|numeric" data-vv-name="ibmDcRate" v-model="generalInfo.ibmDcRate" label="IBM 할인율" suffix="%" class="right-input" :readonly="!editable" />
				  </v-flex>
				  <v-flex xs12 sm6 md6>
					<VTextFieldWithValidation rules="required|numeric" data-vv-name="exchangeRate" v-model="generalInfo.exchangeRate" label="매매기준환율" class="right-input" suffix="원" :readonly="!editable" />
				  </v-flex>
				  <v-flex xs12 sm6 md6>
					<VTextFieldWithValidation rules="required|numeric" data-vv-name="platformCpuPerWorker" v-model="generalInfo.platformCpuPerWorker" label="Platform Resolved CPU" class="right-input" :readonly="!editable" />
				  </v-flex>
				  <v-flex xs12 sm6 md6>
					<VTextFieldWithValidation rules="required|numeric" data-vv-name="platformMemoryPerWorker" v-model="generalInfo.platformMemoryPerWorker" label="Platform Resolved Memory" class="right-input" :readonly="!editable" />
				  </v-flex>
				  <v-flex xs12 sm12 md12>
					<VTextFieldWithValidation rules="required|numeric" data-vv-name="ipAllocation" v-model="generalInfo.ipAllocation" label="IP Allocation Cost" class="right-input" suffix="원" :readonly="!editable" />
				  </v-flex>
				  <v-flex xs12 sm12 md12>
					<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="generalInfo.description" label="설명" :readonly="!editable" />
				  </v-flex>
				</v-layout>
		  </v-card-text>
		  <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" v-if="editable" v-on:click="save" v-bind:disabled="invalid">저장</v-btn>
		    <v-btn color="blue darken-1" v-if="!editable" flat @click="closeDetailDialog">닫기</v-btn>
		  </v-card-actions>
		</v-card>
	</ValidationObserver>
</template>

<script>
export default {
	data: () => ({
		generalInfo: {},
		alert: false,
		alertMessage: ''
	}),
	props: [
		'versionId',
		'editable'
	],
	watch: {
		versionId: function() {
			if(this.versionId <= 0) {
				this.generalInfo = {};
				return;
			}
			
			this.getGeneralInfo('/api/general/history/' + this.versionId);
		}
	},
	computed: {
		formTitle() {
			return this.editable ? '기준정보의 최신 버전을 조회 및 수정합니다.' : '기준정보';
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.versionId == undefined) {
				this.getGeneralInfo('/api/general');
			}
		},
		getGeneralInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.generalInfo = response.data;
					this.alert = false;
					this.alertMessage = '';
				} else {
					this.printErrorMessage();
				}
			}).catch(error => {
				this.printErrorMessage(error.response.data.message);
			})
		},
		printErrorMessage(message) {
			this.generalInto = {};
			this.alert = true;
			this.alertMessage = message == undefined ? '조회된 기준정보 데이터가 없습니다.':message;
		},
		save () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if(confirm('변경된 내용을 저장하시겠습니까?')) {
						this.$http.put('/api/general', this.generalInfo).then(response => {
							alert("저장되었습니다.");
							this.$refs.obs.reset();
							this.initialize();
							this.$emit('fire-saved');
						})
					}
				}
			});
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>
