<template>
<div>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-text>{{ formTitle }}</mdb-card-text>
      <mdb-row>
        <mdb-col md="6">
	  	  <mdb-input label="버전" v-model="storageData.version" disabled/>
        </mdb-col>
        <mdb-col md="6">
	   	  <mdb-input label="생성일시" v-model="storageData.createdDt" disabled/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
	   	  <mdb-input label="설명" v-model="storageData.description"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
	   	  <mdb-input type="number" label="Object Storage 비용(Daily)" v-model="storageData.objectStoragePricePerDay">
	   	    <span class="input-group-text md-addon" slot="append">$</span>
	   	  </mdb-input>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
		    <mdb-tbl sm bordered hover responsive>
			  <colgroup>
			    <col width="80">
			  </colgroup>
		      <mdb-tbl-head>
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
		      </mdb-tbl-head>
		      <mdb-tbl-body>
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
          <mdb-col sm="6" class="text-left">
	        <mdb-btn size="sm" color="secondary" v-if="editable" @click="openDialog">Storage 추가</mdb-btn>
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
      <mdb-input type="number" label="Disk Size(GB)" v-model="editedItem.disk"/>
      <mdb-input type="number" label="0.25 IOPS Hourly" v-model="editedItem.iops1PricePerHour">
        <span class="input-group-text md-addon" slot="append">$</span>
      </mdb-input>
      <mdb-input type="number" label="2 IOPS Hourly" v-model="editedItem.iops2PricePerHour">
        <span class="input-group-text md-addon" slot="append">$</span>
      </mdb-input>
      <mdb-input type="number" label="4 IOPS Hourly" v-model="editedItem.iops3PricePerHour">
        <span class="input-group-text md-addon" slot="append">$</span>
      </mdb-input>
      <mdb-input type="number" label="10 IOPS Hourly" v-model="editedItem.iops4PricePerHour">
        <span class="input-group-text md-addon" slot="append">$</span>
      </mdb-input>
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
		
		storageData:{ fileStorages: [] },
		iksGeneral: {},
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
			return this.editable ? 'IKS Storage 비용의 최신 버전을 조회 및 수정합니다.' : 'IKS Storage History Detail';
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'Storage 추가' : 'Storage 수정';
		}
    },
    filters: {
    	toMonthlyPrice: function(value, dcRate, exchangeRate) {
    		if(dcRate == undefined || exchangeRate == undefined) {
    			return '표시할 수 없음';
    		} else {
    			return Math.ceil(value * 24 * 31 * (1 - dcRate/100) * exchangeRate);
    		}
    	},
    	toYearlyPrice: function(value) {
    		if(Number.isInteger(value)) {
    			return value * 12;
    		} else {
    			return '표시할 수 없음';
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
			this.getGeneralInfo();
			
			if(this.versionId) {
				this.getStorageInfo('/api/iks_costs/storage/history/' + this.versionId);
			} else {
				this.getStorageInfo('/api/iks_costs/storage');
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
		getStorageInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.storageData = response.data;
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
			this.storageData = {fileStorages: []};
			this.alert = true;
			this.alertMessage = message == undefined ? '조회된 IKS Storage 비용 데이터가 없습니다.':message;
		},
		printGeneralErrorMessage(message) {
			this.iksGeneral = {};
			this.generalAlert = true;
			this.generalAlertMessage = message == undefined ? '조회된 기준정보 데이터가 없습니다. 일부 항목의 값이 표시되지 않습니다.':message;
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
		saveDialog () {
			if(!this.editedItem.disk) {
				alert('Disk Size(GB) 값을 입력하세요');
				return;
			}
			if(!this.editedItem.iops1PricePerHour) {
				alert('0.25 IOPS Hourly 값을 입력하세요');
				return;
			}
			if(!this.editedItem.iops2PricePerHour) {
				alert('2 IOPS Hourly 값을 입력하세요');
				return;
			}
			if(!this.editedItem.iops3PricePerHour) {
				alert('4 IOPS Hourly 값을 입력하세요');
				return;
			}
			if(!this.editedItem.iops4PricePerHour) {
				alert('10 IOPS Hourly 값을 입력하세요');
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
				this.$http.put('/api/iks_costs/storage', this.storageData).then(response => {
					alert("저장되었습니다.");
					this.getStorageInfo('/api/iks_costs/storage');
					this.$emit('fire-saved');
				})
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>
