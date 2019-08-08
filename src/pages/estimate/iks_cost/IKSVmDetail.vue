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
		      <col width="100">
		    </colgroup>
	        <thead>
	        <tr>
	          <th class="text-center" rowspan="2">Name</th>
	          <th class="text-center" rowspan="2">Cores</th>
	          <th class="text-center" rowspan="2">Memory<br>(GB)</th>
	          <th class="text-center" rowspan="2">NW Speed<br>(Gbps)</th>
	          <th class="text-center" rowspan="2">Available<br>CPU</th>
	          <th class="text-center" rowspan="2">Available<br>Memory(GB)</th>
	          <th class="text-center" colspan="3">Shared</th>
	          <th class="text-center" colspan="3">Dedicated</th>
	          <th class="text-center" rowspan="2" v-if="editable">Actions</th>
	        </tr>
	        <tr>
	          <th class="text-center">List Price($)<br>/Hourly</th>
	          <th class="text-center">Graduated Tier<br>Price(₩)/Monthly</th>
	          <th class="text-center">Graduated Tier<br>SK Price(₩)/Monthly</th>
	          <th class="text-center">List Price($)<br>/Hourly</th>
	          <th class="text-center">Graduated Tier<br>Price(₩)/Monthly</th>
	          <th class="text-center">Graduated Tier<br>SK Price(₩)/Monthly</th>
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
				  <td class="text-right">{{ item.sharedListPricePerHour | formatNumber | toUSD }}</td>
				  <td class="text-right">{{ item.sharedGraduatedTierPricePerMonth | formatNumber | toKRW}}</td>
				  <td class="text-right">{{ item.sharedGraduatedTierPricePerMonth | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW}}</td>
				  <td class="text-right">{{ item.dedicatedListPricePerHour | formatNumber | toUSD }}</td>
				  <td class="text-right">{{ item.dedicatedGraduatedTierPricePerMonth | formatNumber | toKRW}}</td>
				  <td class="text-right">{{ item.dedicatedGraduatedTierPricePerMonth | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW}}</td>
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
	    <b-button size="md" variant="secondary" class="m-1" v-if="editable" @click="openDialog">VM 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
	    <b-button size="md" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>
	  
  <b-modal centered no-close-on-backdrop title="VM" v-model="dialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
    <b-form>
      <b-form-group label="Name" label-for="name" label-class="astertisk" :label-cols="8" >
        <b-form-input id="name" type="text" v-model="editedItem.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Cores" label-for="core" label-class="astertisk" :label-cols="8" >
        <b-form-input id="core" type="number" v-model="editedItem.core"></b-form-input>
      </b-form-group>
      <b-form-group label="Memory (GB)" label-for="memory" label-class="astertisk" :label-cols="8" >
        <b-form-input id="memory" type="number" v-model="editedItem.memory"></b-form-input>
      </b-form-group>
      <b-form-group label="NW Speed (Gbps)" label-for="nwSpeed" label-class="astertisk" :label-cols="8" >
        <b-form-input id="nwSpeed" type="number" v-model="editedItem.nwSpeed"></b-form-input>
      </b-form-group>
      <b-form-group label="Shared List Price($)/Hourly" label-for="sharedListPricePerHour" label-class="astertisk" :label-cols="8" >
        <b-form-input id="sharedListPricePerHour" type="number" v-model="editedItem.sharedListPricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="Shared Graduated Tier Price(₩)/Monthly" label-for="sharedGraduatedTierPricePerMonth" label-class="astertisk" :label-cols="8" >
        <b-form-input id="sharedGraduatedTierPricePerMonth" type="number" v-model="editedItem.sharedGraduatedTierPricePerMonth"></b-form-input>
      </b-form-group>
      <b-form-group label="Dedicated List Price($)/Hourly" label-for="dedicatedListPricePerHour" label-class="astertisk" :label-cols="8" >
        <b-form-input id="dedicatedListPricePerHour" type="number" v-model="editedItem.dedicatedListPricePerHour"></b-form-input>
      </b-form-group>
      <b-form-group label="Dedicated Graduated Tier Price(₩)/Monthly" label-for="dedicatedGraduatedTierPricePerMonth" label-class="astertisk" :label-cols="8" >
        <b-form-input id="dedicatedGraduatedTierPricePerMonth" type="number" v-model="editedItem.dedicatedGraduatedTierPricePerMonth"></b-form-input>
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
		vmData: function() {
			if(this.versionId) {
				return this.$store.state.estimate.vmHistoryDetail;
			} else {
				return this.$store.state.estimate.vm;
			}
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'VM 추가' : 'VM 수정';
		},
		userId : function() {
			return this.$store.getters.getUserId
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
			if(!this.editedItem.sharedListPricePerHour) {
				alert('Shared List Price($)/Hourly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.sharedGraduatedTierPricePerMonth) {
				alert('Shared Graduated Tier Price(₩)/Monthly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.dedicatedListPricePerHour) {
				alert('Dedicated List Price($)/Hourly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.dedicatedGraduatedTierPricePerMonth) {
				alert('Dedicated Graduated Tier Price(₩)/Monthly 값을 입력하세요');
				e.preventDefault()
				return
			}

			if (!this.vmData.vms) {
				this.vmData.vms = new Array()
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
				this.vmData.created = this.userId
				this.$store.dispatch('estimate/saveVm', {vmInfo: this.vmData})
			}
		}
	}
}
</script>

