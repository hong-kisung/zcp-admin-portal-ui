<template>
<b-modal id="order-info-modal" scrollable title="주문 상세 정보" size="xl" centered v-model="show" @close="cancel" @cancel="cancel">
    <div>
        <h5 class="mb-3">주문정보</h5>
        <b-form class="row">
            <b-col lg="6">
                <b-form-group label="주문번호" label-for="md-orderNumber" :label-cols="3">
                    <b-form-input type="number" id="md-orderNumber" :value="order.orderId" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="주문일시" label-for="md-orderDate" :label-cols="3">
                    <b-form-input type="text" id="md-orderDate" :value="order.orderDate" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="주문타입" label-for="md-orderType" :label-cols="3">
                    <b-form-input type="text" id="md-orderType" :value="order.orderType | toOrderTypeText" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="주문상태" label-for="md-orderState" :label-cols="3">
                    <b-form-input type="text" id="md-orderState" :value="order.orderStatus | toOrderStatusText" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="주문자(ID)" label-for="md-orderUserId" :label-cols="3">
                    <b-form-input type="text" id="md-orderUserId" :value="order.orderUserName + ' (' + order.orderUserId + ')'" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="마스터(ID)" label-for="md-orderMasterId" :label-cols="3">
                    <b-form-input type="text" id="md-orderMasterId" :value="order.masterUserName + ' (' + order.masterUserId + ')'" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="회사명" label-for="md-companyName" :label-cols="3">
                    <b-form-input type="text" id="md-companyName" :value="order.companyName" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="배치대상여부" label-for="md-bacthType" :label-cols="3">
                    <b-form-input type="text" id="md-bacthType" :value="order.batchTargetYn" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="상품명(단축)" label-for="md-productNameShort" :label-cols="3">
                    <b-form-input type="text" id="md-productNameShort" :value="orderProduct.productShortName" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="상품명" label-for="md-productName" :label-cols="3">
                    <b-form-input type="text" id="md-productName" :value="orderProduct.productName" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="상품패키지명" label-for="md-productPackageName" :label-cols="3">
                    <b-form-input type="text" id="md-productPackageName" :value="orderProduct.productPackageName" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="클라이언트ID" label-for="md-client" :label-cols="3">
                    <b-form-input type="text" id="md-client" :value="orderProduct.clientId" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="구매주문번호" label-for="md-orderBuyNumber" :label-cols="3">
                    <b-form-input type="number" id="md-orderBuyNumber" :value="orderProduct.purchasedOrderId" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="설명" label-for="md-description" :label-cols="3">
                    <b-form-input type="text" id="md-description" :value="orderProduct.productDescription" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="등록자" label-for="md-registrant" :label-cols="3">
                    <b-form-input type="text" id="md-registrant" :value="order.regId" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6">
                <b-form-group label="등록일시" label-for="md-registDate" :label-cols="3">
                    <b-form-input type="text" id="md-registDate" :value="order.regDate" readonly></b-form-input>
                </b-form-group>
            </b-col>
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
        <h5 class="mb-3">주문 클러스터</h5>
        <b-form-group label="클러스터명" label-for="md-clusterName" :label-cols="3" v-if="!orderClusters.length != 0">
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
            orderPackageCategoryFields: [{
                    key: 'categoryCode',
                    label: '카테고리코드',
                    tdClass: 'text-center'
                },
                {
                    key: 'categoryName',
                    label: '카테고리명'
                },
                {
                    key: 'isMandatory',
                    label: '필수주문여부',
                    tdClass: 'text-center'
                },
                {
                    key: 'meteringType',
                    label: '계량유형',
                    tdClass: 'text-center'
                },
                {
                    key: 'billingCycle',
                    label: '결제주기',
                    tdClass: 'text-center'
                },
                {
                    key: 'itemName',
                    label: '아이템명'
                },
                {
                    key: 'itemPrice',
                    label: '아이템가격',
                    tdClass: 'text-right'
                }
            ],
            orderClusterFileds: [{
                    key: 'clusterId',
                    label: '클러스터ID',
                    tdClass: 'text-center'
                },
                {
                    key: 'clusterName',
                    label: '클러스터명',
                    tdClass: 'text-center'
                },
                {
                    key: 'clusterModId',
                    label: '등록자',
                    tdClass: 'text-center'
                },
                {
                    key: 'clusterModDate',
                    label: '등록일시',
                    tdClass: 'text-center'
                },
                {
                    key: 'cluster_action',
                    label: 'Actions',
                    tdClass: 'text-center'
                }
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
            return this.$store.state.order.orderDetail.order;
        },
        orderProduct: function() {
            return this.$store.state.order.orderDetail.orderProduct;
        },
        orderPackageCategories: function() {
            return this.$store.state.order.orderDetail.orderPackageCategories;
        },
        orderClusters: function() {
            return this.$store.state.order.orderDetail.orderClusters;
        },
        clustersAll: function() {
            return this.$store.state.cluster.clustersAll;
        }
    },
    created() {

    },
    methods: {
        scrollHandle(evt) {
            // console.log(evt)
        },
        updateOrderClusters(cluster) {
            axios.put('/api/admin-order/orders/' + this.order.id + '/cluster/' + cluster.id).then(response => {
                this.autocomplete.clusterName = '';
                this.refresh();
                this.$emit('list-reload');
            }).catch(error => {
                console.log(error);
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeOrderClusters() {
            this.$zadmin.confirm('클러스터 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false;

                axios.delete('/api/admin-order/orders/' + this.order.id + '/cluster').then(response => {
                    if (response && response.status === 204) {
                        this.refresh();
                        this.$emit('list-reload');
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    console.log(error);
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                })

            });
        },
        refresh() {
            this.$store.dispatch('order/getOrder', {id: this.order.id})
        },
        cancel() {
            this.$emit('fire-dialog-closed');
        }
    }
}
</script>
