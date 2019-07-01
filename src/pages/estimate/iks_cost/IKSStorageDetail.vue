<template>
<div>
  <b-card :header="title">
    <b-form>
      <b-form-group label="버전" label-for="version" :label-cols="3" >
        <b-form-input id="version" type="text" v-model="storageData.version" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="생성일시" label-for="createdDt" :label-cols="3" >
        <b-form-input id="createdDt" type="text" v-model="storageData.createdDt" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="3" >
        <b-form-input id="description" type="text" v-model="storageData.description"></b-form-input>
      </b-form-group>
      <b-form-group label="Object Storage 비용(Daily) (원)" label-for="objectStoragePricePerDay" :label-cols="3" >
        <b-form-input id="objectStoragePricePerDay" type="number" v-model="storageData.objectStoragePricePerDay"></b-form-input>
      </b-form-group>
    </b-form>
	<b-row>
	  <b-col>
	    <div class="table-responsive-sm">
	      <table class="table b-table table-striped table-hover table-bordered table-sm">
			  <colgroup>
			    <col width="80">
			  </colgroup>
		      <thead>
		        <tr>
		          <th class="text-center" rowspan="2">Disk<br>Size(GB)</th>
		          <th class="text-center" colspan="4">0.25 IOPS</th>
		          <th class="text-center" colspan="4">2 IOPS</th>
		          <th class="text-center" colspan="4">4 IOPS</th>
		          <th class="text-center" colspan="4">10 IOPS</th>
		          <th class="text-center" rowspan="2" v-if="editable">Actions</th>
		        </tr>
		        <tr>
				  <th class="text-center">Total<br>IOPS</th>
				  <th class="text-center">Hourly($)</th>
				  <th class="text-center">Monthly</th>
				  <th class="text-center">Yearly</th>
				  <th class="text-center">Total<br>IOPS</th>
				  <th class="text-center">Hourly($)</th>
				  <th class="text-center">Monthly</th>
				  <th class="text-center">Yearly</th>
				  <th class="text-center">Total<br>IOPS</th>
				  <th class="text-center">Hourly($)</th>
				  <th class="text-center">Monthly</th>
				  <th class="text-center">Yearly</th>
				  <th class="text-center">Total<br>IOPS</th>
				  <th class="text-center">Hourly($)</th>
				  <th class="text-center">Monthly</th>
				  <th class="text-center">Yearly</th>
		        </tr>
		      </thead>
		      <tbody>
				<tr v-for="(item) in storageData.fileStorages">
				  <td class="text-left">{{ item.disk }}</td>
				  <td class="text-right">{{ item.disk * 0.25 }}</td>
				  <td class="text-right">{{ item.iops1PricePerHour }}</td>
				  <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-right">{{ item.disk * 2 }}</td>
				  <td class="text-right">{{ item.iops2PricePerHour }}</td>
				  <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-right">{{ item.disk * 4 }}</td>
				  <td class="text-right">{{ item.iops3PricePerHour }}</td>
				  <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-right">{{ item.disk * 10 }}</td>
				  <td class="text-right">{{ item.iops4PricePerHour }}</td>
				  <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-center" v-if="editable">
				    <b-link href="#" class="card-header-action" v-on:click="editItem(item)">
				      <i class="fa fa-pencil fa-sm"></i>
	                </b-link>
	                <b-link href="#" class="card-header-action" v-on:click="deleteItem(item)">
				      <i class="fa fa-times fa-sm"></i>
	                </b-link>
				  </td>
				</tr>
	        </tbody>
	      </table>
	    </div>
	  </b-col>
	</b-row>
    <b-row v-if="editable">
      <b-col cols="9">
	    <b-button size="sm" variant="secondary" class="m-1" v-if="editable" @click="openDialog">Storage 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
	    <b-button size="sm" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>

  <b-modal centered no-close-on-backdrop title="Storage" v-model="dialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
    <b-form>
      <b-form-group label="Disk Size(GB)" label-for="disk" :label-cols="4" >
        <b-form-input id="disk" type="number" v-model="editedItem.disk"></b-form-input>
      </b-form-group>
      <b-form-group label="0.25 IOPS Hourly($)" label-for="iops1PricePerHour" :label-cols="4" >
        <b-form-input id="iops1PricePerHour" type="number" v-model="editedItem.iops1PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="2 IOPS Hourly($)" label-for="iops2PricePerHour" :label-cols="4" >
        <b-form-input id="iops2PricePerHour" type="number" v-model="editedItem.iops2PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="4 IOPS Hourly($)" label-for="iops3PricePerHour" :label-cols="4" >
        <b-form-input id="iops3PricePerHour" type="number" v-model="editedItem.iops3PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="10 IOPS Hourly($)" label-for="iops4PricePerHour" :label-cols="4" >
        <b-form-input id="iops4PricePerHour" type="number" v-model="editedItem.iops4PricePerHour"></b-form-input>
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
		storageData: function() {
			if(this.versionId) {
				return this.$store.state.estimate.storageHistoryDetail;
			} else {
				return this.$store.state.estimate.storage;
			}
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'Storage 추가' : 'Storage 수정';
		}
    },
    filters: {
    	toMonthlyPrice: function(value, dcRate, exchangeRate) {
    		if(dcRate == undefined || exchangeRate == undefined) {
    			return '';
    		} else {
    			return Math.ceil(value * 24 * 31 * (1 - dcRate/100) * exchangeRate);
    		}
    	},
    	toYearlyPrice: function(value) {
    		if(Number.isInteger(value)) {
    			return value * 12;
    		} else {
    			return '';
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
			this.title = this.editable ? 'IKS Storage 비용의 최신 버전을 조회 및 수정합니다.' : ''
			
			this.$store.dispatch('estimate/getGeneral')
			
			if(this.versionId) {
				this.$store.dispatch('estimate/getStorageHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getStorage')
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
		getStorageInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.storageData = response.data;
				} else {
					this.showMessage('Storage', '조회된 데이터가 없습니다.');
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
			this.editedIndex = this.storageData.fileStorages.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem (item) {
			const index = this.storageData.fileStorages.indexOf(item);
			confirm('삭제하시겠습니까?') && this.storageData.fileStorages.splice(index, 1);
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
			if(!this.editedItem.disk) {
				alert('Disk Size(GB) 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops1PricePerHour) {
				alert('0.25 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops2PricePerHour) {
				alert('2 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops3PricePerHour) {
				alert('4 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops4PricePerHour) {
				alert('10 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if (this.editedIndex > -1) {
				Object.assign(this.storageData.fileStorages[this.editedIndex], this.editedItem);
			} else {
				this.storageData.fileStorages.push(this.editedItem);
			}
			this.closeDialog();
		},
		save () {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveStorage', {storageInfo: this.storageData})
			}
		}
	}
}
</script>
