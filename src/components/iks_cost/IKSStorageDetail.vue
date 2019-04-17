<template>
	<div>
	  <ValidationObserver ref="obsMain">
        <v-card slot-scope="{ invalid, validated }">
		  <v-card-title>{{ formTitle }}</v-card-title>
		  <v-card-text>
		    <v-layout wrap>
			  <v-flex xs12 sm6 md6>
				<v-text-field v-model="storageData.version" label="버전" readonly/>
			  </v-flex>
			  <v-flex xs12 sm6 md6>
				<v-text-field v-model="storageData.createdDt" label="생성일시" readonly/>
			  </v-flex>
			  <v-flex xs12 sm12>
				<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="storageData.description" label="설명"/>
			  </v-flex>
			  <v-flex xs12 sm12>
				<VTextFieldWithValidation rules="required|decimal" data-vv-name="objectStoragePricePerDay" v-model="storageData.objectStoragePricePerDay" label="Object Storage 비용(Daily)" suffix="$"/>
			  </v-flex>
			</v-layout>
			  <v-data-table
				:headers="headers"
				:items="storageData.fileStorages"
				class="elevation-1"
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass" rowspan="2">Disk<br>Size(GB)</th>
					<th :class="headerClass" colspan="4">0.25 IOPS</th>
					<th :class="headerClass" colspan="4">2 IOPS</th>
					<th :class="headerClass" colspan="4">4 IOPS</th>
					<th :class="headerClass" colspan="4">10 IOPS</th>
					<th :class="headerClass" rowspan="2" v-if="editable">Actions</th>
				  </tr>
				  <tr>
					<th :class="headerClass">Total<br>IOPS</th>
					<th :class="headerClass">Hourly($)</th>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
					<th :class="headerClass">Total<br>IOPS</th>
					<th :class="headerClass">Hourly($)</th>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
					<th :class="headerClass">Total<br>IOPS</th>
					<th :class="headerClass">Hourly($)</th>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
					<th :class="headerClass">Total<br>IOPS</th>
					<th :class="headerClass">Hourly($)</th>
					<th :class="headerClass">Monthly</th>
					<th :class="headerClass">Yearly</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				  <td class="text-xs-left">{{ props.item.disk }}</td>
				  <td class="text-xs-right">{{ props.item.disk * 0.25 }}</td>
				  <td class="text-xs-right">{{ props.item.iops1PricePerHour }}</td>
				  <td class="text-xs-right">{{ props.item.iops1PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.iops1PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.disk * 2 }}</td>
				  <td class="text-xs-right">{{ props.item.iops2PricePerHour }}</td>
				  <td class="text-xs-right">{{ props.item.iops2PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.iops2PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.disk * 4 }}</td>
				  <td class="text-xs-right">{{ props.item.iops3PricePerHour }}</td>
				  <td class="text-xs-right">{{ props.item.iops3PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.iops3PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.disk * 10 }}</td>
				  <td class="text-xs-right">{{ props.item.iops4PricePerHour }}</td>
				  <td class="text-xs-right">{{ props.item.iops4PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | formatNumber }}</td>
				  <td class="text-xs-right">{{ props.item.iops4PricePerHour | toMonthlyPrice(iksGeneral.ibmDcRate, iksGeneral.exchangeRate) | toYearlyPrice | formatNumber }}</td>
				  <td class="justify-center layout px-0" v-if="editable">
					<v-icon
					  small
					  class="mr-2"
					  @click="editItem(props.item)"
					>
					  edit
					</v-icon>
					<v-icon
					  small
					  @click="deleteItem(props.item)"
					>
					  delete
					</v-icon>
				  </td>
				</template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="18">
        			No data available
      			  </td>
    			</template>
			  </v-data-table>
	      </v-card-text>
 	      <v-card-actions>
 	        <v-btn small left color="primary" v-if="editable" @click="openDialog">Storage 추가</v-btn>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" v-if="editable" @click="save" v-bind:disabled="invalid">저장</v-btn>
		    <v-btn color="blue darken-1" flat v-if="!editable" @click="closeDetailDialog">닫기</v-btn>
	      </v-card-actions>
        </v-card>
      </ValidationObserver>
        
	  <v-dialog v-model="dialog" max-width="400px">
	      <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
			  <v-card-title>{{ formDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-container grid-list-md>
			  	  <v-layout wrap>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|numeric" data-vv-name="disk" v-model="editedItem.disk" label="Disk Size(GB))" />
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|decimal" data-vv-name="iops1PricePerHour" v-model="editedItem.iops1PricePerHour" label="0.25 IOPS Hourly" suffix="$" />
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|decimal" data-vv-name="iops2PricePerHour" v-model="editedItem.iops2PricePerHour" label="2 IOPS Hourly" suffix="$" />
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|decimal" data-vv-name="iops3PricePerHour" v-model="editedItem.iops3PricePerHour" label="4 IOPS Hourly" suffix="$" />
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|decimal" data-vv-name="iops4PricePerHour" v-model="editedItem.iops4PricePerHour" label="10 IOPS Hourly" suffix="$" />
				    </v-flex>
				  </v-layout>
			    </v-container>
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
		dialog: false,
		editedIndex: -1,
		editedItem: {},
		defaultItem: {},
		
		storageData:{},
		iksGeneral: {}
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
    watch: {
		versionId: function() {
			if(this.versionId == undefined) {
				this.storageData = {};
				return;
			}
			this.$http.get('/api/iks_costs/storage/history/' + this.versionId).then(response => {
				if(response && response.data) {
					this.storageData = Object.assign({}, response.data);
				}
			})
		},
		dialog (val) {
			val || this.closeDialog();
		}
    },
    filters: {
    	toMonthlyPrice: function(value, dcRate, exchangeRate) {
    		return Math.ceil(value * 24 * 31 * (1 - dcRate/100) * exchangeRate);
    	},
    	toYearlyPrice: function(value) {
    		return value * 12;
    	}
    },
    created () {
		this.initialize();
    },
	methods: {
		initialize () {
			this.$http.get('/api/general').then(response => {
				if(response && response.data) {
					this.iksGeneral = response.data;
				}
			})
			this.$http.get('/api/iks_costs/storage').then(response => {
				if(response && response.data) {
					this.storageData = response.data;
				}
			})
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
			this.$refs.obs.reset();
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},
		saveDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedIndex > -1) {
						Object.assign(this.storageData.fileStorages[this.editedIndex], this.editedItem);
					} else {
						this.storageData.fileStorages.push(this.editedItem);
					}
					this.closeDialog();
				}
			});
		},
		save () {
			this.$refs.obsMain.validate().then(valid => {
				if(valid) {
					if(confirm('변경된 내용을 저장하시겠습니까?')) {
						this.$http.put('/api/iks_costs/storage', this.storageData).then(response => {
							alert("저장되었습니다.");
							this.initialize();
							this.$refs.obsMain.reset();
							this.$emit('fire-saved');
						})
					}
				}
			});
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>
