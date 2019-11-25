<template>
<div class="animated fadeIn">
    <h1 class="display-tit mb-3">
        Customer <b-badge class="m-1" variant="danger">{{ customersPage.totalCount }}</b-badge>
        <b-button variant="success" size="sm" class="ml-2" @click="customerAdd"><i class="icon-plus"></i> Customer 추가</b-button>
    </h1>
    <b-card>
        <div class="mb-3">
            <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                <b-form-select v-model="customersPage.pageSize" id="perPageSelect" :options="pageOptions" @change="getCustomersByPage(1)" class="w-auto"></b-form-select>
            </b-form-group>
            <b-pagination v-model="customersPage.pageNo" :total-rows="customersPage.totalCount" :per-page="customersPage.pageSize" @input="getCustomersByPage(customersPage.pageNo)" align="right" class="my-0">
            </b-pagination>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="fields" :items="customers">
                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '5%' : '' }">
                </template>

                <template slot="no" slot-scope="data">
                    {{ (customersPage.totalCount - ((customersPage.pageNo - 1) * customersPage.pageSize)) - data.index }}
                </template>
                <template slot="cloud_account" slot-scope="data">
                    <b-link v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'AWS')">
                        <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1"
                            v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'AWS').cspId != '' || data.item.customerCloudAccounts.find(o => o.cspCode == 'AWS').accountAlias != ''">
                    </b-link>
                    <b-link v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'AZURE')">
                        <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1"
                            v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'AZURE').cspId != '' || data.item.customerCloudAccounts.find(o => o.cspCode == 'AWS').accountAlias != ''">
                    </b-link>
                    <b-link v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'CLOUDZ')">
                        <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1"
                            v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'CLOUDZ').cspId != '' || data.item.customerCloudAccounts.find(o => o.cspCode == 'CLOUDZ').accountAlias != ''">
                    </b-link>
                    <b-link v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'GCP')">
                        <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1"
                            v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'GCP').cspId != '' || data.item.customerCloudAccounts.find(o => o.cspCode == 'GCP').accountAlias != ''">
                    </b-link>
                    <b-link v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'IBM')">
                        <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1"
                            v-if="data.item.customerCloudAccounts.find(o => o.cspCode == 'IBM').cspId != '' || data.item.customerCloudAccounts.find(o => o.cspCode == 'IBM').accountAlias != ''">
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
                    <router-link :to="{ name: 'CustomerDetail', params: { id: data.item.id } }">
                        <b-button variant="secondary" size="sm" class="mr-1"><i class="fa fa-pencil"></i></b-button>
                    </router-link>
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
import {
    Switch as cSwitch
} from '@coreui/vue'
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
            fields: [{
                    key: 'no',
                    label: 'No',
                    tdClass: 'text-center'
                },
                {
                    key: 'nameEn',
                    label: 'Customer Name(EN)',
                    tdClass: 'text-left'
                },
                {
                    key: 'nameKr',
                    label: 'Customer Name(KR)',
                    tdClass: 'text-left'
                },
                {
                    key: 'cloud_account',
                    label: 'Cloud Account',
                    tdClass: 'text-left'
                },
                {
                    key: 'projects',
                    label: 'Projecs',
                    tdClass: 'text-center'
                },
                {
                    key: 'clusters',
                    label: 'Clusters',
                    tdClass: 'text-center'
                },
                {
                    key: 'createdDt',
                    label: 'Created Date',
                    tdClass: 'text-center'
                },
                {
                    key: 'activation',
                    label: 'Activation',
                    tdClass: 'text-center'
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    tdClass: 'text-center'
                }
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
        customersPage: function() {
            return this.$store.state.customer.customersPage
        }
    },
    created() {
        this.getCustomers()
    },
    methods: {
        scrollHandle(evt) {
            // console.log(evt)
        },
        getCustomers() {
            this.$store.dispatch('customer/getCustomers', this.customersPage)
        },
        getCustomersByPage(pageNo) {
            this.$store.commit('customer/setCustomersPageNo', pageNo)
            this.$store.dispatch('customer/getCustomers', this.customersPage)
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
                        let errorMsg = response.data.message + ' [' + response.data.code + ']'

                        this.$zadmin.alert(errorMsg)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        }
    }
}
</script>
