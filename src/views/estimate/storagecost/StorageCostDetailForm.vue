<template>
    <div>
        <b-form>
            <b-form-group label="버전" label-for="version" :label-cols="3">
                <b-form-input type="text" id="version" v-model="storageData.version" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                <b-form-input type="text" id="createdDt" v-model="storageData.createdDt" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="설명" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" v-model="storageData.description" placeholder="설명을 입력해주세요."></b-form-input>
            </b-form-group>
            <b-form-group label="Object Storage Price(₩)/Monthly" label-for="objectStoragePricePerMonth" :label-cols="3" label-class="required">
                <b-form-input type="number" id="objectStoragePricePerMonth" v-model="storageData.objectStoragePricePerMonth" required></b-form-input>
                <b-form-invalid-feedback id="objectStoragePricePerMonth">
                    Object Storage Price(₩)/Monthly 값을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <div class="mb-3">
            <b-button variant="success" size="sm" v-if="editable" @click="openDialog"><i class="icon-plus"></i> File Storage 추가</b-button>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th rowspan="2">Disk Size(GB)</th>
                        <th colspan="3">0.25 IOPS</th>
                        <th colspan="3">2 IOPS</th>
                        <th colspan="3">4 IOPS</th>
                        <th colspan="3">10 IOPS</th>
                        <th rowspan="2" v-if="editable">Actions</th>
                    </tr>
                    <tr>
                        <th>List Price($)/Hourly</th>
                        <th>List Price(₩)/Monthly</th>
                        <th>SK Price(₩)/Monthly</th>
                        <th>List Price($)/Hourly</th>
                        <th>List Price(₩)/Monthly</th>
                        <th>SK Price(₩)/Monthly</th>
                        <th>List Price($)/Hourly</th>
                        <th>List Price(₩)/Monthly</th>
                        <th>SK Price(₩)/Monthly</th>
                        <th>List Price($)/Hourly</th>
                        <th>List Price(₩)/Monthly</th>
                        <th>SK Price(₩)/Monthly</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in storageData.fileStorages">
                        <td>{{ item.disk }}</td>
                        <td class="text-right">{{ item.iops1PricePerHour | toUSD }}</td>
                        <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops1PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops2PricePerHour | toUSD }}</td>
                        <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops2PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops3PricePerHour | toUSD }}</td>
                        <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops3PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops4PricePerHour | toUSD }}</td>
                        <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.iops4PricePerHour | toMonthlyPrice(iksGeneral.exchangeRate) | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-center" v-if="editable">
                            <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editItem(item)"><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm" class="mr-1" v-on:click="deleteItem(item)"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </VuePerfectScrollbar>
        
        <!-- modal : File Storage 추가 -->
        <b-modal id="storage-modal" scrollable title="File Storage" centered no-close-on-backdrop v-model="dialog" @close="closeDialog" @cancel="closeDialog" @ok="saveDialog">
            <b-form>
                <b-form-group label="Disk Size(GB)" label-for="disk" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="disk" v-model="editedItem.disk" required></b-form-input>
                    <b-form-invalid-feedback id="disk">
                        Disk Size(GB) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="0.25 IOPS Hourly($)" label-for="iops1PricePerHour" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="iops1PricePerHour" v-model="editedItem.iops1PricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="iops1PricePerHour">
                        0.25 IOPS Hourly($) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="2 IOPS Hourly($)" label-for="iops2PricePerHour" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="iops2PricePerHour" v-model="editedItem.iops2PricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="iops2PricePerHour">
                        2 IOPS Hourly($) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="4 IOPS Hourly($)" label-for="iops3PricePerHour" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="iops3PricePerHour" v-model="editedItem.iops3PricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="iops3PricePerHour">
                        4 IOPS Hourly($) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="10 IOPS Hourly($)" label-for="iops4PricePerHour" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="iops4PricePerHour" v-model="editedItem.iops4PricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="iops4PricePerHour">
                        10 IOPS Hourly($) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeDialog">취소</b-button>
                <b-button variant="primary" @click="saveDialog"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : File Storage 추가 -->
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    data()  {
        return {
			dialog: false,
			editedIndex: -1,
			editedItem: {},
			defaultItem: {}
        }
    },
    components: {
        VuePerfectScrollbar
    },
	props: [
		'storageData',
		'editable'
	],
    computed: {
		iksGeneral: function() {
			return this.$store.state.estimate.general;
		},
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
		editItem (item) {
			this.editedIndex = this.storageData.fileStorages.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem (item) {
			const index = this.storageData.fileStorages.indexOf(item);
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.storageData.fileStorages.splice(index, 1);
			})
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
			if(!this.editedItem.disk) {
				this.$zadmin.alert('Disk Size(GB) 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops1PricePerHour) {
				this.$zadmin.alert('0.25 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops2PricePerHour) {
				this.$zadmin.alert('2 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops3PricePerHour) {
				this.$zadmin.alert('4 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedItem.iops4PricePerHour) {
				this.$zadmin.alert('10 IOPS Hourly 값을 입력하세요');
				e.preventDefault()
				return;
			}
			
			if (!this.storageData.fileStorages) {
				this.storageData.fileStorages = new Array()
			}
			if (this.editedIndex > -1) {
				Object.assign(this.storageData.fileStorages[this.editedIndex], this.editedItem);
			} else {
				this.storageData.fileStorages.push(this.editedItem);
			}
			this.closeDialog();
		}
    }
}
</script>