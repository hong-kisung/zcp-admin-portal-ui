<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Projects Details</h1>
        <b-tabs class="detail-cnt">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Basic Information
                </template>
                <b-form>
                    <b-form-group label="Customer" label-for="customer" :label-cols="3" label-class="required">
                        <b-form-select id="customer" :plain="true" :options="['선택', 'SKI', 'SKN']" value="선택" required></b-form-select>
                        <b-form-invalid-feedback id="customer">
                            Customer를 선택해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Project Name" label-for="projectName" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="projectName" required placeholder="Project Name을 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="projectName">
                            Project Name을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Status" label-for="status" :label-cols="3" label-class="required">
                        <b-form-select id="status" :plain="true" :options="['선택', 'Development', 'Operation']" value="선택" required></b-form-select>
                        <b-form-invalid-feedback id="status">
                            Status를 선택해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Development Period" label-for="developmentPeriodStart" :label-cols="3">
                        <div class="d-flex align-items-center justify-content-between">
                            <b-form-input type="number" id="developmentPeriodStart"></b-form-input>
                            <span class="mx-2">~</span>
                            <b-form-input type="number" id="developmentPeriodEnd"></b-form-input>
                        </div>
                    </b-form-group>
                    <b-form-group label="Launching Date" label-for="launchingDate" :label-cols="3">
                        <b-form-input type="date" id="launchingDate"></b-form-input>
                    </b-form-group>
                    <b-form-group label="원가견적 여부" label-for="costEstimate" :label-cols="3">
                        <b-form-radio-group id="costEstimate" v-model="selected" name="costEstimate" class="mt-1">
                            <b-form-radio value="yes">Yes</b-form-radio>
                            <b-form-radio value="no">No</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <template v-if="selected === 'no'">
                        <b-form-group label="원가견적 상위 프로젝트" label-for="costEstimateProject" :label-cols="3">
                            <b-form-select id="costEstimateProject" :plain="true" :options="['선택']" value="선택">
                            </b-form-select>
                        </b-form-group>
                    </template>
                    <b-form-group label="Slack Channel" label-for="slackChannel" :label-cols="3">
                        <b-form-input type="text" id="slackChannel"></b-form-input>
                    </b-form-group>
                </b-form>
                <div class="tab-bottom-btn">
                    <router-link :to="{ path: '/project/' }">
                        <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                    <b-button variant="primary" class="right"><i class="icon-check"></i> 저장</b-button>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-list mr-1"></i> Environment Information
                </template>
                <b-form-group>
                    <b-button variant="success" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-plus"></i> Environment 추가</b-button>
                    <b-button variant="secondary" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-reload"></i> Environment 수정</b-button>
                    <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Environment 삭제</b-button>
                    <b-button variant="success" size="sm" v-b-modal.product-modal><i class="icon-plus"></i> Product 추가</b-button>
                </b-form-group>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <table class="table table-sm table-bordered">
                        <colgroup>
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: 12.5%;">
                            <col style="width: *;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Environment Type</th>
                                <th>Status</th>
                                <th>Billing YN</th>
                                <th>Billing Start Date</th>
                                <th>Product</th>
                                <th>Contract Size</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowspan="2" class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="prod" value="1">
                                        <label class="custom-control-label" for="prod">prod</label>
                                    </div>
                                </th>
                                <td rowspan="2" class="text-center">Operation</td>
                                <td rowspan="2" class="text-center">Y</td>
                                <td rowspan="2" class="text-center">2020-01-01</td>
                                <td class="text-center">ZCP</td>
                                <td class="text-center">4GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">ZDB</td>
                                <td class="text-center">10GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <th class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="dev" value="2">
                                        <label class="custom-control-label" for="dev">dev</label>
                                    </div>
                                </th>
                                <td class="text-center">Developemnt</td>
                                <td class="text-center">N</td>
                                <td class="text-center">2020-01-01</td>
                                <td class="text-center">ZCP</td>
                                <td class="text-center">4GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
                
                <!-- modal : Environment -->
                <b-modal id="environment-modal" title="Environment" centered>
                    <b-form>
                        <b-form-group label="Environment" label-for="environment" :label-cols="4" label-class="required">
                            <b-form-select id="environment" :plain="true" :options="['선택', 'dev', 'qa', 'stage', 'prod', 'combination']" value="선택" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="environment">
                                Environment를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Status" label-for="environmentStatus" :label-cols="4" label-class="required">
                            <b-form-select id="environmentStatus" :plain="true" :options="['선택', 'Development', 'Operation']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="environmentStatus">
                                Status를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Billing YN" label-for="billingYn" :label-cols="4">
                            <b-form-radio-group id="billingYn" v-model="billingSelected" name="billingYn" class="mt-1">
                                <b-form-radio value="yes">Yes</b-form-radio>
                                <b-form-radio value="no">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group label="Billing Start Date" label-for="billingStartDate" :label-cols="4">
                            <b-form-input type="date" id="billingStartDate"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Environment -->
                
                <!-- modal : Product -->
                <b-modal id="product-modal" title="Product" centered>
                    <b-form>
                        <b-form-group label="Product" label-for="product" :label-cols="4" label-class="required">
                            <b-form-select id="product" :plain="true" :options="['선택', 'ZCP', 'ZDB']" value="선택" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="product">
                                Product를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Contract Size" label-for="contractSize" :label-cols="4">
                            <b-input-group>
                                <b-form-input type="number" id="contractSize"></b-form-input>
                                <b-input-group-append><b-input-group-text>GB</b-input-group-text></b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Product -->

                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/project/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-people mr-1"></i> Stakeholders
                </template>
                <div class="mb-3">
                    <b-button variant="success" size="sm"><i class="icon-plus"></i> 추가</b-button>
                </div>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped hover small bordered :fields="stakeholders_fields" :items="stakeholders_items">
                        <template v-slot:table-colgroup="scope">
                            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'stakeholders_number' ? '5%' : '' }">
                        </template>
                        <template slot="stakeholders_role">
                            <b-form-select id="customer" size="sm" :plain="true" :options="['선택', 'SKI', 'SKN']" value="선택" required></b-form-select>
                        </template>
                        <template slot="stakeholders_name" slot-scope="data">
                            <b-form-input type="text" id="" value="" size="sm"></b-form-input>
                        </template>
                        <template slot="stakeholders_action">
                            <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                        </template>
                    </b-table>
                </VuePerfectScrollbar>
                <div class="tab-bottom-btn">
                    <router-link :to="{ path: '/project/' }">
                        <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                    <b-button variant="primary" class="right"><i class="icon-check"></i> 저장</b-button>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-calculator mr-1"></i> Estimate Sheet
                </template>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/project/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-basket mr-1"></i> Orders
                </template>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/project/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-layers mr-1"></i> Clusters
                </template>
                <b-form-group>
                    <b-button variant="primary" size="sm" class="mr-2" v-b-modal.cluster-mapping-modal><i class="icon-magnet"></i> Cluster Mapping</b-button>
                </b-form-group>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped hover small bordered :fields="cluster_fields" :items="cluster_items">
                        <template v-slot:table-colgroup="scope">
                            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'cluster_environment_type' ? '12%' : '' }">
                        </template>
                        <template slot="cluster_environment_type" slot-scope="data">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" :id="data.item.cluster_environment_type" value="">
                                <label class="custom-control-label" :for="data.item.cluster_environment_type">{{data.item.cluster_environment_type}}</label>
                            </div>
                        </template>
                        <template slot="cluster_actions" slot-scope="data">
                            <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                        </template>
                    </b-table>
                </VuePerfectScrollbar>
                
                <!-- modal : Cluster Mapping -->
                <b-modal id="cluster-mapping-modal" title="Cluster" centered>
                    <b-form>
                        <b-form-group label="Cluster" label-for="cluster" :label-cols="4" label-class="required">
                            <b-form-select id="cluster" :plain="true" :options="['선택', 'Cluster 1', 'Cluster 2']" value="선택" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="cluster">
                                Cluster를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Cluster Mapping -->
                
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/project/' }">
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
            cluster_fields: [
                { key: 'cluster_environment_type', label: 'Environment Type' },
                { key: 'cluster_id', label: 'Cluset ID', tdClass: 'text-center' },
                { key: 'cluster_name', label: 'Cluster Name' },
                { key: 'cluster_environment', label: 'Environment', tdClass: 'text-center' },
                { key: 'cluster_arch', label: 'n/w arch', tdClass: 'text-center' },
                { key: 'cluster_sre', label: 'SRE 연동', tdClass: 'text-center' },
                { key: 'cluster_k8s', label: 'k8s version', tdClass: 'text-center' },
                { key: 'cluster_actions', label: 'Actions', tdClass: 'text-center' }
            ],
            cluster_items: [
                { cluster_environment_type: 'Prod', cluster_id: '25fce58d262a45379589d86a16d09f02', cluster_name: 'cloudzcp-ski-dev', cluster_environment: 'Prod', cluster_arch: 'Private', cluster_sre: 'Y', cluster_k8s: '1.13.4', cluster_actions: '' },
                { cluster_environment_type: 'Dev', cluster_id: '25fce58d262a45379589d86a16d09f02', cluster_name: 'cloudzcp-ski-dev', cluster_environment: 'Dev', cluster_arch: 'Public + Private', cluster_sre: 'Y', cluster_k8s: '1.13.4', cluster_actions: '' }
            ],
            stakeholders_fields: [
                { key: 'stakeholders_number', label: 'No', tdClass: 'text-center' },
                { key: 'stakeholders_role', label: 'Role', tdClass: 'text-center' },
                { key: 'stakeholders_name', label: 'Name', tdClass: 'text-center' },
                { key: 'stakeholders_company', label: 'Company', tdClass: 'text-center' },
                { key: 'stakeholders_email', label: 'E-mail', tdClass: 'text-center' },
                { key: 'stakeholders_action', label: 'Actions', tdClass: 'text-center' }
            ],
            stakeholders_items: [
                { stakeholders_number: '1', stakeholders_role: '', stakeholders_name: '홍길동', stakeholders_company: 'SKI', stakeholders_email: 'honggildong@sk.com', stakeholders_action: '' }
            ],
            selected: 'no',
            billingSelected: 'no'
        }
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>