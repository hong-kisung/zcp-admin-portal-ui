<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Projects</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" v-b-modal.project-add-modal><i class="icon-plus"></i> Project 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="projects_fields" :items="projects_items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'projects_number' ? '5%' : '' }">
                    </template>
                    <template slot="projects_clusters" slot-scope="data">
                        <b-link>{{data.item.projects_clusters}}</b-link>
                    </template>
                    <template slot="projects_stakeholder" slot-scope="data">
                        <b-button variant="primary" size="sm"><i class="icon-people"></i></b-button>
                    </template>
                    <template slot="projects_actions" slot-scope="data">
                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.project-detail-modal><i class="fa fa-pencil"></i></b-button>
                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                        Inactive : <c-switch color="success" checked label />
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : Project 추가 -->
            <b-modal id="project-add-modal" size="lg" title="Project" centered>
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
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Customer 추가 -->
            
            <!-- modal : 상세보기 -->
            <b-modal id="project-detail-modal" size="lg" title="Project Detail" scrollable centered hide-footer>
                <div>
                    <h5 class="mb-3">Basic Information</h5>
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
                        <b-form-group label="Billing Date" label-for="billingDate" :label-cols="3">
                            <b-form-input type="date" id="billingDate"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Billing Agreement" label-for="billingAgreement" :label-cols="3" class="align-items-center">
                            <c-switch color="danger" checked label variant="pill" />
                        </b-form-group>
                        <b-form-group label="Status" label-for="status" :label-cols="3" label-class="required">
                            <b-form-select id="status" :plain="true" :options="['선택', 'Development', 'Operation']" value="선택" required></b-form-select>
                                <b-form-invalid-feedback id="status">
                                    Status를 선택해주세요.
                                </b-form-invalid-feedback>
                        </b-form-group>
                    </b-form>
                    <div class="text-right">
                        <b-button variant="primary"><i class="icon-check"></i> 저장</b-button>
                    </div>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">
                        Stakeholders
                        <b-button variant="success" size="sm" class="float-right"><i class="icon-plus"></i> 추가</b-button>
                    </h5>
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
                    <div class="text-right">
                        <b-button variant="primary"><i class="icon-check"></i> 저장</b-button>
                    </div>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">Estimate Sheet</h5>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">Orders</h5>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">Clusters</h5>
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
            projects_fields: [
                { key: 'projects_number', label: 'No', tdClass: 'text-center' },
                { key: 'projects_customer', label: 'Customer', tdClass: 'text-center' },
                { key: 'projects_name', label: 'Project', tdClass: 'text-center' },
                { key: 'projects_status', label: 'Status', tdClass: 'text-center' },
                { key: 'projects_dev', label: 'Dev. Period', tdClass: 'text-center' },
                { key: 'projects_date', label: 'Launching Date', tdClass: 'text-center' },
                { key: 'projects_stakeholder', label: 'Stakeholder', tdClass: 'text-center' },
                { key: 'projects_estimates', label: 'Estimates', tdClass: 'text-center' },
                { key: 'projects_clusters', label: 'Clusters' },
                { key: 'projects_actions', label: 'Actions', tdClass: 'text-center' }
            ],
            projects_items: [
                { projects_number: '1', projects_customer: 'SKI', projects_name: 'BiOK', projects_status: 'Operation', projects_dev: '~', projects_date: '2019-09-26', projects_stakeholder: '', projects_estimates: '', projects_clusters: 'cloudzcp-ski-prod', projects_actions: '' },
                { projects_number: '2', projects_customer: 'SKN', projects_name: 'MOS', projects_status: 'Development', projects_dev: '~', projects_date: '2019-09-26', projects_stakeholder: '', projects_estimates: '', projects_clusters: 'cloudzcp-skn-dev', projects_actions: '' }
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