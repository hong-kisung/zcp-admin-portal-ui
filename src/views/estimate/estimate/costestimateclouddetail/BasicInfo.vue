<template>
    <div>
        <b-form>
            <b-form-group label="Cloud" label-for="cloud" :label-cols="3">
                <b-form-input type="text" id="cloud" v-model="estimate.cspCode" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="Version" label-for="version" :label-cols="3">
                <b-form-input type="text" id="version" v-model="estimate.version" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="Created Date" label-for="createdDt" :label-cols="3">
                <b-form-input type="text" id="createdDt" v-model="estimate.createdDt" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="Label" label-for="label" :label-cols="3">
                <b-form-input type="text" id="label" v-model="estimate.label"></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="description" :label-cols="3">
                <b-form-textarea type="text" id="description" v-model="estimate.description" maxlength="100"></b-form-textarea>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3">
                        <label class="col-form-label">기준정보 버전 
                        	<span class="text-warning font-xs ml-2" v-if="editable && iksGeneral.id > 0 && estimate.generalId==iksGeneral.id"><i class="icon-info"></i> 최신 버전입니다.</span>
                        	<span class="text-danger font-xs ml-2" v-if="editable && !iksGeneral.id || iksGeneral.id==0"><i class="icon-info"></i> 조회된 버전이 없습니다.</span>
                        	<span class="text-danger font-xs ml-2" v-if="editable && iksGeneral.id > 0 && estimate.generalId!=iksGeneral.id"><i class="icon-info"></i> 업데이트가 필요합니다.</span>
                        </label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.generalId > 0" @click="generalDialog=true; generalVersionId=estimate.generalId"><i class="icon-info"></i> 현재버전({{ estimate.generalVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && iksGeneral.id > 0 && estimate.generalId!=iksGeneral.id" @click="generalDialog=true; generalVersionId=iksGeneral.id"><i class="icon-info"></i> 최신버전({{ iksGeneral.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3">
                        <label class="col-form-label">VM 버전 
                        	<span class="text-warning font-xs ml-2" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId==vmVersion.id"><i class="icon-info"></i> 최신 버전입니다.</span>
                        	<span class="text-danger font-xs ml-2" v-if="editable && !vmVersion.id || vmVersion.id==0"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                        	<span class="text-danger font-xs ml-2" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId!=vmVersion.id"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                        </label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.iksVmVersionId > 0" @click="iksVmDialog=true; iksVmVersionId=estimate.iksVmVersionId"><i class="icon-info"></i> 현재버전({{ estimate.iksVmVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId!=vmVersion.id" @click="iksVmDialog=true; iksVmVersionId=vmVersion.id"><i class="icon-info"></i> 최신버전({{ vmVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3">
                        <label class="col-form-label">Storage 버전 
                        	<span class="text-warning font-xs ml-2" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId==storageVersion.id"><i class="icon-info"></i> 최신 버전입니다.</span>
                        	<span class="text-danger font-xs ml-2" v-if="editable && !storageVersion.id || storageVersion.id==0"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                        	<span class="text-danger font-xs ml-2" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId!=storageVersion.id"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                        </label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.iksStorageVersionId > 0" @click="iksStorageDialog=true; iksStorageVersionId=estimate.iksStorageVersionId"><i class="icon-info"></i> 현재버전({{ estimate.iksStorageVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId!=storageVersion.id" @click="iksStorageDialog=true; iksStorageVersionId=storageVersion.id"><i class="icon-info"></i> 최신버전({{ storageVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
            <b-form-group>
            	<b-form-row>
                    <b-col sm="3">
                        <label class="col-form-label">MSP 비용 버전 
                        	<span class="text-warning font-xs ml-2" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId==productMspCostVersion.id"><i class="icon-info"></i> 최신 버전입니다.</span>
                        	<span class="text-danger font-xs ml-2" v-if="editable && !productMspCostVersion.id || productMspCostVersion.id==0"><i class="icon-info"></i> 조회된 버전이 없습니다.</span></label>
                        	<span class="text-danger font-xs ml-2" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId!=productMspCostVersion.id"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                        </label>
                    </b-col>
                    <b-col>
                        <b-button variant="outline-success" class="mr-2 font-xs" v-if="estimate.mspCostVersionId > 0" @click="mspCostDialog=true; mspCostVersionId=estimate.mspCostVersionId"><i class="icon-info"></i> 현재버전({{ estimate.mspCostVersionVersion }}) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId!=productMspCostVersion.id" @click="mspCostDialog=true; mspCostVersionId=productMspCostVersion.id"><i class="icon-info"></i> 최신버전({{ productMspCostVersion.version }}) 조회</b-button>
                    </b-col>
            	</b-form-row>
            </b-form-group>
        </b-form>
        
        <!-- modal : 기준정보 -->
        <b-modal id="basic-modal" scrollable title="기준정보" size="lg" centered v-model="generalDialog">
            <standard-info-detail v-bind:versionId="generalVersionId"
            					  v-bind:editable="false" />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="generalDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : 기준정보 -->
        
        <!-- modal : IKS VM -->
        <b-modal id="iks-vm-modal" scrollable title="IKS VM" size="xl" centered v-model="iksVmDialog">
            <vm-cost-detail v-bind:versionId="iksVmVersionId" 
            				v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="iksVmDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : IKS VM -->
        
        <!-- modal : IKS Storage -->
        <b-modal id="iks-storage-modal" scrollable title="IKS Storage" size="xl" centered v-model="iksStorageDialog">
            <storage-cost-detail v-bind:versionId="iksStorageVersionId" 
            					 v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="iksStorageDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : IKS Storage -->
        
        <!-- modal : MSP 비용 -->
        <b-modal id="msp-modal" scrollable title="MSP 비용" size="lg" centered v-model="mspCostDialog">
            <msp-cost-detail v-bind:versionId="mspCostVersionId" 
            				 v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="mspCostDialog=false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import StandardInfoDetail from '@/views/estimate/standardinfo/StandardInfoDetail'
import VmCostDetail from '@/views/estimate/vmcost/VmCostDetail'
import StorageCostDetail from '@/views/estimate/storagecost/StorageCostDetail'
import MspCostDetail from '@/views/estimate/mspcost/MspCostDetail'

export default {
    components: {
        StandardInfoDetail, VmCostDetail, StorageCostDetail, MspCostDetail
    },
	data: () => ({
      	historyDialog: false,
      	generalDialog: false,
      	iksVmDialog: false,
      	iksStorageDialog: false,
      	mspCostDialog: false,
      	
      	generalVersionId: 0,
      	iksVmVersionId: 0,
      	iksStorageVersionId: 0,
      	mspCostVersionId: 0
	}),
    computed: {
		editable: function() {
			if(this.$store.state.estimate.projectCostEstimateHistoryDetailStatus) {
				return false
			}
			return true
		},
		estimate: function() {
			return this.$store.state.estimate.projectCostEstimate
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
		}
    },
    created() {
    	
    },
    methods: {
    }
}
</script>