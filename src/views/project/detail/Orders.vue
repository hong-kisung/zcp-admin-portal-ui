<template>
    <b-tab>
        <template slot="title">
            <i class="icon-basket mr-1"></i> Orders
        </template>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped small hover bordered :fields="fields" :items="projectClustersOrders">
                <template slot="no" slot-scope="data">
                    {{ projectClustersOrders.length - data.index }}
                </template>
                <template slot="orderType" slot-scope="data">
                    {{ data.item.orderType | toOrderTypeText }}
                </template>
                <template slot="orderStatus" slot-scope="data">
                    {{ data.item.orderStatus | toOrderStatusText }}
                </template>
                <template slot="orderUserName" slot-scope="data">
                    {{ data.item.orderUserName }} ({{ data.item.orderUserId }})
                </template>
                <template slot="productPackageName" slot-scope="data">
                    <b-link @click="getOrder(data.item.id)">{{data.item.productPackageName}}</b-link>
                    <i class="fa fa-check ml-1" v-if="data.item.clusterName"></i>
                </template>
                <template slot="orderStatusLog" slot-scope="data">
                    <b-button variant="outline-warning" size="sm" @click="getOrderStatusLogs(data.item.id)"><i class="icon-clock"></i>이력보기</b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <!-- order detail modal -->
        <b-modal id="order-info-modal" scrollable title="Order" size="xl" centered v-model="orderDetailDialog" @close="closeOrderDetailDialog">
            <div>
                <h5 class="mb-3">Order Infomation</h5>
                <b-form class="row">
                    <b-col lg="6">
                        <b-form-group label="Order ID" label-for="md-orderNumber" :label-cols="3">
                            <b-form-input type="number" id="md-orderNumber" :value="order.orderId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Orderd Date" label-for="md-orderDate" :label-cols="3">
                            <b-form-input type="text" id="md-orderDate" :value="order.orderDate" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Order Type" label-for="md-orderType" :label-cols="3">
                            <b-form-input type="text" id="md-orderType" :value="order.orderType | toOrderTypeText" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Order Status" label-for="md-orderState" :label-cols="3">
                            <b-form-input type="text" id="md-orderState" :value="order.orderStatus | toOrderStatusText" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Orderd(ID)" label-for="md-orderUserId" :label-cols="3">
                            <b-form-input type="text" id="md-orderUserId" :value="order.orderUserName + ' (' + order.orderUserId + ')'" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Master(ID)" label-for="md-orderMasterId" :label-cols="3">
                            <b-form-input type="text" id="md-orderMasterId" :value="order.masterUserName + ' (' + order.masterUserId + ')'" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Customer ID" label-for="md-orderCustomerId" :label-cols="3">
                            <b-form-input type="text" id="md-orderCustomerId" :value="order.orderCustomerId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6">
                        <b-form-group label="Company Name" label-for="md-companyName" :label-cols="3">
                            <b-form-input type="text" id="md-companyName" :value="order.companyName" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Product Name" label-for="md-productNameShort" :label-cols="3">
                            <b-form-input type="text" id="md-productNameShort" :value="orderProduct.productName" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Package Name" label-for="md-productPackageName" :label-cols="3">
                            <b-form-input type="text" id="md-productPackageName" :value="orderProduct.productPackageName" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Cliend ID" label-for="md-client" :label-cols="3">
                            <b-form-input type="text" id="md-client" :value="orderProduct.clientId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Purchase Order ID" label-for="md-orderBuyNumber" :label-cols="3">
                            <b-form-input type="number" id="md-orderBuyNumber" :value="orderProduct.purchasedOrderId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Description" label-for="md-description" :label-cols="3">
                            <b-form-input type="text" id="md-description" :value="orderProduct.productDescription" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Batch Target YN" label-for="md-bacthType" :label-cols="3">
                            <b-form-input type="text" id="md-bacthType" :value="order.batchTargetYn" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Created" label-for="md-registrant" :label-cols="3">
                            <b-form-input type="text" id="md-registrant" :value="order.regId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="Created Date" label-for="md-registDate" :label-cols="3">
                            <b-form-input type="text" id="md-registDate" :value="order.regDate" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <!--
                    <b-col lg="6">
                        <b-form-group label="수정자" label-for="md-modifier" :label-cols="3">
                            <b-form-input type="text" id="md-modifier" :value="order.modId" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group label="수정일시" label-for="md-modifyDate" :label-cols="3">
                            <b-form-input type="text" id="md-modifyDate" :value="order.modDate" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    -->
                </b-form>
                <VuePerfectScrollbar class="scroll-area mt-3" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped small bordered :fields="orderPackageCategoryFields" :items="orderPackageCategories">
                        <template slot="isMandatory" slot-scope="data">
                            {{ data.item.isMandatory == true ? 'Y' : 'N' }}
                        </template>
                        <template slot="meteringType" slot-scope="data">
                            {{ data.item.meteringType | toMeteringTypeText }}
                        </template>
                        <template slot="billingCycle" slot-scope="data">
                            {{ data.item.billingCycle | toBillingCycleText }}
                        </template>
                        <template slot="itemPrice" slot-scope="data">
                            {{ data.item.itemPrice | formatNumber | toKRW }}
                        </template>
                    </b-table>
                </VuePerfectScrollbar>
            </div>
            <hr>
            <div>
                <h5 class="mb-3">Order Cluster</h5>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <b-table striped small bordered :fields="orderClusterFileds" :items="orderClusters"></b-table>
                </VuePerfectScrollbar>
            </div>
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="closeOrderDetailDialog"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/project/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
        </div>

        <!-- local-aside : history -->
        <aside class="local-aside-menu">
            <b-tabs>
                <b-tab>
                    <template slot="title">
                        <b-link href="#" @click="closeOrderStatusLog()"><i class="fa fa-close"></i></b-link>
                    </template>
                    <b-list-group class="list-group-accent">
                        <b-list-group-item class="list-group-item-accent-primary bg-light text-center font-weight-bold text-muted text-uppercase">
                            <i class="fa fa-history"></i> 변경이력
                        </b-list-group-item>
                        <b-list-group-item class="list-group-item-accent-danger" v-for="(item) in orderStatusLogs">
                            <div>{{ item.orderStatus | toOrderStatusText }}</div>
                            <div>
                                <small class="text-muted">
                                    <i class="icon-user"></i>&nbsp;&nbsp;{{ item.regId }}
                                </small>
                            </div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;{{ item.regDate }}
                            </small>
                        </b-list-group-item>
                    </b-list-group>
                </b-tab>
            </b-tabs>
        </aside>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'

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
        },
        projectClustersOrders: function() {
            return this.$store.state.project.projectClustersOrders
        },
        orderStatusLogs: function() {
            return this.$store.state.order.orderDetail.orderStatusLogs
        },
        order: function() {
            return this.$store.state.order.orderDetail.order
        },
        orderProduct: function() {
            return this.$store.state.order.orderDetail.orderProduct
        },
        orderPackageCategories: function() {
            return this.$store.state.order.orderDetail.orderPackageCategories
        },
        orderClusters: function() {
            return this.$store.state.order.orderDetail.orderClusters
        }
    },
    watch: {
        orderDetailDialog (val) {
            val || this.closeOrderDetailDialog()
        }
    },
    data()  {
        return {
            fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'orderType', label: 'Type', tdClass: 'text-center' },
                { key: 'orderStatus', label: 'Status ', tdClass: 'text-center' },
                { key: 'orderId', label: 'Order ID', tdClass: 'text-center' },
                { key: 'orderUserName', label: 'Orderd', tdClass: 'text-left' },
                { key: 'orderCustomerId', label: 'Customer ID', tdClass: 'text-center' },
                { key: 'companyName', label: 'Company Name', tdClass: 'text-left' },
                { key: 'productPackageName', label: 'Package Name' },
                { key: 'clusterName', label: 'Cluster', tdClass: 'text-left' },
                { key: 'productDescription', label: 'Description', tdClass: 'text-left' },
                { key: 'orderDate', label: 'Orderd Date', tdClass: 'text-center' },
                { key: 'batchTargetYn', label: 'Batch YN', tdClass: 'text-center' },
                { key: 'orderStatusLog', label: 'Stauts Log', tdClass: 'text-center'}
            ],
            orderPackageCategoryFields: [
                { key: 'categoryCode', label: 'Category Code', tdClass: 'text-center'},
                { key: 'categoryName', label: 'Category Name'},
                { key: 'isMandatory', label: 'IsMandatory', tdClass: 'text-center' },
                { key: 'meteringType', label: 'Metering Type', tdClass: 'text-center' },
                { key: 'billingCycle', label: 'Billing Cycle', tdClass: 'text-center' },
                { key: 'itemName', label: 'Item Name' },
                { key: 'itemPrice', label: 'Item Price', tdClass: 'text-right'}
            ],
            orderClusterFileds: [
                { key: 'clusterId', label: 'Cluster ID', tdClass: 'text-center' },
                { key: 'clusterName', label: 'Cluster Name', tdClass: 'text-center' },
                { key: 'clusterRegId', label: 'Created', tdClass: 'text-center' },
                { key: 'clusterRegDate', label: 'Created Date', tdClass: 'text-center'}
            ],
            id: 0,
            orderDetailDialog: false
        }
    },
    created () {
		this.initialize()
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        initialize() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
            }

            this.$store.dispatch('project/getProjectClustersOrders', {id: this.id})
        },
        getOrder(id) {
            this.$store.dispatch('order/getOrder', {id: id})
            this.orderDetailDialog = true
        },
        closeOrderDetailDialog() {
			this.orderDetailDialog = false
		},
        getOrderStatusLogs(id) {
            document.body.classList.toggle("local-aside-show")

            this.$store.dispatch('order/getOrderStatusLogs', {id: id})
        },
        closeOrderStatusLog() {
            document.body.classList.toggle("local-aside-show")
        }
    }
}
</script>
