<template>
<div>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-text>{{ formTitle }}</mdb-card-text>
      <mdb-row>
        <mdb-col md="6">
	  	  <mdb-input label="버전" v-model="vmData.version" disabled/>
        </mdb-col>
        <mdb-col md="6">
	   	  <mdb-input label="생성일시" v-model="vmData.createdDt" disabled/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
	   	  <mdb-input label="설명" v-model="vmData.description"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
		    <mdb-tbl sm bordered hover responsive>
			  <colgroup>
			    <col width="200">
			  </colgroup>
		      <mdb-tbl-head>
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
		      </mdb-tbl-head>
		      <mdb-tbl-body>
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
				      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
	                </a>
	                &nbsp;
				    <a class="rotate-btn" @click="deleteItem(item)">
				      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
	                </a>
				  </td>
				</tr>
		      </mdb-tbl-body>
		    </mdb-tbl>
        </mdb-col>
      </mdb-row>
      <mdb-row>
          <mdb-col md="6" class="text-left">
	        <mdb-btn size="sm" color="secondary" v-if="editable" @click="openDialog">VM 추가</mdb-btn>
          </mdb-col>
          <mdb-col md="6" class="text-right">
	        <mdb-btn size="md" outline="primary" v-if="!editable" @click="closeDetailDialog">닫기</mdb-btn>
	        <mdb-btn size="md" color="primary" v-if="editable" @click="save">저장</mdb-btn>                   
          </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>

  <mdb-modal :show="dialog" @close="closeDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formDialogTitle }}</h5>
      <mdb-input type="text" label="Name" v-model="editedItem.name"/>
      <mdb-input type="number" label="Cores" v-model="editedItem.core"/>
      <mdb-input type="number" label="Memory" v-model="editedItem.memory"/>
      <mdb-input type="number" label="NW Speed (Gbps)" v-model="editedItem.nwSpeed"/>
      <mdb-input type="number" label="Shared List Price(원)/Hour" v-model="editedItem.sharedPricePerHour"/>
      <mdb-input type="number" label="Dedicated List Price(원)/Hour" v-model="editedItem.dedicatedPricePerHour"/>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveDialog">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
        
</div>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import { mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput,
    	mdbTbl, mdbTblHead, mdbTblBody
  	},
	data: () => ({
		dialog: false,
		editedIndex: -1,
		editedItem: {},
		defaultItem: {},
		
		iksGeneral: {},
		vmData: {vms: []},
		alert: false,
		alertMessage: '',
		generalAlert: false,
		generalAlertMessage: ''
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		formTitle() {
			return this.editable ? 'IKS VM 비용의 최신 버전을 조회 및 수정합니다.' : 'IKS VM History Detail';
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'VM 추가' : 'VM 수정';
		}
    },
    filters: {
    	toAvailableCpu: function(value, platformCpuPerWorker) {
    		if(platformCpuPerWorker == undefined) {
    			return '표시할 수 없음';
    		} else {
    			return value - platformCpuPerWorker;
    		}
    	},
    	toAvailableMemory: function(value, platformMemoryPerWorker) {
    		if(platformMemoryPerWorker == undefined) {
    			return '표시할 수 없음';
    		} else {
    			return value - platformMemoryPerWorker;
    		}
    	},
    	toMonthlyPrice: function(value) {
    		return value * 24 * 31;
    	},
    	toMonthlySKPrice: function(value, ibmDcRate) {
    		if(ibmDcRate == undefined) {
    			return '표시할 수 없음';
    		} else {
    			return Math.ceil(value * 24 * 31 * (1 - ibmDcRate/100));
    		}
    	}
    },
	watch: {
		versionId: function() {
			if(this.versionId <= 0) {
				this.vmData = {vms: []};
				return;
			}
			
			this.getVmInfo('/api/iks_costs/vm/history/' + this.versionId);
		},
		dialog (val) {
			val || this.closeDialog();
		}
    },
	created () {
		this.initialize();
    },
	methods: {
		initialize () {
			this.getGeneralInfo();
			
			if(this.versionId) {
				this.getVmInfo('/api/iks_costs/vm/history/' + this.versionId);
			} else {
				this.getVmInfo('/api/iks_costs/vm');
			}
		},
		getGeneralInfo() {
			this.$http.get('/api/general').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.iksGeneral = response.data;
					this.generalAlert = false;
					this.generalAlertMessage = '';
				} else {
					this.printGeneralErrorMessage();
				}
			}).catch(error => {
				this.printGeneralErrorMessage(error.response.data.message);
			})
		},
		getVmInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.vmData = response.data;
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
			this.vmData = {vms: []};
			this.alert = true;
			this.alertMessage = message == undefined ? '조회된 IKS VM 비용 데이터가 없습니다.':message;
		},
		printGeneralErrorMessage(message) {
			this.iksGeneral = {};
			this.generalAlert = true;
			this.generalAlertMessage = message == undefined ? '조회된 기준정보 데이터가 없습니다. 일부 항목의 값이 표시되지 않습니다.':message;
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
		saveDialog () {
			if(!this.editedItem.name) {
				alert('Name 값을 입력하세요');
				return;
			}
			if(!this.editedItem.core) {
				alert('Cores 값을 입력하세요');
				return;
			}
			if(!this.editedItem.memory) {
				alert('Memory 값을 입력하세요');
				return;
			}
			if(!this.editedItem.nwSpeed) {
				alert('NW Speed (Gbps) 값을 입력하세요');
				return;
			}
			if(!this.editedItem.sharedPricePerHour) {
				alert('Shared List Price(원)/Hour 값을 입력하세요');
				return;
			}
			if(!this.editedItem.dedicatedPricePerHour) {
				alert('Dedicated List Price(원)/Hour 값을 입력하세요');
				return;
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
				this.$http.put('/api/iks_costs/vm', this.vmData).then(response => {
					alert("저장되었습니다.");
					this.getVmInfo('/api/iks_costs/vm');
					this.$emit('fire-saved');
				});
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>

