<template>
    <div>
        <b-form>
            <b-form-group label="버전" label-for="version" :label-cols="3">
                <b-form-input type="text" id="version" v-model="productMspCostVersion.version" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                <b-form-input type="text" id="createdDt" v-model="productMspCostVersion.createdDt" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="설명" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" v-model="productMspCostVersion.description" placeholder="설명을 입력해주세요."></b-form-input>
            </b-form-group>
        </b-form>
        <div class="mb-3">
            <b-button variant="success" size="sm"  v-if="editable" v-bind:disabled="selected.length != 1" @click="openDialog"><i class="icon-plus"></i> Mem Spec 추가</b-button>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Alias</th>
                        <th>Memory Spec(GB) 초과</th>
                        <th>MSP 비용(₩)</th>
                        <th v-if="editable">Actions</th>
                    </tr>
                </thead>
                <tbody>
                	<template v-for="(item) in productMspCostVersion.products">
                		<template v-if="item.mspCosts.length == 0">
                    <tr>
                        <th class="bg-dark">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected">
                                <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
                            </div>
                        </th>
                        <td></td>
                        <td class="text-center"></td>
                        <td class="text-right"></td>
                        <td class="text-center" v-if="editable"></td>
                     </tr>
                		</template>
                		<template v-else>
                			<template v-for="(mspCosts, index) in item.mspCosts">
                     <tr>
                        <th class="bg-dark" v-if="index == 0" :rowspan="item.mspCosts.length">
                        		<template v-if="editable && index == 0">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected">
                                <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
                            </div>
                            	</template>
                            	<template v-else>
                            		{{ item.name }}
                            	</template>
                        </th>
                        <td>{{ mspCosts.alias }}</td>
                        <td class="text-center">{{ mspCosts.memory }}</td>
                        <td class="text-right">{{ mspCosts.cost | formatNumber | toKRW }}</td>
                        <td class="text-center" v-if="editable">
                            <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editItem(item, mspCosts)"><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm" class="mr-1" v-on:click="deleteItem(item, mspCosts)"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                			</template>
                    	</template>
                    </template>
                </tbody>
            </table>
        </VuePerfectScrollbar>
        
        <!-- modal : Mem Spec 추가 -->
        <b-modal id="mem-modal" scrollable title="MSP Cost" centered no-close-on-backdrop v-model="mspCostDialog" @close="closeDialog">
            <b-form>
                <b-form-group label="Alias" label-for="alias" :label-cols="5" label-class="required">
                    <b-form-input type="text" id="alias" v-model="editedItem.alias" required></b-form-input>
                    <b-form-invalid-feedback id="alias">
                        Alias를 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Memory Spec(GB) 초과" label-for="memory" :label-cols="5" label-class="required">
                    <b-form-input type="number" id="memory" v-model="editedItem.memory" required></b-form-input>
                    <b-form-invalid-feedback id="memory">
                        Memory Spec(GB) 초과 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="MSP 비용(₩)" label-for="cost" :label-cols="5" label-class="required">
                    <b-form-input type="number" id="cost" v-model="editedItem.cost" required></b-form-input>
                    <b-form-invalid-feedback id="cost">
                        MSP 비용(₩) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeDialog">취소</b-button>
                <b-button variant="primary" @click="saveDialog"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    data()  {
        return {
			selected: [],
			editedIndex: -1,
			editedProductIndex: -1,
			editedItem: {},
			defaultItem: {},
			mspCostDialog: false
        }
    },
    components: {
        VuePerfectScrollbar
    },
	props: [
		'productMspCostVersion',
		'editable'
	],
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        }
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
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
      			this.$zadmin.alert('Alias를 입력하세요');
      			e.preventDefault()
      			return;
      		}
      		if(!this.editedItem.memory) {
      			this.$zadmin.alert('Mem Spec(GB) 초과를 입력하세요');
      			e.preventDefault()
      			return;
      		}
      		if(!this.editedItem.cost) {
      			this.$zadmin.alert('MSP 비용을 입력하세요');
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
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.productMspCostVersion.products[productIndex].mspCosts.splice(index, 1);
			})
		}
    }
}
</script>