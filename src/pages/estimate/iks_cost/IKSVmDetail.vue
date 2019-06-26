<template>
<div>
  <b-card :header="title">
    <b-form>
      <b-form-group label="버전" label-for="version" :label-cols="3" >
        <b-form-input id="version" type="text" v-model="vmData.version" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="생성일시" label-for="createdDt" :label-cols="3" >
        <b-form-input id="createdDt" type="text" v-model="vmData.createdDt" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="3" >
        <b-form-input id="description" type="text" v-model="vmData.description"></b-form-input>
      </b-form-group>
    </b-form>
	<b-row>
	  <b-col>
	    <div class="table-responsive-sm">
	      <table class="table b-table table-striped table-hover table-bordered table-sm">
	    	<colgroup>
		      <col width="200">
		    </colgroup>
	        <thead>
	        <tr>
	          <th class="text-center" rowspan="2">Name</th>
	          <th class="text-center" rowspan="2">Cores</th>
	          <th class="text-center" rowspan="2">Memory</th>
	          <th class="text-center" rowspan="2">NW<br>Speed</th>
	          <th class="text-center" rowspan="2">Available<br>CPU</th>
	          <th class="text-center" rowspan="2">Available<br>Mem</th>
	          <th class="text-center" colspan="3">Shared List</th>
	          <th class="text-center" colspan="3">Dedicated List</th>
	          <th class="text-center" rowspan="2" v-if="editable">Actions</th>
	        </tr>
	        <tr>
	          <th class="text-center">Price/Hour</th>
	          <th class="text-center">Price/Month</th>
	          <th class="text-center">SK Price/Month</th>
	          <th class="text-center">Price/Hour</th>
	          <th class="text-center">Price/Month</th>
	          <th class="text-center">SK Price/Month</th>
	        </tr>
	        </thead>
	        <tbody>
	  		  <tr v-for="(item) in vmData.vms">
				  <td class="text-left">{{ item.name }}</td>
				  <td class="text-right">{{ item.core }}</td>
				  <td class="text-right">{{ item.memory }}</td>
				  <td class="text-right">{{ item.nwSpeed }}</td>
				  <td class="text-right">{{ item.core | toAvailableCpu(iksGeneral.platformCpuPerWorker) }}</td>
				  <td class="text-right">{{ item.memory | toAvailableMemory(iksGeneral.platformMemoryPerWorker) }}</td>
				  <td class="text-right">{{ item.sharedPricePerHour | formatNumber }}</td>
				  <td class="text-right">{{ item.sharedPricePerHour | toMonthlyPrice | formatNumber }}</td>
				  <td class="text-right">{{ item.sharedPricePerHour | toMonthlySKPrice(iksGeneral.ibmDcRate) | formatNumber }}</td>
				  <td class="text-right">{{ item.dedicatedPricePerHour | formatNumber }}</td>
				  <td class="text-right">{{ item.dedicatedPricePerHour | toMonthlyPrice | formatNumber }}</td>
				  <td class="text-right">{{ item.dedicatedPricePerHour | toMonthlySKPrice(iksGeneral.ibmDcRate) | formatNumber }}</td>
				  <td class="text-center" v-if="editable">
				    <a class="rotate-btn" @click="editItem(item)">
				      <i class="fa fa-pencil fa-sm"></i>
	                </a>
	                &nbsp;
				    <a class="rotate-btn" @click="deleteItem(item)">
				      <i class="fa fa-times fa-sm"></i>
	                </a>
				  </td>
				</tr>
	        </tbody>
	      </table>
	    </div>
	  </b-col>
	</b-row>
    <b-row v-if="editable">
      <b-col cols="9">
	    <b-button size="sm" variant="secondary" class="m-1" v-if="editable" @click="openDialog">VM 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
	    <b-button size="sm" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>
	  
  <b-modal centered no-close-on-backdrop title="VM" v-model="dialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
    <b-form>
      <b-form-group label="Name" label-for="name" :label-cols="6" >
        <b-form-input id="name" type="text" v-model="editedItem.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Cores" label-for="core" :label-cols="6" >
        <b-form-input id="core" type="number" v-model="editedItem.core"></b-form-input>
      </b-form-group>
      <b-form-group label="Memory" label-for="memory" :label-cols="6" >
        <b-form-input id="memory" type="number" v-model="editedItem.memory"></b-form-input>
      </b-form-group>
      <b-form-group label="NW Speed (Gbps)" label-for="nwSpeed" :label-cols="6" >
        <b-form-input id="nwSpeed" type="number" v-model="editedItem.nwSpeed"></b-form-input>
      </b-form-group>
      <b-form-group label="Shared List Price(원)/Hour" label-for="sharedPricePerHour" :label-cols="6" >
        <b-form-input id="sharedPricePerHour" type="number" v-model="editedItem.sharedPricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="Dedicated List Price(원)/Hour" label-for="dedicatedPricePerHour" :label-cols="6" >
        <b-form-input id="dedicatedPricePerHour" type="number" v-model="editedItem.dedicatedPricePerHour"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
	  
</div>
</template>

<script>
export default {
	data: () => ({
		title: '',
		dialog: false,
		editedIndex: -1,
		editedItem: {},
		defaultItem: {},
		
      	messageShow: false,
      	messages: []
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		iksGeneral: function() {
			return this.$store.state.estimate.general;
		},
		vmData: function() {
			if(this.versionId) {
				return this.$store.state.estimate.vmHistoryDetail;
			} else {
				return this.$store.state.estimate.vm;
			}
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'VM 추가' : 'VM 수정';
		}
    },
    filters: {
    	toAvailableCpu: function(value, platformCpuPerWorker) {
    		if(platformCpuPerWorker == undefined) {
    			return '';
    		} else {
    			return value - platformCpuPerWorker;
    		}
    	},
    	toAvailableMemory: function(value, platformMemoryPerWorker) {
    		if(platformMemoryPerWorker == undefined) {
    			return '';
    		} else {
    			return value - platformMemoryPerWorker;
    		}
    	},
    	toMonthlyPrice: function(value) {
    		return value * 24 * 31;
    	},
    	toMonthlySKPrice: function(value, ibmDcRate) {
    		if(ibmDcRate == undefined) {
    			return '';
    		} else {
    			return Math.ceil(value * 24 * 31 * (1 - ibmDcRate/100));
    		}
    	}
    },
	watch: {
		dialog (val) {
			val || this.closeDialog();
		}
    },
	created () {
		this.initialize();
    },
	methods: {
		initialize () {
			this.title = this.editable ? 'IKS VM 비용의 최신 버전을 조회 및 수정합니다.' : ''
			
			this.$store.dispatch('estimate/getGeneral')
			
			if(this.versionId) {
				this.$store.dispatch('estimate/getVmHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getVm')
			}
		},
		getGeneralInfo() {
			this.$http.get('/api/estimate/general').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.iksGeneral = response.data;
				} else {
					this.showMessage('기준정보', '조회된 데이터가 없습니다. 일부 항목의 값이 표시되지 않습니다.');
				}
			}).catch(error => {
				this.showMessage('기준정보', error.response.data.message);
			})
		},
		getVmInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.vmData = response.data;
					this.alert = false;
					this.alertMessage = '';
				} else {
					this.showMessage('VM', '조회된 데이터가 없습니다.');
				}
			}).catch(error => {
				this.showMessage('VM', error.response.data.message);
			})
		},
		showMessage(title, text) {
			let message = {};
			message.title = title;
			message.text = text;
			this.messages.push(message);
			this.messageShow = true;
		},
		editItem (item) {
			this.editedIndex = this.vmData.vms.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem (item) {
			const index = this.vmData.vms.indexOf(item);
			confirm('삭제하시겠습니까?') && this.vmData.vms.splice(index, 1);
		},
		openDialog() {
			this.editedIndex = -1;
			this.editedItem = Object.assign({}, this.defaultItem);
			this.dialog = true;
		},
		closeDialog () {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},
		saveDialog (e) {
			if(!this.editedItem.name) {
				alert('Name 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.core) {
				alert('Cores 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.memory) {
				alert('Memory 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.nwSpeed) {
				alert('NW Speed (Gbps) 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.sharedPricePerHour) {
				alert('Shared List Price(원)/Hour 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.dedicatedPricePerHour) {
				alert('Dedicated List Price(원)/Hour 값을 입력하세요');
				e.preventDefault()
				return
			}

			if (this.editedIndex > -1) {
				Object.assign(this.vmData.vms[this.editedIndex], this.editedItem);
			} else {
				this.vmData.vms.push(this.editedItem);
			}
			this.closeDialog();
		},
		save () {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveVm', {vmInfo: this.vmData})
			}
		}
	}
}
</script>

