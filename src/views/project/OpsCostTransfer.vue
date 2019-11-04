<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Ops. Cost Transfer Status
            <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="6">
                            <b-form-group>
                                <label for="customer">Customer</label>
                                <b-form-input type="text" id="customer" placeholder="Customer를 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group>
                                <label for="project">Project</label>
                                <b-form-input type="text" id="project" placeholder="Project를 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group>
                                <label for="product">Product</label>
                                <b-form-input type="text" id="product" placeholder="Product를 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group>
                                <label for="environment">Environment</label>
                                <b-form-input type="text" id="environment" placeholder="Environment를 입력하세요."></b-form-input>
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
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '5%' : '' }">
                    </template>
                    <template slot="project" slot-scope="data">
                        <b-link>{{data.item.project}}</b-link>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components: {
        VuePerfectScrollbar
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
                { key: 'customer', label: 'Customer', tdClass: 'text-center' },
                { key: 'project', label: 'Project', tdClass: 'text-center' },
                { key: 'status', label: 'Status', tdClass: 'text-center' },
                { key: 'product', label: 'Product', tdClass: 'text-center' },
                { key: 'environment', label: 'Environment', tdClass: 'text-center' },
                { key: 'created_date', label: 'Created Date', tdClass: 'text-center' },
                { key: 'billing_date', label: 'Billing Date', tdClass: 'text-center' },
                { key: 'billing_agreement', label: 'Billing Agreement', tdClass: 'text-center' },
                { key: 'labor_cost', label: 'Labor Cost(M)', tdClass: 'text-right' },
                { key: 'cloud_cost', label: 'Cloud Cost(M)', tdClass: 'text-right' },
                { key: 'cost_sum', label: 'Cost Sum(M)', tdClass: 'text-right' },
                { key: 'labor_cost_year', label: 'Labor Cost(This Year)', tdClass: 'text-right' },
                { key: 'cloud_cost_year', label: 'Cloud Cost(This Year)', tdClass: 'text-right' },
                { key: 'cost_sum_year', label: 'Cost Sum(This Year)', tdClass: 'text-right' },
                { key: 'mrr', label: 'MRR', tdClass: 'text-center' },
                { key: 'cost_transfer', label: '비용이관 프로젝트', tdClass: 'text-center' },
                { key: 'project_department', label: '프로젝트 담당부서', tdClass: 'text-center' },
                { key: 'project_manager', label: '프로젝트 담당자', tdClass: 'text-center' },
                { key: 'cost_transfer_state', label: '비용이관상태', tdClass: 'text-center' },
                { key: 'etc', label: '비고' }
            ],
            items: [
                { number: '1', customer: 'SKI', project: 'BiOK', status: 'Operation', product: 'Cloud Z CP', environment: 'Dev', created_date: '2019-09-26', billing_date: '2019-09', billing_agreement: 'OK', labor_cost: '₩ 210,000', cloud_cost: '₩ 890,000', cost_sum: '₩ 1,100,000', labor_cost_year: '₩ 210,000', cloud_cost_year: '₩ 890,000', cost_sum_year: '₩ 1,100,000', mrr: '', cost_transfer: '', project_department: '', project_manager: '', cost_transfer_state: '', etc: '기타사항이 여기에 기록됩니다.' },
                { number: '2', customer: 'SKI', project: 'BiOK', status: 'Operation', product: 'Cloud Z CP', environment: 'Prod', created_date: '2019-09-26', billing_date: '2019-09', billing_agreement: 'OK', labor_cost: '₩ 210,000', cloud_cost: '₩ 890,000', cost_sum: '₩ 1,100,000', labor_cost_year: '₩ 210,000', cloud_cost_year: '₩ 890,000', cost_sum_year: '₩ 1,100,000', mrr: '', cost_transfer: '', project_department: '', project_manager: '', cost_transfer_state: '', etc: '기타사항이 여기에 기록됩니다.' }
            ],
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