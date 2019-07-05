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
      <b-form-group label="Object Storage Price(₩)/Monthly" label-for="objectStoragePricePerMonth" label-class="astertisk" :label-cols="3" >
        <b-form-input id="objectStoragePricePerMonth" type="number" v-model="storageData.objectStoragePricePerMonth"></b-form-input>
      </b-form-group>
    </b-form>
	<b-row>
	  <b-col>
	  	<p class="mb-1">File Storages</p>
	  </b-col>
	</b-row>
	<b-row>
	  <b-col>
	    <div class="table-responsive-sm">
	      <table class="table b-table table-striped table-hover table-bordered table-sm">
			  <colgroup>
			    <col width="60">
			  </colgroup>
		      <thead>
		        <tr>
		          <th class="text-center" rowspan="2">Disk<br>Size(GB)</th>
		          <th class="text-center" colspan="3">0.25 IOPS</th>
		          <th class="text-center" colspan="3">2 IOPS</th>
		          <th class="text-center" colspan="3">4 IOPS</th>
		          <th class="text-center" colspan="3">10 IOPS</th>
		          <th class="text-center" rowspan="2" v-if="editable">Actions</th>
		        </tr>
		        <tr>
				  <th class="text-center">List Price($)<br>/Hourly</th>
				  <th class="text-center">List Price(₩)<br>/Monthly</th>
				  <th class="text-center">SK Price(₩)<br>/Monthly</th>
				  <th class="text-center">List Price($)<br>/Hourly</th>
				  <th class="text-center">List Price(₩)<br>/Monthly</th>
				  <th class="text-center">SK Price(₩)<br>/Monthly</th>
				  <th class="text-center">List Price($)<br>/Hourly</th>
				  <th class="text-center">List Price(₩)<br>/Monthly</th>
				  <th class="text-center">SK Price(₩)<br>/Monthly</th>
				  <th class="text-center">List Price($)<br>/Hourly</th>
				  <th class="text-center">List Price(₩)<br>/Monthly</th>
				  <th class="text-center">SK Price(₩)<br>/Monthly</th>
		        </tr>
		      </thead>
		      <tbody>
				<tr v-for="(item) in storageData.fileStorages">
				  <td class="text-left">{{ item.disk }}</td>
				  <td class="text-right">{{ item.iops1PricePerHour | toUSD}}</td>
				  <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops2PricePerHour | toUSD}}</td>
				  <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops3PricePerHour | toUSD}}</td>
				  <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops4PricePerHour | toUSD}}</td>
				  <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
				  <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
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
	    <b-button size="md" variant="secondary" class="m-1" v-if="editable" @click="openDialog">File Storage 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
	    <b-button size="md" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>

  <b-modal centered no-close-on-backdrop title="File Storage" v-model="dialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
    <b-form>
      <b-form-group label="Disk Size(GB)" label-for="disk" label-class="astertisk" :label-cols="4" >
        <b-form-input id="disk" type="number" v-model="editedItem.disk"></b-form-input>
      </b-form-group>
      <b-form-group label="0.25 IOPS Hourly($)" label-for="iops1PricePerHour" label-class="astertisk" :label-cols="4" >
        <b-form-input id="iops1PricePerHour" type="number" v-model="editedItem.iops1PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="2 IOPS Hourly($)" label-for="iops2PricePerHour" label-class="astertisk" :label-cols="4" >
        <b-form-input id="iops2PricePerHour" type="number" v-model="editedItem.iops2PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="4 IOPS Hourly($)" label-for="iops3PricePerHour" label-class="astertisk" :label-cols="4" >
        <b-form-input id="iops3PricePerHour" type="number" v-model="editedItem.iops3PricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="10 IOPS Hourly($)" label-for="iops4PricePerHour" label-class="astertisk" :label-cols="4" >
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
		defaultItem: {}
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
		},
		userId : function() {
			return this.$store.getters.getUserId
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
			if(!this.storageData.objectStoragePricePerMonth) {
				alert('Object Storage Price(₩)/Monthly 값을 입력하세요');
				return;
			}
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.storageData.created = this.userId
				this.$store.dispatch('estimate/saveStorage', {storageInfo: this.storageData})
			}
		}
	}
}
</script>
