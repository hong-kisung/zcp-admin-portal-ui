<template>
    <div>
        <b-form>
            <b-form-group label="버전" label-for="version" :label-cols="3">
                <b-form-input type="text" id="version" v-model="vmData.version" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                <b-form-input type="text" id="createdDt" v-model="vmData.createdDt" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="설명" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" v-model="vmData.description" placeholder="설명을 입력해주세요."></b-form-input>
            </b-form-group>
        </b-form>
        <div class="mb-3">
            <b-button variant="success" size="sm" v-if="editable" @click="openDialog"><i class="icon-plus"></i> VM 추가</b-button>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th rowspan="2">Name</th>
                        <th rowspan="2">Cores</th>
                        <th rowspan="2">Memory(GB)</th>
                        <th rowspan="2">NW Speed(Gbps)</th>
                        <th rowspan="2">Available CPU</th>
                        <th rowspan="2">Available Memory(GB)</th>
                        <th colspan="3">Shared</th>
                        <th colspan="3">Dedicated</th>
                        <th rowspan="2" v-if="editable">Actions</th>
                    </tr>
                    <tr>
                        <th>List Price($)/Hourly</th>
                        <th>Graduated Tier Price(₩)/Monthly</th>
                        <th>Graduated Tier SK Price(₩)/Monthly</th>
                        <th>List Price($)/Hourly</th>
                        <th>Graduated Tier Price(₩)/Monthly</th>
                        <th>Graduated Tier SK Price(₩)/Monthly</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in vmData.vms">
                        <td>{{ item.name }}</td>
                        <td class="text-right">{{ item.core }}</td>
                        <td class="text-right">{{ item.memory }}</td>
                        <td class="text-right">{{ item.nwSpeed }}</td>
                        <td class="text-right">{{ item.core | toAvailableCpu(iksGeneral.platformCpuPerWorker) }}</td>
                        <td class="text-right">{{ item.memory | toAvailableMemory(iksGeneral.platformMemoryPerWorker) }}</td>
                        <td class="text-right">{{ item.sharedListPricePerHour | formatNumber | toUSD }}</td>
                        <td class="text-right">{{ item.sharedGraduatedTierPricePerMonth | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.sharedGraduatedTierPricePerMonth | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.dedicatedListPricePerHour | formatNumber | toUSD }}</td>
                        <td class="text-right">{{ item.dedicatedGraduatedTierPricePerMonth | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ item.dedicatedGraduatedTierPricePerMonth | toSKPrice(iksGeneral.ibmDcRate) | formatNumber | toKRW }}</td>
                        <td class="text-center" v-if="editable">
                            <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editItem(item)"><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm" class="mr-1" v-on:click="deleteItem(item)"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </VuePerfectScrollbar>
        
        <!-- modal : VM 추가 -->
        <b-modal id="vm-modal" scrollable size="lg" title="VM" centered no-close-on-backdrop v-model="dialog" @close="closeDialog">
            <b-form>
                <b-form-group label="Name" label-for="name" :label-cols="7" label-class="required">
                    <b-form-input type="text" id="name" v-model="editedItem.name" required></b-form-input>
                    <b-form-invalid-feedback id="name">
                        Name을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Cores" label-for="core" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="core" v-model="editedItem.core" required></b-form-input>
                    <b-form-invalid-feedback id="core">
                        Cores 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Memory (GB)" label-for="memory" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="memory" v-model="editedItem.memory" required></b-form-input>
                    <b-form-invalid-feedback id="memory">
                        Memory (GB) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="NW Speed (Gbps)" label-for="nwSpeed" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="nwSpeed" v-model="editedItem.nwSpeed" required></b-form-input>
                    <b-form-invalid-feedback id="nwSpeed">
                        NW Speed (Gbps) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Shared List Price($)/Hourly" label-for="sharedListPricePerHour" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="sharedListPricePerHour" v-model="editedItem.sharedListPricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="sharedListPricePerHour">
                        Shared List Price($)/Hourly 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Shared Graduated Tier Price(₩)/Monthly" label-for="sharedGraduatedTierPricePerMonth" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="sharedGraduatedTierPricePerMonth" v-model="editedItem.sharedGraduatedTierPricePerMonth" required></b-form-input>
                    <b-form-invalid-feedback id="sharedGraduatedTierPricePerMonth">
                        Shared Graduated Tier Price(₩)/Monthly 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Dedicated List Price($)/Hourly" label-for="dedicatedListPricePerHour" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="dedicatedListPricePerHour" v-model="editedItem.dedicatedListPricePerHour" required></b-form-input>
                    <b-form-invalid-feedback id="dedicatedListPricePerHour">
                        Dedicated List Price($)/Hourly 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Dedicated Graduated Tier Price(₩)/Monthly" label-for="dedicatedGraduatedTierPricePerMonth" :label-cols="7" label-class="required">
                    <b-form-input type="number" id="dedicatedGraduatedTierPricePerMonth" v-model="editedItem.dedicatedGraduatedTierPricePerMonth" required></b-form-input>
                    <b-form-invalid-feedback id="dedicatedGraduatedTierPricePerMonth">
                        Dedicated Graduated Tier Price(₩)/Monthly 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeDialog">취소</b-button>
                <b-button variant="primary" @click="saveDialog"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : VM 추가 -->
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'

export default {
 	mixins: [perfectScrollbar],
    components: {
    	VuePerfectScrollbar
    },
    data()  {
        return {
	 		dialog: false,
			editedIndex: -1,
			editedItem: {},
			defaultItem: {}
        }
    },
	props: [
		'vmData',
		'editable'
	],
    computed: {
		iksGeneral: function() {
			return this.$store.state.estimate.general;
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
    	}
    },
    methods: {
		editItem (item) {
			this.editedIndex = this.vmData.vms.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		deleteItem (item) {
			const index = this.vmData.vms.indexOf(item);
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.vmData.vms.splice(index, 1);
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
			if(!this.editedItem.name) {
				this.$zadmin.alert('Name 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.core) {
				this.$zadmin.alert('Cores 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.memory) {
				this.$zadmin.alert('Memory 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.nwSpeed) {
				this.$zadmin.alert('NW Speed (Gbps) 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.sharedListPricePerHour) {
				this.$zadmin.alert('Shared List Price($)/Hourly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.sharedGraduatedTierPricePerMonth) {
				this.$zadmin.alert('Shared Graduated Tier Price(₩)/Monthly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.dedicatedListPricePerHour) {
				this.$zadmin.alert('Dedicated List Price($)/Hourly 값을 입력하세요');
				e.preventDefault()
				return
			}
			if(!this.editedItem.dedicatedGraduatedTierPricePerMonth) {
				this.$zadmin.alert('Dedicated Graduated Tier Price(₩)/Monthly 값을 입력하세요');
				e.preventDefault()
				return
			}

			if (!this.vmData.vms) {
				this.vmData.vms = new Array()
			}
			if (this.editedIndex > -1) {
				Object.assign(this.vmData.vms[this.editedIndex], this.editedItem);
			} else {
				this.vmData.vms.push(this.editedItem);
			}
			this.closeDialog();
		}
    }
}
</script>