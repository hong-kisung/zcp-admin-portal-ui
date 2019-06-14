<template>
<div>
  <mdb-card>
    <mdb-card-body>
	    <mdb-tbl sm bordered hover responsive>
	      <mdb-tbl-head>
	        <tr>
	          <th class="text-center">Service</th>
	          <th class="text-center">Classification</th>
	          <th class="text-center">Type</th>
	          <th class="text-center">Actions</th>
	        </tr>
	      </mdb-tbl-head>
	      <mdb-tbl-body>
		    <template v-for="(item) in services">
		      <template v-if="item.classifications.length == 0">
		        <tr>
		          <th class="text-left" scope="row">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		            </div>
		          </th>
			      <td class="text-left"></td>
			      <td class="text-center"></td>
			      <td class="text-left"></td>
		        </tr>
		      </template>
		      <template v-else>
		        <template v-for="(classification, index) in item.classifications">
		        <tr>
		          <th class="text-left" scope="row" v-if="index == 0" :rowspan="item.classifications.length">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		            </div>
		          </th>
			      <td class="text-left">{{ classification.classificationName }}</td>
			      <td class="text-center">{{ classification.classificationType }}</td>
				  <td class="text-center">
				    <a class="rotate-btn" @click="editAppsItem(item, classification, index)">
				      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
	                </a>
	                &nbsp;
				    <a class="rotate-btn" @click="deleteAppItem(item, classification, index)">
				      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
	                </a>
				  </td>
		        </tr>
		        </template>
		      </template>
		    </template>
  
	      </mdb-tbl-body>
	    </mdb-tbl>
        <mdb-row>
          <mdb-col class="text-left">
	        <mdb-btn size="sm" color="secondary" @click="openServiceDialog">Service 추가</mdb-btn>
	        <mdb-btn size="sm" color="secondary" @click="deleteService" v-bind:disabled="selected.length == 0">Service 삭제</mdb-btn>
	        <mdb-btn size="sm" color="default" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Classification 추가</mdb-btn>
          </mdb-col>
        </mdb-row>
    </mdb-card-body>
  </mdb-card>

  <mdb-modal :show="serviceDialog" @close="closeServiceDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">Service 추가</h5>
      <mdb-input label="서비스명" v-model="editedServItem.serviceName"/>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeServiceDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveServiceDialog">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
		  
  <mdb-modal :show="applicationDialog" @close="closeAppsDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formTitle }}</h5>
      <mdb-input label="Classification" v-model="editedAppsItem.classificationName"/>
      <div>
        <label for="classificationType">Classification Type</label>
	    <select class="form-control" id="classificationType" v-model="editedAppsItem.classificationType">
	      <option value=""></option>
	      <option v-for="(item, index) in classificationTypeItems" :value="item">{{ item }}</option>
	    </select>
      </div>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeAppsDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveAppsDialog">저장</mdb-btn>                   
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
		selected: [],

		serviceDialog: false,
      	applicationDialog: false,

      	editedServIndex: -1,
		defaultServItem: { },
		editedServItem: { },

      	editedAppsIndex: -1,
      	defaultAppsItem: {},
      	editedAppsItem: {}
	}),
	props: [
		'services',
		'classificationTypeItems',
		'title'
	],
	computed: {
		formTitle () {
			return this.editedAppsIndex === -1 ? 'Classification 추가' : 'Classification 수정';
		}
    },
	created () {
		this.initialize()
	},
    watch: {
		serviceDialog (val) {
			val || this.closeServiceDialog();
		},
		applicationDialog (val) {
			val || this.closeAppsDialog();
		}
    },
	methods: {
		initialize() {
		},
		
		openServiceDialog() {
			this.selected = [];
			this.editedServIndex = -1;
			this.editedServItem = Object.assign({}, this.defaultServItem);
			this.serviceDialog = true;
		},
		closeServiceDialog() {
			this.serviceDialog = false;
			setTimeout(() => {
				this.editedServItem = Object.assign({}, this.defaultServItem);
			}, 300);
		},
		saveServiceDialog() {
			if(!this.editedServItem.serviceName) {
				alert('서비스명 값을 입력하세요');
				return;
			}
			
			for(var i = 0; i < this.services.length; i++) {
				if(this.services[i].serviceName == this.editedServItem.serviceName) {
					alert('존재하는 Service입니다. 다시 입력하세요.');
					return;
				}
			}
			
			this.services.push(this.editedServItem);
			this.services[this.services.length -1].classifications = new Array();
			this.closeServiceDialog();
		},
		deleteService() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.services.indexOf(this.selected[i]);
					this.services.splice(index, 1);
				}
				
				this.selected = [];
			}
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedServIndex = this.services.indexOf(this.selected[0]);
				this.editedAppsIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.applicationDialog = true;
			}
		},
		closeAppsDialog() {
			this.applicationDialog = false;
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedServIndex = -1;
				this.editedAppsIndex = -1;
			}, 300);
		},
		editAppsItem (servItem, appItem, appIndex) {
			this.editedServIndex = this.services.indexOf(servItem);
			this.editedAppsIndex = appIndex;
			this.editedAppsItem = Object.assign({}, appItem);
			this.applicationDialog = true;
		},
		saveAppsDialog () {
			if(!this.editedAppsItem.classificationName) {
				alert('Classification 값을 입력하세요');
				return;
			}
			if(!this.editedAppsItem.classificationType) {
				alert('Classification Type 값을 선택하세요');
				return;
			}
			
			if (this.editedAppsIndex > -1) {
				this.$set(this.services[this.editedServIndex].classifications, this.editedAppsIndex, this.editedAppsItem);
			} else {
				this.services[this.editedServIndex].classifications.push(this.editedAppsItem);
			}
			this.closeAppsDialog();
		},
		deleteAppItem(servItem, appItem, appIndex) {
			const servIndex = this.services.indexOf(servItem);
			confirm('삭제하시겠습니까?') && this.services[servIndex].classifications.splice(appIndex, 1);
		}
	}
}
</script>

<style>
</style>
