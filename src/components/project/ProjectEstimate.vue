<template>
<div>
    <v-layout row wrap>
      <v-flex lg12>
        <ValidationObserver ref="obs">
          <v-card slot-scope="{ invalid, validated }">
            <v-card-title class="subheading" v-if="!editable">견적서 상세보기</v-card-title>
		    <v-card-text>
				<v-layout wrap>
				  <v-flex xs4 sm4 md4>
					<VTextFieldWithValidation rules="" data-vv-name="version" v-model="estimate.version" label="버전" readonly/>
				  </v-flex>
				  <v-flex xs4 sm4 md4>
					<VTextFieldWithValidation rules="max:50" data-vv-name="label" v-model="estimate.label" label="라벨" />
				  </v-flex>
				  <v-flex xs4 sm4 md4>
					<VTextFieldWithValidation rules="" data-vv-name="createdDt" v-model="estimate.createdDt" label="생성일시" readonly/>
				  </v-flex>
				  <v-flex xs12 sm12 md12>
					<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="estimate.description" label="설명" />
				  </v-flex>
				  <v-flex xs3 sm3 md3>
					<span class="justify-center layout px-0">기준정보 버전 : {{generalVersionId}} <v-icon @click="viewGeneral()" v-if="generalVersionId > 0">search</v-icon></span>
					<v-alert v-model="generalVersionAlert" type="warning">{{generalVersionAlertMessage}}</v-alert>
				  </v-flex>
				  <v-flex xs3 sm3 md3>
					<span class="justify-center layout px-0">IKS VM Cost 버전 : {{iksVmVersionId}} <v-icon @click="viewIksVm()" v-if="iksVmVersionId > 0">search</v-icon></span>
					<v-alert v-model="iksVmVersionAlert" type="warning">{{iksVmVersionAlertMesssage}}</v-alert>
				  </v-flex>
				  <v-flex xs3 sm3 md3>
					<span class="justify-center layout px-0">IKS Storage Cost 버전 : {{iksStorageVersionId}} <v-icon @click="viewIksStorage()" v-if="iksStorageVersionId > 0">search</v-icon></span>
					<v-alert v-model="iksStorageVersionAlert" type="warning">{{iksStorageVersionAlertMesssage}}</v-alert>
				  </v-flex>
				  <v-flex xs3 sm3 md3>
					<span class="justify-center layout px-0">MSP Cost 버전 : {{mspCostVersionId}} <v-icon @click="viewMspCost()" v-if="mspCostVersionId > 0">search</v-icon></span>
					<v-alert v-model="mspCostVersionAlert" type="warning">{{mspCostVersionAlertMesssage}}</v-alert>
				  </v-flex>
				</v-layout>
		    </v-card-text>
 	        <v-card-actions v-if="generalVersionAlert || iksVmVersionAlert || iksStorageVersionAlert || mspCostVersionAlert">
		      <v-spacer></v-spacer>
		      <v-btn right color="primary" v-if="editable" @click="apply">견적서 Update</v-btn>
	        </v-card-actions>
		  </v-card>
		</ValidationObserver>
      </v-flex>
      <v-flex lg12>
		<estimate-service 
			v-bind:title="cloudZServiceTitle"
			v-bind:estimateType="cloudZServiceEstimateType"
			v-bind:estimate="estimate.cloudZService"
 			v-bind:iksGeneral="iksGeneral"
 			v-bind:vmVersion="vmVersion"
 			v-bind:storageVersion="storageVersion"
 			v-bind:productMspCostVersion="productMspCostVersion"
 			v-bind:productReferences="productReferences"
 			v-bind:projectVolumes="projectVolumes"
 			v-bind:editable="editable"
 			v-bind:referenceUpdateStatus="referenceUpdateStatus"
 			v-on:fire-estimate-changed="changeEstimate"
 			v-on:fire-update-reference-finished='finishReferenceUpdate'
		/>
      </v-flex>
      <v-flex lg12>
		<estimate-service 
			v-bind:title="storageServiceTitle"
			v-bind:estimateType="storageServiceEstimateType"
			v-bind:estimate="estimate.storageService"
 			v-bind:iksGeneral="iksGeneral"
 			v-bind:vmVersion="vmVersion"
 			v-bind:storageVersion="storageVersion"
 			v-bind:productMspCostVersion="productMspCostVersion"
 			v-bind:productReferences="productReferences"
 			v-bind:projectVolumes="projectVolumes"
 			v-bind:editable="editable"
 			v-bind:referenceUpdateStatus="referenceUpdateStatus"
 			v-on:fire-estimate-changed="changeEstimate"
 			v-on:fire-update-reference-finished='finishReferenceUpdate'
		/>
      </v-flex>
      <v-flex lg12>
		<estimate-summary 
			v-bind:estimate="estimate.summary"
		/>
      </v-flex>
      <v-flex lg12>
        <v-card>
 	      <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" v-if="editable" @click="save">저장</v-btn>
		    <v-btn right color="primary" v-if="!editable" @click="remove">삭제</v-btn>
		    <v-btn right color="primary" v-if="!editable" @click="closeDetailDialog">닫기</v-btn>
	      </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
    <v-dialog v-model="generalDialog" max-width="700px">
		<general-detail v-bind:editable="false"
						v-bind:versionId="generalVersionId" 
						v-on:fire-dialog-closed="closeGeneralDialog"
						/>
	</v-dialog>
 	<v-dialog v-model="iksVmDialog" max-width="1400px">
	      <iks-vm-detail v-bind:editable="false"
	      				 v-bind:versionId="iksVmVersionId"
					     v-on:fire-dialog-closed="closeIksVmDialog"
					     />
	</v-dialog>
 	<v-dialog v-model="iksStorageDialog" max-width="1400px">
		  <iks-storage-detail v-bind:editable="false"
						      v-bind:versionId="iksStorageVersionId"
						      v-on:fire-dialog-closed="closeIksStorageDialog"
						      />
	</v-dialog>
 	<v-dialog lazy v-model="mspCostDialog" max-width="800px">
		<product-msp-cost-detail v-bind:editable="false"
								 v-bind:versionId="mspCostVersionId" 
								 v-on:fire-dialog-closed="closeMspCostDialog"
								 />
	</v-dialog>
</div>
</template>

<script>
export default {
	data: () => ({
		cloudZServiceTitle: 'Cloud Z Service',
		cloudZServiceEstimateType: 'cloudZService',
		storageServiceTitle: 'Application Storage Service',
		storageServiceEstimateType: 'storageService',
		
 		iksGeneral: {},
		vmVersion: {},
		storageVersion: {},
		productMspCostVersion: {},
      	estimate: {
      		cloudZService: {environments: []}, 
      		storageService: {environments: []},
      		summary: {environments: []}
      	},
      	generalDialog: false,
      	generalVersionId: 0,
      	iksVmDialog: false,
      	iksVmVersionId: 0,
      	iksStorageDialog: false,
      	iksStorageVersionId: 0,
      	mspCostDialog: false,
      	mspCostVersionId: 0,
      	
      	generalVersionAlertMessage: '',
      	generalVersionAlert: false,
      	iksVmVersionAlertMesssage: '',
      	iksVmVersionAlert: false,
      	iksStorageVersionAlertMesssage: '',
      	iksStorageVersionAlert: false,
      	mspCostVersionAlertMesssage: '',
      	mspCostVersionAlert: false,
      	
      	productReferences : [],
      	projectVolumes: {},
      	referenceUpdateStatus: false
	}),
	props: [
		'projectId',
		'estimateId',
		'editable',
		'volumeRefreshStatus'
	],
	computed: {
	},
	watch: {
		estimateId: function() {
			this.$http.get('/api/project/' + this.projectId + '/estimate/history/' + this.estimateId).then(response => {
				if(response && response.data) {
					this.estimate = response.data;
					this.generalVersionId = this.estimate.generalId;
					this.iksVmVersionId = this.estimate.iksVmVersionId;
					this.iksStorageVersionId = this.estimate.iksStorageVersionId;
					this.mspCostVersionId = this.estimate.mspCostVersionId;
				}
			}).catch(error => {
				alert(error.response.data.message);
			})
		},
		volumeRefreshStatus: function() {
			if(this.volumeRefreshStatus) {
				this.getVolumeInfo();
				this.$emit('fire-volume-refresh-finished');
			}
		}
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize() {
			if(this.estimateId != undefined && !this.editable) {
				return;
			}
			
			this.$http.get('/api/project/' + this.projectId + '/estimate').then(response => {
				if(response && response.data) {
					this.estimate = response.data;
				}
				
				this.generalVersionAlert = false;
				this.generalVersionAlertMessage = '';
				this.iksVmVersionAlert = false;
				this.iksVmVersionAlertMesssage = '';
				this.iksStorageVersionAlert = false;
				this.iksStorageVersionAlertMesssage = '';
				this.mspCostVersionAlert = false;
				this.mspCostVersionAlertMesssage = '';

				this.getGeneralInfo();
				this.getVmInfo();
				this.getStorageInfo();
				this.getMspInfo();
				this.getProductInfo();
				this.getVolumeInfo();
			}).catch(error => {
				alert(error.response.data.message);
			})
		},
		getVolumeInfo() {
			this.$http.get('/api/project/' + this.projectId + '/volume').then(response => {
				this.projectVolumes = response.data;
			})
		},
		getGeneralInfo() {
			this.$http.get('/api/general').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.iksGeneral = response.data;
					this.generalVersionId = this.iksGeneral.id;
					
					if(this.estimate.id > 0 && this.estimate.generalId != this.iksGeneral.id) {
						this.printGeneralErrorMessage('견적서의 기준정보가 최신 버전이 아닙니다.');
					}
				} else {
					this.printGeneralErrorMessage('조회된 기준정보 데이터가 없습니다.');
				}
			}).catch(error => {
				this.printGeneralErrorMessage(error.response.data.message);
			})
		},
		printGeneralErrorMessage(message, flag) {
			//this.iksGeneral = {};
			this.generalVersionAlert = true;
			this.generalVersionAlertMessage = message == undefined ? '조회된 기준정보 데이터가 없습니다. ':message;
		},
		getVmInfo() {
			this.$http.get('/api/iks_costs/vm').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.vmVersion = response.data;
					this.iksVmVersionId = this.vmVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.iksVmVersionId != this.vmVersion.id) {
						this.printVmErrorMessage('견적서의 IKS VM Cost가 최신 버전이 아닙니다');
					}
				} else {
					this.printVmErrorMessage('조회된 IKS VM Cost 데이터가 없습니다.');
				}
			}).catch(error => {
				this.printVmErrorMessage(error.response.data.message);
			})
		},
		printVmErrorMessage(message) {
			//this.vmVersion = {};
			this.iksVmVersionAlert = true;
			this.iksVmVersionAlertMesssage = message == undefined ? '조회된 IKS VM Cost 데이터가 없습니다.':message;
		},
		getStorageInfo() {
			this.$http.get('/api/iks_costs/storage').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.storageVersion = response.data;
					this.iksStorageVersionId = this.storageVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.iksStorageVersionId != this.storageVersion.id) {
						this.printStorageErrorMessage('견적서의 IKS Storage Cost가 최신 버전이 아닙니다');
					}
				} else {
					this.printStorageErrorMessage('조회된 IKS Storage Cost 데이터가 없습니다.');
				}
			}).catch(error => {
				this.printStorageErrorMessage(error.response.data.message);
			})
		},
		printStorageErrorMessage(message) {
			//this.storageVersion = {};
			this.iksStorageVersionAlert = true;
			this.iksStorageVersionAlertMesssage = message == undefined ? '조회된 IKS Storage Cost 데이터가 없습니다.':message;
		},
		getMspInfo() {
			this.$http.get('/api/platform/msp').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.productMspCostVersion = response.data;
					this.mspCostVersionId = this.productMspCostVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.mspCostVersionId != this.productMspCostVersion.id) {
						this.printMspErrorMessage('견적서의 MSP Cost가 최신 버전이 아닙니다');
					}
				} else {
					this.printMspErrorMessage('조회된 MSP Cost 데이터가 없습니다.');
				}
			}).catch(error => {
				this.printMspErrorMessage(error.response.data.message);
			})
		},
		printMspErrorMessage(message) {
			//this.productMspCostVersion = {};
			this.mspCostVersionAlert = true;
			this.mspCostVersionAlertMesssage = message == undefined ? '조회된 MSP Cost 데이터가 없습니다.':message;
		},
		getProductInfo() {
			this.$http.get('/api/platform/product').then(response => {
				var products = response.data;
				for(var i = 0;i < products.length; i++) {
					var product = {};
					product.productId = products[i].id;
					product.productName = products[i].name;
					this.productReferences.push(product);
					this.getTemplate(product);
				}
			})
		},
		getTemplate(product) {
			this.$http.get('/api/platform/product/' + product.productId + '/template').then(response => {
				product.templates = response.data;
			});
			this.$http.get('/api/platform/product/' + product.productId + '/service').then(response => {
				product.services = response.data;
			});
		},
		
		viewGeneral() {
			this.generalDialog = true;
		},
		closeGeneralDialog() {
			this.generalDialog = false;
		},
		viewIksVm() {
			this.iksVmDialog = true;
		},
		closeIksVmDialog() {
			this.iksVmDialog = false;
		},
		viewIksStorage() {
			this.iksStorageDialog = true;
		},
		closeIksStorageDialog() {
			this.iksStorageDialog = false;
		},
		viewMspCost() {
			this.mspCostDialog = true;
		},
		closeMspCostDialog() {
			this.mspCostDialog = false;
		},
		apply() {
			if(confirm('최신 버전의 비용으로 다시 계산하시겠습니까?')) {
				this.referenceUpdateStatus = true;
			}
		},
		finishReferenceUpdate() {
			this.referenceUpdateStatus = false;
			this.generalVersionAlert = false;
			this.iksVmVersionAlert = false;
			this.iksStorageVersionAlert = false;
			this.mspCostVersionAlert = false;
			this.changeEstimate();
			alert("견적서 업데이트가 완료되었습니다.");
		},
		save() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if(confirm('변경된 내용을 저장하시겠습니까?')) {
						this.estimate.generalId = this.iksGeneral.id;
						this.estimate.iksVmVersionId = this.vmVersion.id;
						this.estimate.iksStorageVersionId = this.storageVersion.id;
						this.estimate.mspCostVersionId = this.productMspCostVersion.id;
						
						this.$http.put('/api/project/' + this.projectId + '/estimate', this.estimate).then(response => {
							alert("저장되었습니다.");
							this.initialize();
							this.$emit('fire-saved');
						})
					}
				}
			});
		},
		remove() {
			if(confirm('삭제하시겠습니까?')) {
				this.$http.delete('/api/project/' + this.projectId + '/estimate/history/' + this.estimateId).then(response => {
					alert("삭제되었습니다.");
					this.$emit('fire-removed');
				})
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		},
		changeEstimate() {
			this.summaryEstimateType(this.estimate.cloudZService);
			this.summaryEstimateType(this.estimate.storageService);
			
			this.estimate.sumMonthly = this.estimate.cloudZService.sumMonthly + this.estimate.storageService.sumMonthly;
			this.estimate.sumYearly = this.estimate.cloudZService.sumYearly + this.estimate.storageService.sumYearly;
		},
		summaryEstimateType(target) {
			for(var i = 0; i < target.environments.length; i++ ){
				for(var j = 0; j < target.environments[i].products.length; j++ ){
					for(var k = 0; k < target.environments[i].products[j].services.length; k++ ){
						var service = target.environments[i].products[j].services[k];
						this.summaryClassifications(service);
						//this.$set(target.environments[i].products[j].services, k, service);
					}
					
					var product = target.environments[i].products[j];
					this.summaryServices(target.environments[i].products[j]);
					//this.$set(target.environments[i].products, j, product);
				}
				
				var environment = target.environments[i];
				this.summaryProducts(environment);
				//this.$set(target.environments, i, environment);
			}
			
			this.summaryEnvironments(target);
		},
		summaryEnvironments(estimateType) {
			var sumMonthly = 0;
			var sumYearly = 0;
			for(var i = 0; i < estimateType.environments.length; i++ ){
				sumMonthly += estimateType.environments[i].sumMonthly;
				sumYearly += estimateType.environments[i].sumYearly;
			}
			
			estimateType.sumMonthly = sumMonthly;
			estimateType.sumYearly = sumYearly;
		},
		summaryProducts(environment) {
			var sumMonthly = 0;
			var sumYearly = 0;
			for(var i = 0; i < environment.products.length; i++ ){
				sumMonthly += environment.products[i].sumMonthly;
				sumYearly += environment.products[i].sumYearly;
			}
			
			environment.sumMonthly = sumMonthly;
			environment.sumYearly = sumYearly;
		},
		summaryServices(product) {
			var sumMonthly = 0;
			var sumYearly = 0;
			for(var i = 0; i < product.services.length; i++ ){
				sumMonthly += product.services[i].sumMonthly;
				sumYearly += product.services[i].sumYearly;
			}
			
			product.sumMonthly = sumMonthly;
			product.sumYearly = sumYearly;
		},
		summaryClassifications(service) {
			var sumMonthly = 0;
			var sumYearly = 0;
			for(var i = 0; i < service.classifications.length; i++ ){
				sumMonthly += (service.classifications[i].pricePerMonthly == undefined ? 0 : service.classifications[i].pricePerMonthly);
				sumYearly += (service.classifications[i].pricePerYearly == undefined ? 0 : service.classifications[i].pricePerYearly);
			}
			
			service.sumMonthly = sumMonthly;
			service.sumYearly = sumYearly;
		}
	}
}
</script>

<style>
</style>
