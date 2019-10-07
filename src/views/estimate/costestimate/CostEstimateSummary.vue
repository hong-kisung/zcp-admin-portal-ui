<template>
    <div>
        <b-form>
            <b-form-group label="버전" label-for="version" :label-cols="3">
                <b-form-input type="text" id="version" v-model="estimate.version" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                <b-form-input type="text" id="createdDt" v-model="estimate.createdDt" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="라벨" label-for="label" :label-cols="3">
                <b-form-input type="text" id="label" v-model="estimate.label"></b-form-input>
            </b-form-group>
            <b-form-group label="설명" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" v-model="estimate.description"></b-form-input>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3" v-if="editable && iksGeneral.id > 0 && estimate.generalId==iksGeneral.id">
                        <label class="col-form-label">기준정보 버전 <span class="text-warning font-xs ml-2"><i class="icon-info"></i> 최신 버전입니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && !iksGeneral.id || iksGeneral.id==0"">
                        <label class="col-form-label">기준정보 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && iksGeneral.id > 0 && estimate.generalId!=iksGeneral.id">
                        <label class="col-form-label">기준정보 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.generalId > 0" @click="generalDialog=true; generalDetail=generalHistoryDetail"><i class="icon-info"></i> 현재버전({{ estimate.generalVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && iksGeneral.id > 0 && estimate.generalId!=iksGeneral.id" @click="generalDialog=true; generalDetail=iksGeneral"><i class="icon-info"></i> 최신버전({{ iksGeneral.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId==vmVersion.id">
                        <label class="col-form-label">VM 버전 <span class="text-warning font-xs ml-2"><i class="icon-info"></i> 최신 버전입니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && !vmVersion.id || vmVersion.id==0"">
                        <label class="col-form-label">VM 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId!=vmVersion.id">
                        <label class="col-form-label">VM 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.iksVmVersionId > 0" @click="iksVmDialog=true; iksVmDetail=vmHistoryDetail"><i class="icon-info"></i> 현재버전({{ estimate.iksVmVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId!=vmVersion.id" @click="iksVmDialog=true; iksVmDetail=vmVersion"><i class="icon-info"></i> 최신버전({{ vmVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId==storageVersion.id">
                        <label class="col-form-label">Storage 버전 <span class="text-warning font-xs ml-2"><i class="icon-info"></i> 최신 버전입니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && !storageVersion.id || storageVersion.id==0"">
                        <label class="col-form-label">Storage 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId!=storageVersion.id">
                        <label class="col-form-label">Storage 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.iksStorageVersionId > 0" @click="iksStorageDialog=true; iksStorageDetail=storageHistoryDetail"><i class="icon-info"></i> 현재버전({{ estimate.iksStorageVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId!=storageVersion.id" @click="iksStorageDialog=true; iksStorageDetail=storageVersion"><i class="icon-info"></i> 최신버전({{ storageVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId==productMspCostVersion.id">
                        <label class="col-form-label">MSP 비용 버전 <span class="text-warning font-xs ml-2"><i class="icon-info"></i> 최신 버전입니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && !productMspCostVersion.id || productMspCostVersion.id==0"">
                        <label class="col-form-label">MSP 비용  버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                    </b-col>
                    <b-col sm="3" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId!=productMspCostVersion.id">
                        <label class="col-form-label">MSP 비용  버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.mspCostVersionId > 0" @click="mspCostDialog=true; mspCostDetail=productMspCostHistoryDetail"><i class="icon-info"></i> 현재버전({{ estimate.mspCostVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId!=productMspCostVersion.id" @click="mspCostDialog=true; mspCostDetail=productMspCostVersion"><i class="icon-info"></i> 최신버전({{ productMspCostVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
        </b-form>
        <hr>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>Environment</th>
                        <th>Product</th>
                        <th>Cloud 사용료(₩)</th>
                        <th>인건비(₩)</th>
                        <th>월 비용 합계(₩)</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="bg-secondary">
                        <th colspan="2" class="text-right">계</th>
                        <td class="text-right font-weight">{{ estimate.summary.sumCloudCost | formatNumber | toKRW }}</td>
                        <td class="text-right font-weight">{{ estimate.summary.sumLaborCost | formatNumber | toKRW }}</td>
                        <td class="text-right font-weight">{{ estimate.summary.sumTotalCost | formatNumber | toKRW }}</td>
                    </tr>
                </tfoot>
                <tbody>
                	<template v-for="(item) in estimate.summary.environments">
                		<template v-for="(product, productIndex) in item.products">
                    <tr>
                        <th class="bg-dark" v-if="productIndex == 0" :rowspan="item.products.length">{{ item.environmentName }}</th>
                        <th>{{ product.estimateType == 'CloudZService' ? product.productName : product.productName + ' Storage' }}</th>
                        <td class="text-right">{{ product.cloudCost | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ product.laborCost | formatNumber | toKRW }}</td>
                        <td class="text-right">{{ product.totalCost | formatNumber | toKRW }}</td>
                    </tr>
                    	</template>
                    </template>
                </tbody>
            </table>
        </VuePerfectScrollbar>
        
        <!-- modal : 기준정보 -->
        <b-modal id="basic-modal" scrollable title="기준정보" size="lg" centered v-model="generalDialog">
            <standard-info-detail v-bind:generalInfo="generalDetail"
            					  v-bind:editable="false" />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="generalDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : 기준정보 -->
        
        <!-- modal : IKS VM -->
        <b-modal id="iks-vm-modal" scrollable title="IKS VM" size="xl" centered v-model="iksVmDialog">
            <vm-cost-detail v-bind:vmData="iksVmDetail"
            				v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="iksVmDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : IKS VM -->
        
        <!-- modal : IKS Storage -->
        <b-modal id="iks-storage-modal" scrollable title="IKS Storage" size="xl" centered v-model="iksStorageDialog">
            <storage-cost-detail v-bind:storageData="iksStorageDetail"
            					 v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="iksStorageDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : IKS Storage -->
        
        <!-- modal : MSP 비용 -->
        <b-modal id="msp-modal" scrollable title="MSP 비용" size="lg" centered v-model="mspCostDialog">
            <msp-cost-detail v-bind:productMspCostVersion="mspCostDetail"
            				 v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="mspCostDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import StandardInfoDetail from './../StandardInfoDetail'
import VmCostDetail from './../VmCostDetail'
import StorageCostDetail from './../StorageCostDetail'
import MspCostDetail from './../MspCostDetail'

export default {
    components: {
        VuePerfectScrollbar, StandardInfoDetail, VmCostDetail, StorageCostDetail, MspCostDetail
    },
	data: () => ({
		cloudZServiceEstimateType: 'CloudZService',
		storageServiceEstimateType: 'StorageService',
		
      	historyDialog: false,
      	generalDialog: false,
      	iksVmDialog: false,
      	iksStorageDialog: false,
      	mspCostDialog: false,
      	
      	generalVersionId: 0,
      	iksVmVersionId: 0,
      	iksStorageVersionId: 0,
      	mspCostVersionId: 0,
      	generalDetail: {},
      	iksVmDetail: {},
      	iksStorageDetail: {},
      	mspCostDetail: {}
	}),
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        },
		editable: function() {
			if(this.$store.state.estimate.projectCostEstimateHistoryDetailStatus) {
				return false
			}
			return true
		},
		estimate: function() {
			let estimate = this.$store.state.estimate.projectCostEstimate
			if(estimate.id) {
				if(this.editable && this.iksGeneral.id > 0 && estimate.generalId!=this.iksGeneral.id) {
					this.$store.dispatch('estimate/getGeneralHistoryDetail', {versionId: estimate.generalId})
				}
				if(this.editable && this.vmVersion.id > 0 && estimate.iksVmVersionId!=this.vmVersion.id) {
					this.$store.dispatch('estimate/getVmHistoryDetail', {versionId: estimate.iksVmVersionId})
				}
				if(this.editable && this.storageVersion.id > 0 && estimate.iksStorageVersion!=this.storageVersion.id) {
					this.$store.dispatch('estimate/getStorageHistoryDetail', {versionId: estimate.iksStorageVersionId})
				}
				if(this.editable && this.productMspCostVersion.id > 0 && estimate.mspCostVersionId!=this.productMspCostVersion.id) {
					this.$store.dispatch('estimate/getProductMspCostHistoryDetail', {versionId: estimate.mspCostVersionId})
				}
			}
			return estimate
		},
		productReferences: function() {
			return this.$store.state.estimate.productReferences
		},
		projectVolumes: function() {
			return this.$store.state.estimate.projectVolume
		},
		iksGeneral: function() {
			return this.$store.state.estimate.general
		},
		vmVersion: function() {
			return this.$store.state.estimate.vm
		},
		storageVersion: function() {
			return this.$store.state.estimate.storage
		},
		productMspCostVersion: function() {
			return this.$store.state.estimate.productMspCost
		},
		generalHistoryDetail: function() {
			return this.$store.state.estimate.generalHistoryDetail;
		},
		vmHistoryDetail: function() {
			return this.$store.state.estimate.vmHistoryDetail;
		},
		storageHistoryDetail: function() {
			return this.$store.state.estimate.storageHistoryDetail;
		},
		productMspCostHistoryDetail: function() {
			return this.$store.state.estimate.productMspCostHistoryDetail;
		}
    },
    created() {
    	//this.initialize()
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        initialize () {
        	this.$store.dispatch('estimate/getGeneralHistoryDetail', {versionId: this.estimate.generalId})
        	this.$store.dispatch('estimate/getVmHistoryDetail', {versionId: this.estimate.iksVmVersionId})
        	this.$store.dispatch('estimate/getStorageHistoryDetail', {versionId: this.estimate.iksStorageVersionId})
        	this.$store.dispatch('estimate/getProductMspCostHistoryDetail', {versionId: this.estimate.mspCostVersionId})
        }
    }
}
</script>