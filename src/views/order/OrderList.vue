<template>
<div class="animated fadeIn">
    <h1 class="display-tit mb-3">
        Orders <b-badge class="m-1" variant="danger">{{ ordersPage.totalCount }}</b-badge>
        <b-button v-b-toggle.collapse1 variant="secondary" class="float-right"><i class="fa fa-filter"></i> 검색상세</b-button>
    </h1>
    <div>
        <b-collapse id="collapse1">
            <b-card>
                <b-form class="row">
                    <b-col lg="4">
                        <b-form-group>
                            <label for="orderBuy">주문타입</label>
                            <div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="purchase" value="PURCHASE" v-model="search.orderType">
                                    <label class="custom-control-label" for="purchase">구매</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="disposal" value="DISPOSAL" v-model="search.orderType">
                                    <label class="custom-control-label" for="disposal">취소</label>
                                </div>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group>
                            <label for="orderRequest">주문상태</label>
                            <div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="requested" value="REQUESTED" v-model="search.orderStatus">
                                    <label class="custom-control-label" for="requested">요청</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="proceeding" value="PROCEEDING" v-model="search.orderStatus">
                                    <label class="custom-control-label" for="proceeding">처리중</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="done" value="DONE" v-model="search.orderStatus">
                                    <label class="custom-control-label" for="done">완료</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="denied" value="DENIED" v-model="search.orderStatus">
                                    <label class="custom-control-label" for="denied">거절</label>
                                </div>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group>
                            <label for="batchAll">배치대상 여부</label>
                            <div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="batchAll" value="ALL" v-model="search.batchTargetYn">
                                    <label class="custom-control-label" for="batchAll">전체</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="batchY" value="Y" v-model="search.batchTargetYn">
                                    <label class="custom-control-label" for="batchY">Y</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="batchN" value="N" v-model="search.batchTargetYn">
                                    <label class="custom-control-label" for="batchN">N</label>
                                </div>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group>
                            <label for="orderUser">주문자</label>
                            <b-form-input type="text" id="orderUserName" placeholder="주문자 이름을 입력하세요." v-model="search.orderUserName"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group>
                            <label for="orderCluster">클러스터</label>
                            <b-form-input type="text" id="clusterName" placeholder="클러스터명을 입력하세요." v-model="search.clusterName"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group>
                            <label for="orderNumber">주문번호</label>
                            <b-form-input type="number" id="orderId" placeholder="주문번호를 입력하세요." v-model="search.orderId"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12">
                        <b-button variant="primary" block @click="getOrdersByPage(1)"><i class="fa fa-search"></i> 검색</b-button>
                    </b-col>
                </b-form>
            </b-card>
        </b-collapse>
    </div>
    <b-card>
        <div class="mb-3">
            <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                <b-form-select v-model="ordersPage.pageSize" id="perPageSelect" :options="pageOptions" @change="getOrdersByPage(1)" class="w-auto"></b-form-select>
            </b-form-group>
            <b-pagination v-model="ordersPage.pageNo" :total-rows="ordersPage.totalCount" :per-page="ordersPage.pageSize" @input="getOrdersByPage(ordersPage.pageNo)" align="right" class="my-0">
            </b-pagination>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped small hover bordered :fields="fields" :items="orders">
                <template slot="no" slot-scope="data">
                    {{ (ordersPage.totalCount - ((ordersPage.pageNo - 1) * ordersPage.pageSize)) - data.index }}
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
                <template slot="orderStatusChange" slot-scope="data">
                    <div v-if="data.item.orderStatus !== 'DENIED' && data.item.orderStatus !== 'DONE'">
                        <b-button variant="danger" size="sm" class="mx-1" v-if="data.item.orderStatus == 'REQUESTED' || data.item.orderStatus == 'PROCEEDING'" @click="updateOrderStatus(data.item, 'DENIED')">반려</b-button>
                        <b-button variant="warning" size="sm" class="mx-1" v-if="data.item.orderStatus == 'REQUESTED'" @click="updateOrderStatus(data.item, 'PROCEEDING')">처리중</b-button>
                        <b-button variant="primary" size="sm" class="mx-1" v-if="data.item.orderStatus == 'PROCEEDING'" @click="updateOrderStatus(data.item, 'DONE')">완료</b-button>
                    </div>
                </template>
                <template slot="batchTargetYn" slot-scope="data">
                    <label class="mx-1 mb-0 switch switch-label switch-success">
                        <input class="switch-input" type="checkbox" checked="" v-model="data.item.batchTargetYn == 'Y' ? true : false" @click="updateOrderBatchTarget(data.item.id, data.item.batchTargetYn)">
                        <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                    </label>
                </template>
                <template slot="orderStatusLog" slot-scope="data">
                    <b-button variant="outline-warning" size="sm" @click="getOrderStatusLogs(data.item.id)"><i class="icon-clock"></i>이력보기</b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <!-- order detail modal -->
        <order-detail v-bind:dialogVisible="orderDetailDialog" v-on:fire-dialog-closed="orderDetailDialog = false" v-on:list-reload="getOrders" />
    </b-card>

    <!-- local-aside : history -->
    <aside class="local-aside-menu">
        <b-tabs>
            <b-tab>
                <template slot="title">
                    <b-link href="#" @click="closeOrderStatusLog();"><i class="fa fa-close"></i></b-link>
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
    <!-- // local-aside : history -->
</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
    Switch as cSwitch
} from '@coreui/vue'
import axios from 'axios'
import orderDetail from './OrderDetail'

export default {
    data() {
        return {
            fields: [
                {
                    key: 'no',
                    label: 'No',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderType',
                    label: '주문타입',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderStatus',
                    label: '주문상태',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderId',
                    label: '주문번호',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderUserName',
                    label: '주문자',
                    tdClass: 'text-center'
                },
                {
                    key: 'companyName',
                    label: '기업명',
                    tdClass: 'text-center'
                },
                {
                    key: 'productPackageName',
                    label: '주문상품'
                },
                {
                    key: 'clusterName',
                    label: '클러스터',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderDate',
                    label: '주문일시',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderStatusChange',
                    label: '상태변경',
                    tdClass: 'text-center'
                },
                {
                    key: 'batchTargetYn',
                    label: '배치대상여부',
                    tdClass: 'text-center'
                },
                {
                    key: 'orderStatusLog',
                    label: '변경이력',
                    tdClass: 'text-center'
                }
            ],
            pageOptions: [10, 20, 30, 50, 100],
            search: {
                orderType: ['PURCHASE', 'DISPOSAL'],
                orderStatus: ['REQUESTED', 'PROCEEDING', 'DONE', 'DENIED'],
                batchTargetYn: 'ALL',
                orderUserName: '',
                clusterName: '',
                orderId: ''
            },
            orderDetailDialog: false,
        }
    },
    components: {
        VuePerfectScrollbar,
        cSwitch,
        orderDetail
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
        orders: function() {
            return this.$store.state.order.orders;
        },
        ordersPage: function() {
            return this.$store.state.order.ordersPage;
        },
        orderStatusLogs: function() {
            return this.$store.state.order.orderDetail.orderStatusLogs;
        }
    },
    created() {
        this.getOrders();
    },
    methods: {
        scrollHandle(evt) {
            // console.log(evt)
        },
        getOrders() {
            const ordersParams = {
                search: this.search,
                page: this.ordersPage
            }
            this.$store.dispatch('order/getOrders', ordersParams)
        },
        getOrdersByPage(pageNo) {
            this.$store.commit('order/setOrdersPageNo', pageNo)

            this.getOrders();
        },
        getOrder(id) {
            this.orderDetailDialog = true;

            this.$store.dispatch('cluster/getClustersAll');
            this.$store.dispatch('order/getOrder', {id: id})
        },
        updateOrderStatus(item, orderStatus) {
            let confirmMsg;
            if (orderStatus === 'DENIED') {
                confirmMsg = '주문을 반려 하시겠습니까?';
            } else if (orderStatus === 'PROCEEDING') {
                confirmMsg = '주문 상태를 처리중으로 변경 하시겠습니까?';
            } else if (orderStatus === 'DONE') {
                confirmMsg = '주문 상태를 완료로 변경 하시겠습니까?';
            }

            this.$zadmin.confirm(confirmMsg, (result) => {
                if (!result) return false;

                axios.put('/api/admin-order/orders/' + item.id + '/status/' + orderStatus).then(response => {
                    this.$zadmin.alert('주문 상태가 변경되었습니다.')

                    let order = this.$store.state.order.orders.find(o => o.id == item.id) || {};
                    order.orderStatus = orderStatus;
                }).catch(error => {
                    let response = error.response;
                    if (response.data) {
                        let errorMsg = response.data.message + ' [' + response.data.code + ']';

                        this.$zadmin.alert(errorMsg)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            });
        },
        updateOrderBatchTarget(id, batchTargetYn) {
            let yn = (batchTargetYn == 'Y') ? 'N' : 'Y';
            axios.put('/api/admin-order/orders/' + id + '/batch-target/' + yn).then(response => {
                let order = this.$store.state.order.orders.find(o => o.id == id) || {};
                order.batchTargetYn = yn;
            }).catch(error => {
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        getOrderStatusLogs(id) {
            document.body.classList.toggle("local-aside-show");

            this.$store.dispatch('order/getOrderStatusLogs', {
                id: id
            });
        },
        closeOrderStatusLog() {
            document.body.classList.toggle("local-aside-show");
        }
    }
}
</script>
