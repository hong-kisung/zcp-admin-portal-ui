<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Customer</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" v-b-modal.customer-add-modal><i class="icon-plus"></i> Customer 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '5%' : '' }">
                    </template>
                    <template slot="cloud_account" slot-scope="data">
                        <b-link><img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1"></b-link>
                        <b-link><img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1"></b-link>
                        <b-link><img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1"></b-link>
                    </template>
                    <template slot="projects" slot-scope="data">
                        <b-link>{{data.item.projects}}</b-link>
                    </template>
                    <template slot="clusters" slot-scope="data">
                        <b-link>{{data.item.clusters}}</b-link>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.customer-detail-modal><i class="fa fa-pencil"></i></b-button>
                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                        Inactive : <c-switch color="success" checked label />
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : Customer 추가 -->
            <b-modal id="customer-add-modal" size="lg" scrollable title="Customer" centered>
                <b-form>
                    <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="customerNameEn" required placeholder="Customer Name(EN)을 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="customerNameEn">
                            Customer Name(EN)을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="customerNameKr" required placeholder="Customer Name(KR)을 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="customerNameKr">
                            Customer Name(KR)을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Cloud Service Provider" label-for="cloudServiceProviderGoogle" :label-cols="3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="cloudServiceProviderGoogle">
                                <label class="custom-control-label" for="cloudServiceProviderGoogle"><img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo"></label>
                            </div>
                            <b-form-input type="text" id="cloudServiceProviderGoogleAlias" placeholder="Account ID / Alias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="cloudServiceProviderAws">
                                <label class="custom-control-label" for="cloudServiceProviderAws"><img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo"></label>
                            </div>
                            <b-form-input type="text" id="cloudServiceProviderAwsAlias" placeholder="Account ID / Alias"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="cloudServiceProviderCloudZ">
                                <label class="custom-control-label" for="cloudServiceProviderCloudZ"><img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo"></label>
                            </div>
                            <b-form-input type="text" id="cloudServiceProviderCloudZAlias" placeholder="Account ID / Alias"></b-form-input>
                        </div>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Customer 추가 -->
            
            <!-- modal : 상세보기 -->
            <b-modal id="customer-detail-modal" size="xl" title="Customer Detail" scrollable centered hide-footer>
                <div>
                    <h5 class="mb-3">Basic Information</h5>
                    <b-form>
                        <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                            <b-form-input type="text" id="customerNameEn" required placeholder="Customer Name(EN)을 입력해주세요."></b-form-input>
                            <b-form-invalid-feedback id="customerNameEn">
                                Customer Name(EN)을 입력해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                            <b-form-input type="text" id="customerNameKr" required placeholder="Customer Name(KR)을 입력해주세요."></b-form-input>
                            <b-form-invalid-feedback id="customerNameKr">
                                Customer Name(KR)을 입력해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Cloud Service Provider" label-for="cloudServiceProviderGoogle" :label-cols="3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="cloudServiceProviderGoogle">
                                    <label class="custom-control-label" for="cloudServiceProviderGoogle"><img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo"></label>
                                </div>
                                <b-form-input type="text" id="cloudServiceProviderGoogleAlias" placeholder="Account ID / Alias"></b-form-input>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-2">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="cloudServiceProviderAws">
                                    <label class="custom-control-label" for="cloudServiceProviderAws"><img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo"></label>
                                </div>
                                <b-form-input type="text" id="cloudServiceProviderAwsAlias" placeholder="Account ID / Alias"></b-form-input>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-2">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="cloudServiceProviderCloudZ">
                                    <label class="custom-control-label" for="cloudServiceProviderCloudZ"><img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo"></label>
                                </div>
                                <b-form-input type="text" id="cloudServiceProviderCloudZAlias" placeholder="Account ID / Alias"></b-form-input>
                            </div>
                        </b-form-group>
                    </b-form>
                    <div class="text-right">
                        <b-button variant="primary"><i class="icon-check"></i> 저장</b-button>
                    </div>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">Projects</h5>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <b-table striped hover small bordered :fields="projects_fields" :items="projects_items">
                            <template v-slot:table-colgroup="scope">
                                <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'projects_number' ? '5%' : '' }">
                            </template>
                        </b-table>
                    </VuePerfectScrollbar>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">Clusters</h5>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <b-table striped hover small bordered :fields="clusters_fields" :items="clusters_items">
                            <template v-slot:table-colgroup="scope">
                                <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'clusters_number' ? '5%' : '' }">
                            </template>
                        </b-table>
                    </VuePerfectScrollbar>
                </div>
            </b-modal>
            <!-- // modal : 상세보기 -->
        </b-card>
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
    data()  {
        return {
            fields: [
                { key: 'number', label: 'No', tdClass: 'text-center' },
                { key: 'customer_name_en', label: 'Customer Name(EN)', tdClass: 'text-center' },
                { key: 'customer_name_kr', label: 'Customer Name(KR)', tdClass: 'text-center' },
                { key: 'cloud_account', label: 'Cloud Account', tdClass: 'text-center' },
                { key: 'projects', label: 'Projecs', tdClass: 'text-center' },
                { key: 'clusters', label: 'Clusters', tdClass: 'text-center' },
                { key: 'msp', label: 'MSP' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            items: [
                { number: '1', customer_name_en: 'SKI', customer_name_kr: '이노베이션', cloud_account: '', projects: '6', clusters: '10', msp: 'ZCP - SK C&C POG', actions: '' },
                { number: '2', customer_name_en: 'SKN', customer_name_kr: '네트웍스', cloud_account: '', projects: '6', clusters: '10', msp: 'ZCP - SK C&C POG', actions: '' }
            ],
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
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>