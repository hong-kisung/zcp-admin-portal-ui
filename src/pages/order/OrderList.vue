<template>
<div class="animated fadeIn">
  <b-row>
    <b-col>
    <div class="card">
      <div class="card-header">
        <div><i class="fa fa-align-justify"></i> Orders
        <span class="badge badge-primary badge-pill">{{ ordersPage.totalCount }}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-11">
            <!-- Using modifiers -->
            <div class="col-sm-4 col-md-3 col-lg-2 col-6" v-b-toggle.collapse-1>
              <i class="fa fa-search fa-lg mt-4"></i>
            </div>
            <br>
          </div>
          <div class="col-sm-1">
            <fieldset role="group" class="b-form-group form-group">
              <div role="group" class="">
                <label for="month1"></label>
                <select class="form-control" v-model="page.pageSize" @change="getOrders(1)">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </fieldset>
          </div>
        </div>
        <div>
          <b-collapse id="collapse-1">
            <b-card>
              <b-form>
                <div class="row">
                  <div class="col-sm-4">
                    <b-form-group label="주문 타입">
                      <b-form-checkbox-group id="orderType" v-model="search.orderType">
                        <b-form-checkbox value="PURCHASE">구매</b-form-checkbox>
                        <b-form-checkbox value="DISPOSAL">취소</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4">
                    <b-form-group label="주문 상태">
                      <b-form-checkbox-group id="orderType" v-model="search.orderStatus">
                        <b-form-checkbox value="REQUESTED">요청</b-form-checkbox>
                        <b-form-checkbox value="PROCEEDING">처리중</b-form-checkbox>
                        <b-form-checkbox value="DONE">완료</b-form-checkbox>
                        <b-form-checkbox value="DENIED">거절</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4">
                    <b-form-group label="배치대상 여부">
                      <div class="col-sm-9">
                        <div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="ALL" id="enable1" class="custom-control-input" v-model="search.batchTargetYn">
                            <label for="enable1" class="custom-control-label">전체</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="Y" id="enable2" class="custom-control-input" v-model="search.batchTargetYn">
                            <label for="enable2" class="custom-control-label">Y</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="N" id="enable3" class="custom-control-input" v-model="search.batchTargetYn">
                            <label for="enable3" class="custom-control-label">N</label></div>
                        </div>
                      </div>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <b-form-group id="input-group-2" label="주문자" label-for="input-2">
                      <b-form-input id="orderUserName" placeholder="이름을 입력하세요." v-model="search.orderUserName"></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-sm-4">
                    <b-form-group id="input-group-2" label="클러스터" label-for="input-2">
                      <b-form-input id="orderUserName" placeholder="클러스터명을 입력하세요." v-model="search.clusterName"></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-11"></div>
                  <div class="col-sm-1">
                    <b-button variant="primary" @click="getOrders(1)">Search</b-button>
                  </div>
                </div>
              </b-form>
            </b-card>
          </b-collapse>
        </div>
        <div class="table-responsive-sm">
          <table class="table b-table table-striped">
            <colgroup>
              <col width="80">
              <col width="80">
              <col width="100">
              <col width="120">
              <col width="140">
              <col>
              <col width="150">
              <col width="100">
              <col width="90">
              <col width="110">
              <col width="80">
            </colgroup>
            <thead class="">
              <tr>
                <th class="text-center">주문타입</th>
                <th class="text-center">주문상태</th>
                <th class="text-center">주문번호</th>
                <th class="text-center">주문자</th>
                <th class="text-center">기업명</th>
                <th class="text-center">주문상품</th>
                <th class="text-center">클러스터</th>
                <th class="text-center">주문일시</th>
                <th class="text-center">상태변경</th>
                <th class="text-center">배치대상여부</th>
                <th class="text-center">변경이력</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in orders">
                <td class="text-center">
                  {{ item.orderType | toOrderTypeText }}
                </td>
                <td class="text-center">
                  {{ item.orderStatus | toOrderStatusText }}
                </td>
                <td class="text-center">
                  {{ item.orderId }}
                </td>
                <td class="text-center">{{ item.orderUserName }} ({{ item.orderUserId }})</td>
                <td class="text-center">{{ item.companyName }}</td>
                <td class="text-left">
                  <b-link @click="openDetailDialog(item)">
                    {{ item.productPackageName }}
                  </b-link>
                  <b-link href="#" class="card-header-action" v-if="item.clusterName">
                    <i class="fa fa-check fa-sm"></i>
                  </b-link>
                </td>
                <td class="text-center">{{ item.clusterName }}</td>
                <td class="text-center">{{ item.orderDate }}</td>
                <td class="text-center">
                  <div v-if="item.orderStatus !== 'DENIED' && item.orderStatus !== 'DONE'">
                    <b-dropdown text="" >
                      <b-dropdown-item href="#" @click="updateOrderStatus(item, 'DENIED')">반려</b-dropdown-item>
                      <b-dropdown-item href="#" @click="updateOrderStatus(item, 'APPLOVAL')">{{ item.orderStatus | toAppovalText }}</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </td>
                <td class="text-center">
                  <label class="mx-1 switch switch-pill switch-primary form-check-label">
                    <input id="switch-id-3617" type="checkbox" class="switch-input form-check-input" v-model="item.batchTargetYn == 'Y' ? true : false" @click="updateOrderBatchTarget(item.id, item.batchTargetYn)">
                    <span class="switch-slider"></span>
                  </label>
                </td>
                <td class="text-center">
                  <b-link href="#" class="card-header-action" @click="openStatusLogsDialog(item)">
                    <i class="fa fa-history fa-lg"></i>
                  </b-link>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td class="text-center" colspan="11">주문 목록이 없습니다.</td>
              </tr>
            </tbody>
          </table>

          <!-- paging -->
          <div v-if="ordersPage.totalCount > 0">
            <ul class="pagination b-pagination pagination-md justify-content-center">
              <li class="page-item" v-if="ordersPage.pageNo !== ordersPage.prevPageNo">
                <a href="#" target="_self" class="page-link" @click="getOrders(ordersPage.prevPageNo)">
                  <span aria-hidden="true">‹</span>
                </a>
              </li>

              <li class="page-item" v-for="no in ordersPage.endPageNo" v-if="no >= ordersPage.startPageNo" :class="{active : no == ordersPage.pageNo}">
                <a href="#" target="_self" class="page-link" @click="getOrders(no)">{{ no }}</a>
              </li>

              <li class="page-item" v-if="ordersPage.pageNo !== ordersPage.finalPageNo">
                <a href="#" target="_self" class="page-link" @click="getOrders(ordersPage.nextPageNo)">
                  <span aria-hidden="true">›</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    </b-col>
  </b-row>

  <!-- order detail -->
  <b-modal size="xl" centered ok-only ok-title="Close" ok-variant="danger" :title="orderTitle" v-model="dialog.detail" scrollable>
    <order-detail
      v-bind:id="id"
      v-on:list-reload="reload"
    />
  </b-modal>

  <!-- order status log -->
  <b-modal centered ok-only ok-title="Close" ok-variant="danger" :title="orderTitle" v-model="dialog.statusLogs">
    <order-status-log
      v-bind:id="id"
    />
  </b-modal>

</div>
</template>

<script>
import axios from 'axios'

import orderDetail from './OrderDetail'
import orderStatusLog from './OrderStatusLog'

export default {
  components: {
    orderDetail,
    orderStatusLog
  },
  data: () => ({
    dialog: {
      detail: false,
      statusLogs: false
    },
    id: 0,
    orderTitle: '',
    search: {
      orderType: ['PURCHASE','DISPOSAL'],
      orderStatus: ['REQUESTED','PROCEEDING','DONE','DENIED'],
      orderUserName: '',
      clusterName: '',
      batchTargetYn: 'ALL'
    },
    page: {
      pageNo: 1,
      pageSize: 10
    }
  }),
  computed: {
		orders: function() {
			return this.$store.state.order.orders;
		},
    ordersPage: function() {
      return this.$store.state.order.ordersPage;
    }
	},
	created () {
    this.reload();
	},
  filters: {
    toAppovalText: function(orderStatus) {
      let val;
      if (orderStatus === 'REQUESTED') {
        val = '처리중';
      } else {
        val = '완료';
      }

      return val;
    }
  },
  watch: {
		dialog (val) {
			val || this.closeDialog();
		}
  },
  methods: {
    openDetailDialog(item) {
      this.orderTitle = item.productPackageName ;
      this.id = item.id;
      this.dialog.detail = true;
		},
    closeDialog() {
      this.dialog.detail = false;
		},
    openStatusLogsDialog(item) {
      this.orderTitle = '주문상태 변경이력';
      this.id = item.id;
      this.dialog.statusLogs = true;
    },
    updateOrderStatus(item, orderStatus) {
      let confirmMsg;
      if (orderStatus === 'DENIED') {
        confirmMsg = '주문을 반려 하시겠습니까?';
      } else {
        if (item.orderStatus === 'REQUESTED') {
          confirmMsg = '주문 상태를 처리중으로 변경 하시겠습니까?';
          orderStatus = 'PROCEEDING';
        } else {
          confirmMsg = '주문 상태를 완료로 변경 하시겠습니까?';
          orderStatus = 'DONE';
        }
      }

      if (confirm(confirmMsg)){
        axios.put('/api/admin-order/orders/' + item.id + '/status/' + orderStatus).then(response => {
    			this.$store.commit('showOkMessage', {content: '주문 상태가 변경되었습니다.'}, {root:true})

          let order = this.$store.state.order.orders.find(o => o.id == item.id) || {};
          order.orderStatus = orderStatus;
        }).catch(error => {
          let response = error.response;
          if (response.data) {
            let errorMsg = response.data.message + ' [' + response.data.code + ']'

            this.$store.commit('showOkMessage', {show:true, content: errorMsg}, {root:true})
          } else {
            this.$store.commit('showOkMessage', {show:true, content:'처리 중 오류가 발생하였습니다.'}, {root:true})
          }
    		})
      }
    },
    updateOrderBatchTarget(id, batchTargetYn) {
      let yn = (batchTargetYn == 'Y') ? 'N' : 'Y';
      axios.put('/api/admin-order/orders/' + id + '/batch-target/' + yn).then(response => {
  		  let order = this.$store.state.order.orders.find(o => o.id == id) || {};
        order.batchTargetYn = yn;
      }).catch(error => {
  			console.log(error);
  			this.$store.commit('showOkMessage', {show:true, content:'처리 중 오류가 발생하였습니다.'}, {root:true})
  		})
    },
    getOrders(pageNo) {
      let listPars = this.getOrdersPars();
      listPars.page.pageNo = pageNo;

      this.$store.dispatch('order/getOrders', listPars)
    },
    getOrdersPars() {
      let search = this.search;
      let page = this.page;
      page.pageNo = this.ordersPage.pageNo == undefined ? 1 : this.ordersPage.pageNo;

      let listPars = {
        search: search,
        page: page
      }

      return listPars;
    },
    reload() {
      let pars = this.getOrdersPars();
      this.$store.dispatch('order/getOrders', pars)
    }
  }
}
</script>

<style>
</style>
