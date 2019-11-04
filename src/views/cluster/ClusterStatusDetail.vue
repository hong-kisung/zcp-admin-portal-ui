<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Cluster Details</h1>
        <b-tabs class="detail-cnt">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Basic Information
                </template>
                <b-form>
                    <b-form-group label="Cluster ID" label-for="clusterId" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="clusterId" required placeholder="Cluster ID를 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="clusterId">
                            Cluster ID를 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Cluster Name" label-for="clusterName" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="clusterName" required placeholder="Cluster Name을 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="clusterName">
                            Cluster Name을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Environment Type" label-for="environmentType" :label-cols="3" label-class="required">
                        <b-form-select id="environmentType" :plain="true" :options="['선택', 'dev', 'qa', 'stage', 'prod', 'combination']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="environmentType">
                                Environment Type을 선택해주세요.
                            </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Network Architecture Type" label-for="networkArchitectureType" :label-cols="3">
                        <b-form-select id="networkArchitectureType" :plain="true" :options="['선택', 'Private Only', 'Private + Public']" value="선택"></b-form-select>
                    </b-form-group>
                    <b-form-group label="SRE Integration" label-for="sreIntegration" :label-cols="3">
                        <b-form-radio-group id="sreIntegration" v-model="selected" name="sreIntegration" class="mt-1">
                            <b-form-radio value="yes">Yes</b-form-radio>
                            <b-form-radio value="no">No</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <b-form-group label="Installation Account" label-for="installationAccount" :label-cols="3">
                        <b-form-input type="number" id="installationAccount"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Installation Completed Date" label-for="installationCompletedDate" :label-cols="3">
                        <b-form-input type="date" id="installationCompletedDate"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Installation Auditor" label-for="installationAuditor" :label-cols="3">
                        <b-form-input type="text" id="installationAuditor"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Cloud Service Provider" label-for="cloudServiceProvider" :label-cols="3">
                        <b-form-select id="cloudServiceProvider" :plain="true" :options="['선택', 'IBM', 'AWS', 'Azure', 'GCP']" value="선택"></b-form-select>
                    </b-form-group>
                    <b-form-group label="Managed Kubernetes Version" label-for="managedKubernetesVersion" :label-cols="3">
                        <b-form-input type="number" id="managedKubernetesVersion"></b-form-input>
                    </b-form-group>
                </b-form>
                <div class="tab-bottom-btn">
                    <router-link :to="{ path: '/cluster/' }">
                        <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                    <b-button variant="primary" class="right"><i class="icon-check"></i> 저장</b-button>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-folder-alt mr-1"></i> Projects
                </template>
                <b-form-group>
                    <b-button variant="success" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-plus"></i> Environment 추가</b-button>
                    <b-button variant="secondary" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-reload"></i> Environment 수정</b-button>
                    <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Environment 삭제</b-button>
                    <b-button variant="success" size="sm" v-b-modal.product-modal><i class="icon-plus"></i> Product 추가</b-button>
                    
                    <div class="float-right">
                        <b-button variant="success" size="sm" class="mr-2" v-b-modal.project-modal><i class="icon-plus"></i> Project 추가</b-button>
                        <b-button variant="danger" size="sm"><i class="icon-close"></i> Project 삭제</b-button>
                    </div>
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
                                <th>Project</th>
                                <th>Environment</th>
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
                                <th rowspan="4" class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="BiOk" value="">
                                        <label class="custom-control-label" for="BiOk">BiOk</label>
                                    </div>
                                </th>
                                <td rowspan="2">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="BiOk_prod" value="1">
                                        <label class="custom-control-label" for="BiOk_prod">prod</label>
                                    </div>
                                </td>
                                <td class="text-center">Y</td>
                                <td class="text-center">2020-01-01</td>
                                <td class="text-center">ZCP</td>
                                <td class="text-center">4GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">N</td>
                                <td class="text-center">2020-01-01</td>
                                <td class="text-center">ZDB</td>
                                <td class="text-center">10GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="BiOk_dev" value="">
                                        <label class="custom-control-label" for="BiOk_dev">dev</label>
                                    </div>
                                </td>
                                <td class="text-center">Y</td>
                                <td class="text-center">2020-01-01</td>
                                <td class="text-center">ZCP</td>
                                <td class="text-center">4GB</td>
                                <td class="text-center">2019-10-30</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">N</td>
                                <td class="text-center">2020-01-01</td>
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
                                        <input type="checkbox" class="custom-control-input" id="ITSM" value="">
                                        <label class="custom-control-label" for="ITSM">ITSM</label>
                                    </div>
                                </th>
                                <td>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="ITSM_dev" value="2">
                                        <label class="custom-control-label" for="ITSM_dev">dev</label>
                                    </div>
                                </td>
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
                        <b-form-group label="Project" label-for="environmentProject" :label-cols="4" label-class="required">
                            <b-form-select id="environmentProject" :plain="true" :options="['선택', 'BiOk', 'ITSM']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="environmentProject">
                                Project를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Environment" label-for="environment" :label-cols="4" label-class="required">
                            <b-form-select id="environment" :plain="true" :options="['선택', 'dev', 'qa', 'stage', 'prod', 'combination']" value="선택" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="environment">
                                Environment를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Billing YN" label-for="environmentBillingYn" :label-cols="4">
                            <b-form-radio-group id="environmentBillingYn" v-model="billingSelected" name="billingYn" class="mt-1">
                                <b-form-radio value="yes">Yes</b-form-radio>
                                <b-form-radio value="no">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group label="Billing Start Date" label-for="environmentBillingStartDate" :label-cols="4">
                            <b-form-input type="date" id="environmentBillingStartDate"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Environment -->
                
                <!-- modal : Project -->
                <b-modal id="project-modal" title="Project" centered>
                    <b-form>
                        <b-form-group label="Project" label-for="project" :label-cols="4" label-class="required">
                            <b-form-select id="project" :plain="true" :options="['선택', 'BiOk', 'ITSM']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="project">
                                Project를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Environment" label-for="projectEnvironment" :label-cols="4" label-class="required">
                            <b-form-select id="projectEnvironment" :plain="true" :options="['선택', 'dev', 'qa', 'stage', 'prod', 'combination']" value="선택" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="projectEnvironment">
                                Environment를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Status" label-for="projectStatus" :label-cols="4" label-class="required">
                            <b-form-select id="projectStatus" :plain="true" :options="['선택', 'Development', 'Operation']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="projectStatus">
                                Status를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Billing YN" label-for="projectBillingYn" :label-cols="4">
                            <b-form-radio-group id="projectBillingYn" v-model="projectBillingSelected" name="billingYn" class="mt-1">
                                <b-form-radio value="yes">Yes</b-form-radio>
                                <b-form-radio value="no">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group label="Billing Start Date" label-for="projectBillingStartDate" :label-cols="4">
                            <b-form-input type="date" id="projectBillingStartDate"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Project -->
                
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
                    <router-link :to="{ path: '/cluster/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-calculator mr-1"></i> Estimate Sheet
                </template>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/cluster/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-basket mr-1"></i> Orders
                </template>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/cluster/' }">
                        <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
                    </router-link>
                </div>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-layers mr-1"></i> Clusters
                </template>
                <div class="tab-bottom-btn text-center">
                    <router-link :to="{ path: '/cluster/' }">
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
            project_fields: [
                { key: 'project_name', label: 'Project' },
                { key: 'project_zcp', label: 'ZCP', tdClass: 'text-center' },
                { key: 'project_zdb', label: 'ZDB', tdClass: 'text-center' },
                { key: 'project_actions', label: 'Actions', tdClass: 'text-center' }
            ],
            project_items: [
                { project_name: '', project_zcp: '', project_zdb: '', project_actions: '' },
                { project_name: '', project_zcp: '', project_zdb: '', project_actions: '' }
            ],
            selected: 'yes',
            billingSelected: 'yes',
            projectBillingSelected: 'yes'
        }
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>