<template>
	<div>
	  <ValidationObserver ref="obsMain">
        <v-card slot-scope="{ invalid, validated }">
          <v-card-title>{{ formTitle }}</v-card-title>
          <v-card-text>
		    <v-layout wrap>
			  <v-flex xs12 sm6 md6>
				<VTextFieldWithValidation rules="" data-vv-name="version" v-model="productMspCostVersion.version" label="버전" readonly/>
			  </v-flex>
			  <v-flex xs12 sm6 md6>
				<VTextFieldWithValidation rules="" data-vv-name="createdDt" v-model="productMspCostVersion.createdDt" label="생성일시" readonly/>
			  </v-flex>
			  <v-flex xs12 sm12>
				<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="productMspCostVersion.description" label="설명"/>
			  </v-flex>
			</v-layout>

		   <v-data-table
		    class="elevation-1"
		    v-model="selected"
		    :headers="headers"
		    :items="productMspCostVersion.products"
		    hide-actions>
		    
			<template v-slot:headers="props">
			  <tr>
				<th :class="headerClass" v-if="editable"></th>
				<th :class="headerClass">Product</th>
				<th :class="headerClass">Alias</th>
				<th :class="headerClass">Mem Spec(GB) 초과</th>
				<th :class="headerClass">MSP Cost</th>
				<th :class="headerClass" v-if="editable">Actions</th>
			  </tr>
			</template>
		    <template v-slot:items="props">
		    
		      <template v-if="props.item.mspCosts.length == 0">
		        <tr>
		          <td v-if="editable">
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="font-weight-bold text-xs-center">{{ props.item.name }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center" v-if="editable"></td>
		        </tr>
		      </template>
		      <template v-else>
		        <template v-for="(mspCosts, index) in props.item.mspCosts">
		        <tr>
		          <td v-if="editable && index == 0" v-bind:rowspan="props.item.mspCosts.length">
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="font-weight-bold text-xs-center" v-if="index == 0" v-bind:rowspan="props.item.mspCosts.length">{{ props.item.name }}</td>
			      <td class="text-xs-left">{{ mspCosts.alias }}</td>
			      <td class="text-xs-center">{{ mspCosts.memory }}</td>
			      <td class="text-xs-center">{{ mspCosts.cost | formatNumber }}</td>
				  <td class="justify-center layout px-0" v-if="editable">
					<v-icon small class="mr-2" @click="editItem(props.item, mspCosts)">edit</v-icon>
					<v-icon small @click="deleteItem(props.item, mspCosts)">delete</v-icon>
				  </td>
		        </tr>
		        </template>
		      </template>
		      
		    </template>
		  </v-data-table>
 
          </v-card-text>
		  <v-card-actions>
		    <v-btn small left color="primary" v-if="editable" @click="openDialog" v-bind:disabled="selected.length != 1">Mem Spec 추가</v-btn>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" v-if="editable" @click="save" v-bind:disabled="invalid">저장</v-btn>
		    <v-btn color="blue darken-1" flat v-if="!editable" @click="closeDetailDialog">닫기</v-btn>
		  </v-card-actions>
        </v-card>
      </ValidationObserver>
      
	  <v-dialog v-model="mspCostDialog" max-width="500px">
 	 	<ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
		      <v-card-title>{{ formDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-flex xs12>
			  	  <VTextFieldWithValidation rules="required|max:10" data-vv-name="alias" v-model="editedItem.alias" label="Alias"/>
			    </v-flex>
			    <v-flex xs12>
			  	  <VTextFieldWithValidation rules="required|numeric" data-vv-name="memory" v-model="editedItem.memory" label="Mem Spec(GB) 초과"/>
			    </v-flex>
			    <v-flex xs12>
			  	  <VTextFieldWithValidation rules="required|numeric" data-vv-name="cost" v-model="editedItem.cost" label="MSP Cost"/>
			    </v-flex>
			  </v-card-text>
			  <v-card-actions>
			    <v-spacer></v-spacer>
			    <v-btn color="blue darken-1" flat @click="closeDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		</ValidationObserver>
	  </v-dialog>
	</div>
</template>

<script>
export default {
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
		versionId: function() {
			this.$http.get('/platform/msp/history/' + this.versionId).then(response => {
				this.productMspCostVersion = Object.assign({}, response.data);
			})
		},
		mspCostDialog (val) {
			val || this.closeDialog();
		}
    },
	created () {
		this.initialize();
    },
	methods: {
		initialize () {
			this.$http.get('/platform/msp').then(response => {
				this.productMspCostVersion = response.data;
			})
		},
		save() {
			this.$refs.obsMain.validate().then(valid => {
				if(valid) {
					if(confirm('변경된 내용을 저장하시겠습니까?')) {
						this.$http.put('/platform/msp', this.productMspCostVersion).then(response => {
							alert("저장되었습니다.");
							this.initialize();
							this.selected = [];
							this.$emit('fire-saved');
							this.$refs.obsMain.reset();
						})
					}
				}
			});
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
			this.$refs.obs.reset();
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedProductIndex = -1;
				this.editedIndex = -1;
			}, 300);
		},
		saveDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedIndex > -1) {
						Object.assign(this.productMspCostVersion.products[this.editedProductIndex].mspCosts[this.editedIndex], this.editedItem);
					} else {
						this.productMspCostVersion.products[this.editedProductIndex].mspCosts.push(this.editedItem);
					}
					this.closeDialog();
				}
			});
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