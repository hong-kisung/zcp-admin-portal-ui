<template>
<div>
  <b-card :header="title">
    <b-form>
      <b-form-group label="버전" label-for="version" :label-cols="3" >
        <b-form-input id="version" type="text" v-model="productMspCostVersion.version" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="생성일시" label-for="createdDt" :label-cols="3" >
        <b-form-input id="createdDt" type="text" v-model="productMspCostVersion.createdDt" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="3" >
        <b-form-input id="description" type="text" v-model="productMspCostVersion.description"></b-form-input>
      </b-form-group>
    </b-form>
	<b-row>
	  <b-col>
	    <div class="table-responsive-sm">
	      <table class="table b-table table-bordered table-sm">
			  <colgroup>
			    <col width="200">
			  </colgroup>
		      <thead>
		        <tr>
		          <th class="text-center">Product</th>
		          <th class="text-center">Alias</th>
		          <th class="text-center">Memory Spec(GB) 초과</th>
		          <th class="text-center">MSP 비용(₩)</th>
		          <th class="text-center" v-if="editable">Actions</th>
		        </tr>
		      </thead>
		      <tbody>
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
				      <td class="text-right">{{ mspCosts.cost | formatNumber | toKRW }}</td>
					  <td class="text-center" v-if="editable">
					    <b-link href="#" class="card-header-action" v-on:click="editItem(item, mspCosts)">
					      <i class="fa fa-pencil fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="deleteItem(item, mspCosts)">
					      <i class="fa fa-times fa-sm"></i>
		                </b-link>
					  </td>
			        </tr>
			        </template>
			      </template>
			    </template>

		      </tbody>
		    </table>
	    </div>
	  </b-col>
	</b-row>
    <b-row v-if="editable">
      <b-col cols="9">
	    <b-button size="sm" variant="secondary" class="m-1" v-if="editable" v-bind:disabled="selected.length != 1" @click="openDialog">Mem Spec 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
	    <b-button size="sm" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>
		    
  <b-modal centered no-close-on-backdrop title="MSP Cost" v-model="mspCostDialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
    <b-form>
      <b-form-group label="Alias" label-for="alias" label-class="astertisk" :label-cols="5" >
        <b-form-input id="alias" type="text" v-model="editedItem.alias"></b-form-input>
      </b-form-group>
      <b-form-group label="Memory Spec(GB) 초과" label-for="memory" label-class="astertisk" :label-cols="5" >
        <b-form-input id="memory" type="number" v-model="editedItem.memory"></b-form-input>
      </b-form-group>
      <b-form-group label="MSP 비용(₩)" label-for="cost" label-class="astertisk" :label-cols="5" >
        <b-form-input id="cost" type="number" v-model="editedItem.cost"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>

</div>
</template>

<script>
export default {
	data: () => ({
		title: '',
		selected: [],
		editedIndex: -1,
		editedProductIndex: -1,
		editedItem: {},
		defaultItem: {},
		mspCostDialog: false
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		productMspCostVersion: function() {
			if(this.versionId) {
				return this.$store.state.estimate.productMspCostHistoryDetail;
			} else {
				return this.$store.state.estimate.productMspCost;
			}
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
			this.title = this.editable ? 'MSP 비용의 최신 버전을 조회 및 수정합니다.' : ''
			
			if(this.versionId) {
				this.$store.dispatch('estimate/getProductMspCostHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getProductMspCost')
			}
		},
		save() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveProductMspCost', {productMspCostInfo: this.productMspCostVersion})
				this.selected = [];
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
		saveDialog (e) {
      		if(!this.editedItem.alias) {
      			alert('Alias를 입력하세요');
      			e.preventDefault()
      			return;
      		}
      		if(!this.editedItem.memory) {
      			alert('Mem Spec(GB) 초과를 입력하세요');
      			e.preventDefault()
      			return;
      		}
      		if(!this.editedItem.cost) {
      			alert('MSP 비용을 입력하세요');
      			e.preventDefault()
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