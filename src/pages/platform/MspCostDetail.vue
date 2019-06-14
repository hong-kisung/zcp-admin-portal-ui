<template>
<div>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-text>{{ formTitle }}</mdb-card-text>
      <mdb-row>
        <mdb-col md="6">
	  	  <mdb-input label="버전" v-model="productMspCostVersion.version" disabled/>
        </mdb-col>
        <mdb-col md="6">
	   	  <mdb-input label="생성일시" v-model="productMspCostVersion.createdDt" disabled/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="12">
	   	  <mdb-input label="설명" v-model="productMspCostVersion.description"/>
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
		          <th class="text-center">Product</th>
		          <th class="text-center">Alias</th>
		          <th class="text-center">Mem Spec(GB) 초과</th>
		          <th class="text-center">MSP Cost</th>
		          <th class="text-center" v-if="editable">Actions</th>
		        </tr>
		      </mdb-tbl-head>
		      <mdb-tbl-body>
			    <template v-for="(item) in productMspCostVersion.products">
			      <template v-if="item.mspCosts.length == 0">
			        <tr>
			          <th class="text-left" scope="row">
			            <div class="custom-control custom-checkbox custom-control-inline">
			              <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
			              <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
			            </div>
			          </th>
				      <td class="text-left"></td>
				      <td class="text-center"></td>
				      <td class="text-right"></td>
				      <td class="text-center" v-if="editable"></td>
			        </tr>
			      </template>
			      <template v-else>
			        <template v-for="(mspCosts, index) in item.mspCosts">
			        <tr>
			          <th class="text-left" scope="row" v-if="index == 0" :rowspan="item.mspCosts.length">
			            <template v-if="editable && index == 0">
			              <div class="custom-control custom-checkbox custom-control-inline">
			                <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
			                <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
			              </div>
			            </template>
			            <template v-else>
			              {{ item.name }}
			            </template>
			          </th>
				      <td class="text-left">{{ mspCosts.alias }}</td>
				      <td class="text-center">{{ mspCosts.memory }}</td>
				      <td class="text-right">{{ mspCosts.cost | formatNumber }}</td>
					  <td class="text-center" v-if="editable">
					    <a class="rotate-btn" @click="editItem(item, mspCosts)">
					      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
		                </a>
		                &nbsp;
					    <a class="rotate-btn" @click="deleteItem(item, mspCosts)">
					      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
		                </a>
					  </td>
			        </tr>
			        </template>
			      </template>
			    </template>

		      </mdb-tbl-body>
		    </mdb-tbl>
        </mdb-col>
      </mdb-row>
      <mdb-row>
          <mdb-col sm="6" class="text-left">
	        <mdb-btn size="sm" color="secondary" v-if="editable" v-bind:disabled="selected.length != 1" @click="openDialog">Mem Spec 추가</mdb-btn>
          </mdb-col>
          <mdb-col md="6" class="text-right">
	        <mdb-btn size="md" outline="primary" v-if="!editable" @click="closeDetailDialog">닫기</mdb-btn>
	        <mdb-btn size="md" color="primary" v-if="editable" @click="save">저장</mdb-btn>                   
          </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>

  <mdb-modal :show="mspCostDialog" @close="closeDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formDialogTitle }}</h5>
      <mdb-input type="text" label="Alias" v-model="editedItem.alias"/>
      <mdb-input type="number" label="Mem Spec(GB) 초과" v-model="editedItem.memory"/>
      <mdb-input type="number" label="MSP Cost" v-model="editedItem.cost"/>
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
		headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
		selected: [],
		editedIndex: -1,
		editedProductIndex: -1,
		editedItem: {},
		defaultItem: {},
		mspCostDialog: false,
		productMspCostVersion: {},
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		formTitle() {
			return this.editable ? 'MSP 비용의 최신 버전을 조회 및 수정합니다.' : 'Platform MSP Costs Detail';
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'Mem Spec 추가' : 'Mem Spec 수정';
		}
    },
    watch: {
		mspCostDialog (val) {
			val || this.closeDialog();
		}
    },
	created () {
		this.initialize();
    },
	methods: {
		initialize () {
			if(this.versionId && this.versionId > 0) {
				this.$http.get('/api/platform/msp/history/' + this.versionId).then(response => {
					this.productMspCostVersion = Object.assign({}, response.data);
				})
				
				return;
			}
			
			this.$http.get('/api/platform/msp').then(response => {
				if(response && response.data) {
					this.productMspCostVersion = response.data;
				}
			}).catch(error => {
				if(error.response && error.response.data && error.response.data.status == 404) {
					alert('조회된 데이터가 없습니다.');
				} else {
					alert(error.response.data.message);
				}
			})
		},
		save() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/platform/msp', this.productMspCostVersion).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.selected = [];
					this.$emit('fire-saved');
				})
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		},
		
		openDialog() {
			if(this.selected.length == 1) {
				this.editedProductIndex = this.productMspCostVersion.products.indexOf(this.selected[0]);
				this.mspCostDialog = true;
			}
		},
		closeDialog() {
			this.mspCostDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedProductIndex = -1;
				this.editedIndex = -1;
			}, 300);
		},
		saveDialog () {
      		if(!this.editedItem.alias) {
      			alert('Alias 값을 입력하세요');
      			return;
      		}
      		if(!this.editedItem.memory) {
      			alert('Mem Spec(GB) 초과 값을 입력하세요');
      			return;
      		}
      		if(!this.editedItem.cost) {
      			alert('MSP Cost 값을 입력하세요');
      			return;
      		}
      		
			if (this.editedIndex > -1) {
				Object.assign(this.productMspCostVersion.products[this.editedProductIndex].mspCosts[this.editedIndex], this.editedItem);
			} else {
				this.productMspCostVersion.products[this.editedProductIndex].mspCosts.push(this.editedItem);
			}
			this.closeDialog();
		},
		editItem(productItem, item) {
			this.editedProductIndex = this.productMspCostVersion.products.indexOf(productItem);
			this.editedIndex = this.productMspCostVersion.products[this.editedProductIndex].mspCosts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.mspCostDialog = true;
		},
		deleteItem(productItem, item) {
			const productIndex = this.productMspCostVersion.products.indexOf(productItem);
			const index = this.productMspCostVersion.products[productIndex].mspCosts.indexOf(item);
			confirm('삭제하시겠습니까?') && this.productMspCostVersion.products[productIndex].mspCosts.splice(index, 1);
		}
	}
}
</script>

<style>
</style>