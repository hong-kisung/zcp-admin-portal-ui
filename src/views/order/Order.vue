<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Orders <b-badge class="m-1" variant="danger">4</b-badge>
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
                                        <input type="checkbox" class="custom-control-input" id="orderBuy" checked>
                                        <label class="custom-control-label" for="orderBuy">구매</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="orderCancel" checked>
                                        <label class="custom-control-label" for="orderCancel">취소</label>
                                    </div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="orderRequest">주문상태</label>
                                <div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="orderRequest" checked>
                                        <label class="custom-control-label" for="orderRequest">요청</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="orderProgress" checked>
                                        <label class="custom-control-label" for="orderProgress">처리중</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="orderComplete" checked>
                                        <label class="custom-control-label" for="orderComplete">완료</label>
                                    </div>
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="orderReject" checked>
                                        <label class="custom-control-label" for="orderReject">거절</label>
                                    </div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="batchAll">배치대상 여부</label>
                                <div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="batchAll" name="batchType" checked>
                                        <label class="custom-control-label" for="batchAll">전체</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="batchY" name="batchType">
                                        <label class="custom-control-label" for="batchY">Y</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" class="custom-control-input" id="batchN" name="batchType">
                                        <label class="custom-control-label" for="batchN">N</label>
                                    </div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="orderUser">주문자</label>
                                <b-form-input type="text" id="orderUser" placeholder="주문자 이름을 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="orderCluster">클러스터</label>
                                <b-form-input type="text" id="orderCluster" placeholder="클러스터명을 입력하세요."></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="orderNumber">주문번호</label>
                                <b-form-input type="number" id="orderNumber" placeholder="주문번호를 입력하세요."></b-form-input>
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
                <b-table striped small hover bordered :fields="fields" :items="items">
                    <template slot="order_product" slot-scope="data">
                        <b-link v-b-modal.order-info-modal>{{data.item.order_product}}</b-link><i class="fa fa-check ml-1"></i>
                    </template>
                    <template slot="state_change">
                        <b-button variant="danger" size="sm" class="mx-1">거절</b-button>
                        <b-button variant="secondary" size="sm" class="mx-1">반려</b-button>
                        <b-button variant="warning" size="sm" class="mx-1">처리중</b-button>
                        <b-button variant="primary" size="sm" class="mx-1">완료</b-button>
                    </template>
                    <template slot="batch">
                        <c-switch class="mx-1" color="success" checked label />
                    </template>
                    <template slot="history" slot-scope="data">
                        <b-button variant="outline-warning" size="sm" @click="showHistory()"><i class="icon-clock"></i> {{data.item.history}}</b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : 주문상품상세 -->
            <b-modal id="order-info-modal" scrollable title="Cloud Z CP Public - Standard" size="xl" centered>
                <div>
                    <h5 class="mb-3">주문정보</h5>
                    <b-form class="row">
                        <b-col lg="6">
                            <b-form-group label="주문번호" label-for="md-orderNumber" :label-cols="3">
                                <b-form-input type="number" id="md-orderNumber" value="25020" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="주문일시" label-for="md-orderDate" :label-cols="3">
                                <b-form-input type="text" id="md-orderDate" value="2019-09-11 02:36:25" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="주문타입" label-for="md-orderType" :label-cols="3">
                                <b-form-input type="text" id="md-orderType" value="구매" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="주문상태" label-for="md-orderState" :label-cols="3">
                                <b-form-input type="text" id="md-orderState" value="완료" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="주문자(ID)" label-for="md-orderUserId" :label-cols="3">
                                <b-form-input type="text" id="md-orderUserId" value="김찬호 (SK_CPS_DEV)" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="마스터(ID)" label-for="md-orderMasterId" :label-cols="3">
                                <b-form-input type="text" id="md-orderMasterId" value="김찬호 (SK_CPS_DEV)" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="회사명" label-for="md-companyName" :label-cols="3">
                                <b-form-input type="text" id="md-companyName" value="25020" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="배치대상여부" label-for="md-bacthType" :label-cols="3">
                                <b-form-input type="text" id="md-bacthType" value="Y" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="상품명(단축)" label-for="md-productNameShort" :label-cols="3">
                                <b-form-input type="text" id="md-productNameShort" value="Container" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="상품명" label-for="md-productName" :label-cols="3">
                                <b-form-input type="text" id="md-productName" value="Cloud Z CP (Container Platform)" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="상품패키지명" label-for="md-productPackageName" :label-cols="3">
                                <b-form-input type="text" id="md-productPackageName" value="Cloud Z CP Public - Standard" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="클라이언트ID" label-for="md-client" :label-cols="3">
                                <b-form-input type="text" id="md-client" value="cloudz_cp" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="구매주문번호" label-for="md-orderBuyNumber" :label-cols="3">
                                <b-form-input type="number" id="md-orderBuyNumber" value="25020" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="설명" label-for="md-description" :label-cols="3">
                                <b-form-input type="text" id="md-description" value="" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="등록자" label-for="md-registrant" :label-cols="3">
                                <b-form-input type="text" id="md-registrant" value="SK_CPS_DEV" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="등록일시" label-for="md-registDate" :label-cols="3">
                                <b-form-input type="text" id="md-registDate" value="2019-09-11 02:36:25" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="수정자" label-for="md-modifier" :label-cols="3">
                                <b-form-input type="text" id="md-modifier" value="cloudzcp-admin" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group label="수정일시" label-for="md-modifyDate" :label-cols="3">
                                <b-form-input type="text" id="md-modifyDate" value="2019-09-11 02:36:25" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form>
                    <VuePerfectScrollbar class="scroll-area mt-3" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <b-table striped small bordered :fields="category_fields" :items="category_items">
                        </b-table>
                    </VuePerfectScrollbar>
                </div>
                <hr>
                <div>
                    <h5 class="mb-3">주문 클러스터</h5>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <b-table striped small bordered :fields="cluster_fields" :items="cluster_items">
                            <template slot="cluster_action">
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </template>
                        </b-table>
                    </VuePerfectScrollbar>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="ok()"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : 주문상품상세 -->
        </b-card>
        
        <!-- local-aside : history -->
        <aside class="local-aside-menu">
            <b-tabs>
                <b-tab>
                    <template slot="title">
                        <b-link href="#" @click="showHistory()"><i class="fa fa-close"></i></b-link>
                    </template>
                    <b-list-group class="list-group-accent">
                        <b-list-group-item class="list-group-item-accent-primary bg-light text-center font-weight-bold text-muted text-uppercase">
                            <i class="fa fa-history"></i> 변경이력
                        </b-list-group-item>
                        <b-list-group-item class="list-group-item-accent-danger">
                            <div>완료</div>
                            <div>
                                <small class="text-muted">
                                    <i class="icon-user"></i>&nbsp;&nbsp;SK_CPS_DEV
                                </small>
                            </div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-23 14:25:23
                            </small>
                        </b-list-group-item>
                        <b-list-group-item class="list-group-item-accent-secondary">
                            <div>처리중</div>
                            <div>
                                <small class="text-muted">
                                    <i class="icon-user"></i>&nbsp;&nbsp;SK_CPS_DEV
                                </small>
                            </div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-22 14:25:23
                            </small>
                        </b-list-group-item>
                        <b-list-group-item class="list-group-item-accent-secondary list-group-item-divider">
                            <div>요청</div>
                            <div>
                                <small class="text-muted">
                                    <i class="icon-user"></i>&nbsp;&nbsp;SK_CPS_DEV
                                </small>
                            </div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-21 14:25:23
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
import { Switch as cSwitch } from '@coreui/vue'

export default {
    data()  {
        return {
            fields: [
                { key: 'order_type', label: '주문타입', tdClass: 'text-center' },
                { key: 'order_state', label: '주문상태', tdClass: 'text-center' },
                { key: 'order_number', label: '주문번호', tdClass: 'text-center' },
                { key: 'user', label: '주문자', tdClass: 'text-center' },
                { key: 'company_name', label: '기업명', tdClass: 'text-center' },
                { key: 'order_product', label: '주문상품' },
                { key: 'cluster', label: '클러스터', tdClass: 'text-center' },
                { key: 'date', label: '주문일시', tdClass: 'text-center' },
                { key: 'state_change', label: '상태변경', tdClass: 'text-center' },
                { key: 'batch', label: '배치대상여부', tdClass: 'text-center' },
                { key: 'history', label: '변경이력', tdClass: 'text-center' }
            ],
            items: [
                { order_type: '구매', order_state: '완료', order_number: '25053', user: '강길수 (SK_CPS_DEV)', company_name: '원가관리_고진원', order_product: 'Cloud Z CP Public - Standard', cluster: 'cloudzcp-pog-dev', date: '2019-09-10 10:21:03', state_change: '', batch: '', history: '이력보기' },
                { order_type: '구매', order_state: '완료', order_number: '25053', user: '강길수 (SK_CPS_DEV)', company_name: '원가관리_고진원', order_product: 'Cloud Z CP Public - Standard', cluster: 'cloudzcp-pog-dev', date: '2019-09-10 10:21:03', state_change: '', batch: '', history: '이력보기' },
                { order_type: '구매', order_state: '완료', order_number: '25053', user: '강길수 (SK_CPS_DEV)', company_name: '원가관리_고진원', order_product: 'Cloud Z CP Public - Standard', cluster: 'cloudzcp-pog-dev', date: '2019-09-10 10:21:03', state_change: '', batch: '', history: '이력보기' },
                { order_type: '구매', order_state: '완료', order_number: '25053', user: '강길수 (SK_CPS_DEV)', company_name: '원가관리_고진원', order_product: 'Cloud Z CP Public - Standard', cluster: 'cloudzcp-pog-dev', date: '2019-09-10 10:21:03', state_change: '', batch: '', history: '이력보기' }
            ],
            category_fields: [
                { key: 'code', label: '카테고리코드', tdClass: 'text-center' },
                { key: 'name', label: '카테고리명' },
                { key: 'required', label: '필수주문여부', tdClass: 'text-center' },
                { key: 'weight_type', label: '계량유형', tdClass: 'text-center' },
                { key: 'payment_cycle', label: '결제주기', tdClass: 'text-center' },
                { key: 'item_name', label: '아이템명' },
                { key: 'item_cost', label: '아이템가격', tdClass: 'text-right' }
            ],
            category_items: [
                { code: 'PC000809', name: 'Source Repository', required: 'Y', weight_type: '월', payment_cycle: '월 과금', item_name: 'Source Repository 20GB', item_cost: '₩ 2,600,000' },
                { code: 'PC000802', name: 'Logging', required: 'Y', weight_type: '월', payment_cycle: '월 과금', item_name: 'Logging Lite - 200GB', item_cost: '₩ 288,000' },
                { code: 'PC000815', name: 'Proxy Service', required: 'N', weight_type: '월', payment_cycle: '월 과금', item_name: 'Proxy Service - Lite', item_cost: '₩ 183,000' }
            ],
            cluster_fields: [
                { key: 'cluster_id', label: '클러스터ID', tdClass: 'text-center' },
                { key: 'cluster_name', label: '클러스터명', tdClass: 'text-center' },
                { key: 'cluster_regist', label: '등록자', tdClass: 'text-center' },
                { key: 'cluster_date', label: '등록일시', tdClass: 'text-center' },
                { key: 'cluster_action', label: 'Actions', tdClass: 'text-center' }
            ],
            cluster_items: [
                { cluster_id: 'e008b31596ec49b1aa9e3f4b796e7719', cluster_name: 'zcp-cbt', cluster_regist: 'cloudzcp-admin', cluster_date: '2019-09-15 19:59:52', cluster_action: '' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30, 50, 100]
        }
    },
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
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        showHistory () {
            document.body.classList.toggle("local-aside-show")
        }
    }
}
</script>