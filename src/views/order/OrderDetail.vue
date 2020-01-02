<template>
<b-modal id="order-info-modal" scrollable title="Order" size="xl" centered v-model="show" @close="cancel" @cancel="cancel">
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
        <b-form-group label="Cluster Name" label-for="md-clusterName" :label-cols="3" v-if="!orderClusters.length != 0">
            <b-form-input type="text" id="md-clusterName" v-model="autocomplete.clusterName" placeholder="클러스터명을 입력하세요."></b-form-input>
        </b-form-group>
        <b-list-group class="mb-3" v-if="autocomplete.clusterName">
            <b-list-group-item href="#" v-for="(item, idx) in clustersAll.filter(c => c.clusterName.indexOf(autocomplete.clusterName) != -1)" :key="idx" @click="updateOrderClusters(item)">
                {{ item.clusterName }}
            </b-list-group-item>
        </b-list-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped small bordered :fields="orderClusterFileds" :items="orderClusters">
                <template slot="cluster_action">
                    <b-button variant="danger" size="sm" class="mr-1" v-on:click="removeOrderClusters()"><i class="fa fa-close"></i></b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>
    </div>
    <template v-slot:modal-footer="{ ok }">
        <b-button variant="secondary" @click="cancel()"><i class="icon-close"></i> 닫기</b-button>
    </template>
</b-modal>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from 'axios'

export default {
    data() {
        return {
            show: false,
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
                { key: 'clusterRegDate', label: 'Created Date', tdClass: 'text-center'},
                { key: 'cluster_action', label: 'Actions', tdClass: 'text-center' }
            ],
            autocomplete: {
                clusterName: ''
            }
        }
    },
    props: [
        'dialogVisible'
    ],
    watch: {
        dialogVisible: function() {
            this.show = this.dialogVisible
        }
    },
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
        },
        clustersAll: function() {
            return this.$store.state.cluster.clustersAll
        }
    },
    created() {
        //
    },
    methods: {
        scrollHandle(evt) {
            // console.log(evt)
        },
        updateOrderClusters(cluster) {
            axios.put('/api/admin-order/orders/' + this.order.id + '/cluster/' + cluster.id).then(response => {
                this.autocomplete.clusterName = ''
                this.refresh()
                this.$emit('list-reload')
            }).catch(error => {
                console.log(error)
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeOrderClusters() {
            this.$zadmin.confirm('클러스터 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-order/orders/' + this.order.id + '/cluster').then(response => {
                    if (response && response.status === 204) {
                        this.refresh()
                        this.$emit('list-reload')
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    console.log(error)
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                })
            })
        },
        refresh() {
            this.$store.dispatch('order/getOrder', {id: this.order.id})
        },
        cancel() {
            this.$emit('fire-dialog-closed')
        }
    }
}
</script>
