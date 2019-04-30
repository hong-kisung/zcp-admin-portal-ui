import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from '../components/common/inputs/VTextFieldWithValidation.vue';
import VSelectWithValidation from '../components/common/inputs/VSelectWithValidation.vue';

import Layout from '../components/Layout.vue';
import GeneralDetail from '../components/iks_cost/GeneralDetail.vue';
import HistoryList from '../components/iks_cost/HistoryList.vue';
import IKSVmDetail from '../components/iks_cost/IKSVmDetail.vue';
import IKSStorageDetail from '../components/iks_cost/IKSStorageDetail.vue';

import AddOnServices from '../components/platform/AddOnServices.vue';
import EstimateTemplate from '../components/platform/EstimateTemplate.vue';
import EstimateTypeTemplate from '../components/platform/EstimateTypeTemplate.vue';
import MspCostDetail from '../components/platform/MspCostDetail.vue';

import ProjectVolume from '../components/project/ProjectVolume.vue';
import ProjectEstimate from '../components/project/ProjectEstimate.vue';
import EstimateService from '../components/project/EstimateService.vue';
import EstimateSummary from '../components/project/EstimateSummary.vue';
import EnvironmentDialog from '../components/project/EnvironmentDialog.vue';
import EstimateItemDialog from '../components/project/EstimateItemDialog.vue';
import EstimateHistory from '../components/project/EstimateHistory.vue';

function setupComponents(Vue) {
	Vue.component('ValidationProvider', ValidationProvider);
	Vue.component('ValidationObserver', ValidationObserver);
	Vue.component('VTextFieldWithValidation', VTextFieldWithValidation);
	Vue.component('VSelectWithValidation', VSelectWithValidation);
	
	Vue.component('layout', Layout);
	
	Vue.component('general-detail', GeneralDetail);
	Vue.component('history-list', HistoryList);
	Vue.component('iks-vm-detail', IKSVmDetail);
	Vue.component('iks-storage-detail', IKSStorageDetail);
	
	Vue.component('add-on-services', AddOnServices);
	Vue.component('product-template', EstimateTemplate);
	Vue.component('product-estimate-type-template', EstimateTypeTemplate);
	Vue.component('product-msp-cost-detail', MspCostDetail);
	
	Vue.component('project-volume', ProjectVolume);
	Vue.component('project-estimate', ProjectEstimate);
	Vue.component('estimate-service', EstimateService);
	Vue.component('estimate-summary', EstimateSummary);
	Vue.component('estimate-environment-dialog', EnvironmentDialog);
	Vue.component('estimate-item-dialog', EstimateItemDialog);
	Vue.component('project-estimate-history', EstimateHistory);
}

export {
	setupComponents
}