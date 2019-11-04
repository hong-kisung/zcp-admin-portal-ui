<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Projects <b-badge class="m-1" variant="danger">2</b-badge>
            <b-button variant="success" size="sm" class="ml-2" v-b-modal.project-add-modal><i class="icon-plus"></i> Project 추가</b-button>
            <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="customer">Customer</label>
                                <b-form-select id="customer" :plain="true" :options="['선택', 'SKI', 'SKN', 'SK E&S', 'FSK', 'SK C&C']" value="선택"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="project">Project</label>
                                <b-form-input type="text" id="project" placeholder="Project를 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="status">Status</label>
                                <b-form-select id="status" :plain="true" :options="['선택', 'Running', 'Proposal', 'Development']" value="선택"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group>
                                <label for="activation">Activation</label>
                                <div>
                                    <b-form-radio-group id="activation" v-model="activationSelected" name="activation">
                                        <b-form-radio value="all">All</b-form-radio>
                                        <b-form-radio value="yes">Yes</b-form-radio>
                                        <b-form-radio value="no">No</b-form-radio>
                                    </b-form-radio-group>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-button variant="primary" block><i class="fa fa-search"></i> 검색</b-button>
                        </b-col>
                    </b-form>
                </b-card>
            </b-collapse>
        </div>
        <b-card>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select v-model="perPage" id="perPageSelect" :options="pageOptions" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="my-0"></b-pagination>
            </div>
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
                    <template slot="projects_estimates" slot-scope="data">
                        <b-button variant="warning" size="sm"><i class="icons cui-note"></i></b-button>
                    </template>
                    <template slot="projects_actions" slot-scope="data">
                        <router-link :to="{ path: '/project/projectsdetail' }">
                            <b-button variant="secondary" size="sm" class="mr-1"><i class="fa fa-pencil"></i></b-button>
                        </router-link>
                        <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                    </template>
                    <template slot="projects_inactive" slot-scope="data">
                        <label class="mx-1 mb-0 switch switch-label switch-success">
                            <input class="switch-input" type="checkbox" checked="">
                            <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                        </label>
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
                    <b-form-group label="Status" label-for="status" :label-cols="3" label-class="required">
                        <b-form-select id="status" :plain="true" :options="['선택', 'Running', 'Proposal', 'Development']" value="선택"></b-form-select>
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
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Project 추가 -->
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
                { key: 'projects_actions', label: 'Actions', tdClass: 'text-center' },
                { key: 'projects_inactive', label: 'Activation', tdClass: 'text-center' }
            ],
            projects_items: [
                { projects_number: '1', projects_customer: 'SKI', projects_name: 'BiOK', projects_status: 'Operation', projects_dev: '2018/10/01~2018/12/31', projects_date: '2019-09-26', projects_stakeholder: '', projects_estimates: '', projects_clusters: 'cloudzcp-ski-prod', projects_actions: '', projects_inactive: '' },
                { projects_number: '2', projects_customer: 'SKN', projects_name: 'MOS', projects_status: 'Development', projects_dev: '2018/10/01~2018/12/31', projects_date: '2019-09-26', projects_stakeholder: '', projects_estimates: '', projects_clusters: 'cloudzcp-skn-dev', projects_actions: '', projects_inactive: '' }
            ],
            selected: 'yes',
            activationSelected: 'all',
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30, 50, 100]
        }
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>