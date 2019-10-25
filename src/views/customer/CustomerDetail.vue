<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Customer Details</h1>
        <b-tabs class="detail-cnt">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Basic Information
                </template>
                <b-form>
                    <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="customerNameEn" required placeholder="Customer Name(EN)을 입력해주세요." v-model="customer.nameEn"></b-form-input>
                        <b-form-invalid-feedback id="customerNameEn">
                            Customer Name(EN)을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="customerNameKr" required placeholder="Customer Name(KR)을 입력해주세요." v-model="customer.nameKr"></b-form-input>
                        <b-form-invalid-feedback id="customerNameKr">
                            Customer Name(KR)을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Cloud Service Provider" label-for="cloudServiceProviderGoogle" :label-cols="3">
                        <div class="d-flex align-items-center justify-content-between">
                            <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1">
                            <b-form-input type="text" id="awsCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.awsCspId"></b-form-input>
                            <b-form-input type="text" id="awsAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.awsAccountAlias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1">
                            <b-form-input type="text" id="azureCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.azureCspId"></b-form-input>
                            <b-form-input type="text" id="azureAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.azureAccountAlias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1">
                            <b-form-input type="text" id="cloudzCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.cloudzCspId"></b-form-input>
                            <b-form-input type="text" id="cloudzAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.cloudzAccountAlias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1">
                            <b-form-input type="text" id="gcpCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.gcpCspId"></b-form-input>
                            <b-form-input type="text" id="gcpAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.gcpAccountAlias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1">
                            <b-form-input type="text" id="ibmCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.ibmCspId"></b-form-input>
                            <b-form-input type="text" id="ibmAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.ibmAccountAlias"></b-form-input>
                        </div>
                    </b-form-group>
                </b-form>
                <div class="tab-bottom-btn">
                    <router-link :to="{ path: '/customer/' }">
                        <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                    <b-button variant="primary" class="right" @click="updateCustomer()"><i class="icon-check"></i> 저장</b-button>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-folder-alt mr-1"></i> Projects
                </template>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped hover small bordered :fields="projects_fields" :items="projects_items">
                        <template v-slot:table-colgroup="scope">
                            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'projects_number' ? '5%' : '' }">
                        </template>
                    </b-table>
                </VuePerfectScrollbar>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/customer/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-layers mr-1"></i> Clusters
                </template>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped hover small bordered :fields="clusters_fields" :items="clusters_items">
                        <template v-slot:table-colgroup="scope">
                            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'clusters_number' ? '5%' : '' }">
                        </template>
                    </b-table>
                </VuePerfectScrollbar>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/customer/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch
    },
    data()  {
        return {
            id: 0,
            projects_fields: [
                { key: 'projects_number', label: 'No', tdClass: 'text-center' },
                { key: 'projects_name', label: 'Project', tdClass: 'text-center' },
                { key: 'projects_status', label: 'Status', tdClass: 'text-center' },
                { key: 'projects_dev', label: 'Dev. Period', tdClass: 'text-center' },
                { key: 'projects_date', label: 'Launching Date', tdClass: 'text-center' },
                { key: 'projects_stakeholder', label: 'Stakeholder', tdClass: 'text-center' }
            ],
            projects_items: [
                { projects_number: '1', projects_name: 'BiOK', projects_status: 'Operation', projects_dev: '~', projects_date: '2019-09-26', projects_stakeholder: '' },
                { projects_number: '2', projects_name: 'SHE Portal', projects_status: 'Development', projects_dev: '~', projects_date: '2019-09-26', projects_stakeholder: '' }
            ],
            clusters_fields: [
                { key: 'clusters_number', label: 'No', tdClass: 'text-center' },
                { key: 'clusters_provider', label: 'Cloud Service Provider', tdClass: 'text-center' },
                { key: 'clusters_id', label: 'Cluset ID', tdClass: 'text-center' },
                { key: 'clusters_name', label: 'Cluster Name' },
                { key: 'clusters_age', label: 'Age', tdClass: 'text-center' },
                { key: 'clusters_environment', label: 'Environment', tdClass: 'text-center' },
                { key: 'clusters_rel', label: 'Rel. Projects', tdClass: 'text-center' },
                { key: 'clusters_k8s', label: 'k8s version', tdClass: 'text-center' },
                { key: 'clusters_pm', label: 'Next. PM', tdClass: 'text-center' },
                { key: 'clusters_node', label: 'Node Information (Mgmt/ZDB/Worker/Edge)', tdClass: 'text-center' }
            ],
            clusters_items: [
                { clusters_number: '1', clusters_provider: 'IBM', clusters_id: '098735343234', clusters_name: 'cloudzcp-ski-dev', clusters_age: '2019-09-26', clusters_environment: 'dev', clusters_rel: '1', clusters_k8s: '1.13.4', clusters_pm: '2019-12', clusters_node: '2/4/4/2' },
                { clusters_number: '2', clusters_provider: 'Azure', clusters_id: '89347693493', clusters_name: 'cloudzcp-ski-united-dev', clusters_age: '2019-09-26', clusters_environment: 'dev', clusters_rel: '3', clusters_k8s: '1.14.8', clusters_pm: '2020-12', clusters_node: '2/4/4/0' }
            ]
        }
    },
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
        customer: function() {
            return this.$store.state.customer.customer
        }
    },
    created () {
		this.initialize()
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        initialize() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
            }

            this.$store.dispatch('customer/getCustomer', {id: this.$route.params.id})
        },
        updateCustomer() {
            if (!this.customer.nameEn) {
                this.$zadmin.alert('Customer Name(EN)을 입력하세요.')
                e.preventDefault()
                return
            }
            if (!this.customer.nameKr) {
                this.$zadmin.alert('Customer Name(KR)을 입력하세요.')
                e.preventDefault()
                return
            }

            const customer = {
                "nameEn": this.customer.nameEn,
                "nameKr": this.customer.nameKr,
                "customerCloudAccounts": [
                    {
                        "cspCode": "AWS",
                        "cspId": this.customer.awsCspId || '',
                        "accountAlias": this.customer.awsAccountAlias || ''
                    },
                    {
                        "cspCode": "AZURE",
                        "cspId": this.customer.azureCspId || '',
                        "accountAlias": this.customer.azureAccountAlias || ''
                    },
                    {
                        "cspCode": "CLOUDZ",
                        "cspId": this.customer.cloudzCspId || '',
                        "accountAlias": this.customer.cloudzAccountAlias || ''
                    },
                    {
                        "cspCode": "GCP",
                        "cspId": this.customer.gcpCspId || '',
                        "accountAlias": this.customer.gcpAccountAlias || ''
                    },
                    {
                        "cspCode": "IBM",
                        "cspId": this.customer.ibmCspId || '',
                        "accountAlias": this.customer.ibmAccountAlias || ''
                    }
                ]
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false;

                this.$store.dispatch('customer/updateCustomer', {id: this.id, customer: customer})
            });
        }
    }
}
</script>
