<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
        Customer <b-badge class="m-1" variant="danger">{{ customersPage.totalCount }}</b-badge>
        </h1>
        <b-card>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select v-model="page.pageSize" id="perPageSelect" :options="pageOptions" @change="getCustomersByPage(1)" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="page.pageNo" :total-rows="customersPage.totalCount" :per-page="page.pageSize" @input="getCustomersByPage(page.pageNo)" align="right" class="my-0">
                </b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="customers">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'number' ? '5%' : '' }">
                    </template>

                    <template slot="no" slot-scope="data">
                        {{ (customersPage.totalCount - customersPage.beginOfPage) - data.index }}
                    </template>
                    <template slot="cloud_account" slot-scope="data">
                        <b-link><img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1"></b-link>
                        <b-link><img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1"></b-link>
                        <b-link><img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1"></b-link>
                        <b-link><img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1"></b-link>
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
                        <b-button variant="danger" size="sm" @click="removeCustomer(data.item.id)"><i class="fa fa-close"></i></b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            <b-form-group>
                <b-button variant="success" size="sm" @click="customerAdd"><i class="icon-plus"></i> Customer 추가</b-button>
            </b-form-group>

            <customerAdd
		    	v-bind:dialogVisible="customerAddDialog"
		    	v-on:fire-dialog-closed="customerAddDialog = false"
		    />
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import customerAdd from './CustomerAdd'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        customerAdd
    },
    data()  {
        return {
            fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'nameEn', label: 'Customer Name(EN)', tdClass: 'text-center' },
                { key: 'nameKr', label: 'Customer Name(KR)', tdClass: 'text-center' },
                { key: 'cloud_account', label: 'Cloud Account', tdClass: 'text-center' },
                { key: 'projects', label: 'Projecs', tdClass: 'text-center' },
                { key: 'clusters', label: 'Clusters', tdClass: 'text-center' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            pageOptions: [10, 20, 30, 50, 100],
            search: {

            },
            page: {
                pageNo: 1,
                pageSize: 10
            },
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
            return this.$store.state.customer.customers;
        },
        customersPage: function() {
            return this.$store.state.customer.customersPage;
        },
    },
    created() {
        this.getCustomers();
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        getCustomers() {
            let listParams = this.getCustomersParams();
            this.$store.dispatch('customer/getCustomers', listParams)
        },
        getCustomersByPage(pageNo) {
          let listParams = this.getCustomersParams();
          listParams.page.pageNo = pageNo;

          this.$store.dispatch('customer/getCustomers', listParams)
        },
        getCustomersParams() {
            let search = this.search;
            let page = this.page;
            page.pageNo = this.customersPage.pageNo == undefined ? 1 : this.customersPage.pageNo;

            let listParams = {
                search: search,
                page: page
            }

            return listParams;
        },
        customerAdd() {
            this.$store.commit('customer/setCustomer', {})
			this.customerAddDialog = true;
		},
        updateCustomerActivation(id, activation) {
            let yn = (activation == true) ? 'N' : 'Y';
            axios.put('/api/admin-customer/customers/' + id + '/activation/' + yn).then(response => {
                let customer = this.$store.state.customer.customers.find(o => o.id == id) || {};
                customer.activation = (yn === 'N') ? false : true;
            }).catch(error => {
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeCustomer(id) {
            this.$zadmin.confirm('고객 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false;

                axios.delete('/api/admin-customer/customers/' + id).then(response => {
                    if (response && response.status === 204) {
                        this.getCustomers()
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    console.log(error);
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                })

            });
        }
    }
}
</script>
