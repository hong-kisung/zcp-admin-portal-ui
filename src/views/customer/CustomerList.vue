<template>
<div class="animated fadeIn">
    <h1 class="display-tit mb-3">
        Customer <b-badge class="m-1" variant="danger">{{ customersCondition.page.totalCount }}</b-badge>
        <b-button variant="success" class="float-right" @click="customerAdd"><i class="icon-plus"></i> Customer 추가</b-button>
    </h1>
    <b-card>
        <div class="mb-3">
            <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                <b-form-select v-model="customersCondition.page.pageSize" id="perPageSelect" :options="pageOptions" @change="getCustomersByPage(1)" class="w-auto"></b-form-select>
            </b-form-group>
            <b-pagination v-model="customersCondition.page.pageNo" :total-rows="customersCondition.page.totalCount" :per-page="customersCondition.page.pageSize" @input="getCustomersByPage(customersCondition.page.pageNo)" align="right" class="my-0">
            </b-pagination>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="fields" :items="customers"
                :sort-by.sync="customersCondition.sortBy" :sort-desc.sync="customersCondition.sortDesc" @sort-changed="sortingChanged">

                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'no' ? '5%' : '' }">
                </template>

                <template slot="no" slot-scope="data">
                    {{ (customersCondition.page.totalCount - ((customersCondition.page.pageNo - 1) * customersCondition.page.pageSize)) - data.index }}
                </template>
                <template slot="nameKr" slot-scope="data">
                    <router-link :to="{ name: 'CustomerDetail', params: { id: data.item.id, name: data.item.nameKr } }">
                        {{data.item.nameKr}}
                    </router-link>
                </template>
                <template slot="cloudAccounts" slot-scope="data">
                    <b-link v-if="data.item.cloudAccounts.find(o => o.cspCode == 'AWS')">
                        <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1"
                            v-if="data.item.cloudAccounts.find(o => o.cspCode == 'AWS').cspCnt > 0 ">
                    </b-link>
                    <b-link v-if="data.item.cloudAccounts.find(o => o.cspCode == 'AZURE')">
                        <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1"
                            v-if="data.item.cloudAccounts.find(o => o.cspCode == 'AZURE').cspCnt > 0 ">
                    </b-link>
                    <b-link v-if="data.item.cloudAccounts.find(o => o.cspCode == 'CLOUDZ')">
                        <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1"
                            v-if="data.item.cloudAccounts.find(o => o.cspCode == 'CLOUDZ').cspCnt > 0 ">
                    </b-link>
                    <b-link v-if="data.item.cloudAccounts.find(o => o.cspCode == 'GCP')">
                        <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1"
                            v-if="data.item.cloudAccounts.find(o => o.cspCode == 'GCP').cspCnt > 0 ">
                    </b-link>
                    <b-link v-if="data.item.cloudAccounts.find(o => o.cspCode == 'IBM')">
                        <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1"
                            v-if="data.item.cloudAccounts.find(o => o.cspCode == 'IBM').cspCnt > 0 ">
                    </b-link>
                </template>
                <template slot="projects" slot-scope="data">
                    <b-link>{{data.item.projects}}</b-link>
                </template>
                <template slot="clusters" slot-scope="data">
                    <b-link>{{data.item.clusters}}</b-link>
                </template>
                <template slot="activation" slot-scope="data">
                    <label class="mx-1 mb-0 switch switch-label switch-success">
                        <input class="switch-input" type="checkbox" checked="" v-model="data.item.activation" @click="updateCustomerActivation(data.item.id, data.item.activation)">
                        <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                    </label>
                </template>
                <template slot="actions" slot-scope="data">
                    <b-button variant="danger" size="sm" @click="removeCustomer(data.item.id, data.item.nameEn)"><i class="fa fa-close"></i></b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <customerAdd v-bind:dialogVisible="customerAddDialog" v-on:fire-dialog-closed="customerAddDialog = false" />
    </b-card>
</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch} from '@coreui/vue'
import axios from 'axios'
import customerAdd from './CustomerAdd'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        customerAdd
    },
    data() {
        return {
            fields: [
                { key: 'no', label: 'No', tdClass: 'text-center'},
                { key: 'nameEn', label: 'Customer Name(EN)', tdClass: 'text-left', sortable: true},
                { key: 'nameKr', label: 'Customer Name(KR)', tdClass: 'text-left', sortable: true},
                { key: 'cloudAccounts', label: 'Cloud Account', tdClass: 'text-left'},
                { key: 'projectCnt', label: 'Projecs', tdClass: 'text-center' },
                { key: 'clusterCnt', label: 'Clusters', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center', sortable: true},
                { key: 'activation', label: 'Activation', tdClass: 'text-center', sortable: true},
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            pageOptions: [10, 20, 30, 50, 100],
            customerAddDialog: false,
            customerId: 0
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
        customers: function() {
            return this.$store.state.customer.customers
        },
        customersCondition: function() {
            return this.$store.state.customer.customersCondition
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        scrollHandle(evt) {
            // console.log(evt)
        },
        initialize() {
            this.getCustomers()
        },
        getCustomers() {
            this.$store.dispatch('customer/getCustomers', this.customersCondition)
        },
        getCustomersByPage(pageNo) {
            this.$store.commit('customer/setCustomersPageNo', pageNo)
            this.$store.dispatch('customer/getCustomers', this.customersCondition)
        },
        customerAdd() {
            this.$store.commit('customer/setCustomer', {})
            this.customerAddDialog = true
        },
        updateCustomerActivation(id, activation) {
            let yn = (activation == true) ? 'N' : 'Y'
            axios.put('/api/admin-customer/customers/' + id + '/activation/' + yn).then(response => {
                let customer = this.$store.state.customer.customers.find(o => o.id == id) || {}
                customer.activation = (yn === 'N') ? false : true
            }).catch(error => {
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeCustomer(id, nameEn) {
            this.$zadmin.confirm(nameEn + '을(를) 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-customer/customers/' + id).then(response => {
                    if (response && response.status === 204) {
                        this.getCustomers()
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    let response = error.response
                    if (response.data) {
                        this.$zadmin.alert(response.data.message)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        sortingChanged(ctx) {
    		this.customersCondition.sortBy = ctx.sortBy
			this.customersCondition.sortDesc = ctx.sortDesc
			this.$store.dispatch('customer/getCustomers', this.customersCondition)
		}
    }
}
</script>
