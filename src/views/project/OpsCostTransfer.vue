<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Ops. Cost Transfer Status</h1>
        <b-card>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '5%' : '' }">
                    </template>
                    <template slot="project" slot-scope="data">
                        <b-link>{{data.item.project}}</b-link>
                    </template>
                    <template slot="stakeholder" slot-scope="data">
                        <b-button variant="primary" size="sm"><i class="icon-people"></i></b-button>
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
                { key: 'request_date', label: 'Request Date', tdClass: 'text-center' },
                { key: 'billing_date', label: 'Billing Date', tdClass: 'text-center' },
                { key: 'billing_agreement', label: 'Billing Agreement', tdClass: 'text-center' },
                { key: 'labor_cost', label: 'Labor Cost(M)', tdClass: 'text-right' },
                { key: 'cloud_cost', label: 'Cloud Cost(M)', tdClass: 'text-right' },
                { key: 'cost_sum', label: 'Cost Sum(M)', tdClass: 'text-right' },
                { key: 'labor_cost_year', label: 'Labor Cost(This Year)', tdClass: 'text-right' },
                { key: 'cloud_cost_year', label: 'Cloud Cost(This Year)', tdClass: 'text-right' },
                { key: 'cost_sum_year', label: 'Cost Sum(This Year)', tdClass: 'text-right' },
                { key: 'stakeholder', label: 'Stakeholder', tdClass: 'text-center' }
            ],
            items: [
                { number: '1', customer: 'SKI', project: 'BiOK', status: 'Operation', product: 'Cloud Z CP', request_date: '2019-09-26', billing_date: '2019-09', billing_agreement: 'OK', labor_cost: '₩ 210,000', cloud_cost: '₩ 890,000', cost_sum: '₩ 1,100,000', labor_cost_year: '₩ 210,000', cloud_cost_year: '₩ 890,000', cost_sum_year: '₩ 1,100,000', stakeholder: '' },
                { number: '2', customer: 'SKI', project: 'BiOK', status: 'Operation', product: 'Cloud Z CP', request_date: '2019-09-26', billing_date: '2019-09', billing_agreement: 'OK', labor_cost: '₩ 210,000', cloud_cost: '₩ 890,000', cost_sum: '₩ 1,100,000', labor_cost_year: '₩ 210,000', cloud_cost_year: '₩ 890,000', cost_sum_year: '₩ 1,100,000', stakeholder: '' }
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