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
  <mdb-modal side position="bottom-right" info removeBackdrop :show="messageShow" @close="messageShow = false">
    <mdb-modal-body>
      <mdb-row class="mt-1 mb-2">
        <mdb-col>
          <p v-for="(message) in messages" class="text-sm-left"><strong>[{{ message.title }}]</strong> {{ message.text }}</p>
        </mdb-col>
      </mdb-row>
    </mdb-modal-body>
    <mdb-modal-footer center>
      <mdb-btn color="primary" size="sm" @click="messageShow = false">확인</mdb-btn>
    </mdb-modal-footer>
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
				this.$store.dispatch('estimate/saveVm', {vmInfo: this.vmData})
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>

