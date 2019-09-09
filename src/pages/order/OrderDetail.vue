<template>
<div class="animated fadeIn">
  <b-row>
    <b-col>
      <b-card header="주문 정보">
        <b-form>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="주문번호" :label-cols="3">
                <b-form-input type="text" v-model="order.orderId" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="주문일시" :label-cols="3">
                <b-form-input type="text" v-model="order.orderDate" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="주문타입" :label-cols="3">
                <b-form-input type="text" :value="order.orderType | toOrderTypeText" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="주문상태" :label-cols="3">
                <b-form-input type="text" :value="order.orderStatus | toOrderStatusText" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="주문자(ID)" :label-cols="3">
                <b-form-input type="text" :value="order.orderUserName + ' (' + order.orderUserId + ')'" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="마스터(ID)" :label-cols="3">
                <b-form-input type="text" :value="order.masterUserName + ' (' + order.masterUserId + ')'" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="회사명" :label-cols="3">
                <b-form-input type="text" v-model="order.companyName" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="배치대상여부" :label-cols="3">
                <b-form-input type="text" v-model="order.batchTargetYn" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="상품명(단축)" :label-cols="3">
                <b-form-input type="text" v-model="orderProduct.productShortName" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="상품명" :label-cols="3">
                <b-form-input type="text" v-model="orderProduct.productName" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="상품패키지명" :label-cols="3">
                <b-form-input type="text" v-model="orderProduct.productPackageName" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="클라이언트ID" :label-cols="3">
                <b-form-input type="text" v-model="orderProduct.clientId" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="등록자" :label-cols="3">
                <b-form-input type="text" v-model="order.regId" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="등록일시" :label-cols="3">
                <b-form-input type="text" v-model="order.regDate" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="수정자" :label-cols="3">
                <b-form-input type="text" v-model="order.modId" readonly></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="수정일시" :label-cols="3">
                <b-form-input type="text" v-model="order.modDate" readonly></b-form-input>
              </b-form-group>
            </div>
          </div>
        </b-form>
        <b-row>
          <b-col>
            <div class="table-responsive-sm">
              <table class="table b-table table-bordered table-sm">
              <colgroup>
                <col width="100">
              </colgroup>
                <thead>
                  <tr>
                    <th class="text-center">카테고리코드</th>
                    <th class="text-center">카테고리명</th>
                    <th class="text-center">필수주문여부</th>
                    <th class="text-center">계량유형</th>
                    <th class="text-center">결제주기</th>
                    <th class="text-center">아이템명</th>
                    <th class="text-center">아이템가격</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in orderPackageCategories">
                    <td class="text-center">{{ item.categoryCode }}</td>
                    <td class="text-left">{{ item.categoryName }}</td>
                    <td class="text-center">{{ item.isMandatory == true ? 'Y' : 'N' }}</td>
                    <td class="text-center">{{ item.meteringType | toMeteringTypeText }}</td>
                    <td class="text-center">{{ item.billingCycle | toBillingCycleText }}</td>
                    <td class="text-left">{{ item.itemName }}</td>
                    <td class="text-right">{{ item.itemPrice | formatNumber | toKRW }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
  <b-row v-if="order.orderType == 'PURCHASE'">
    <b-col>
      <b-card header="주문 클러스터">
        <b-form>
          <div class="row" v-if="!orderCluster">
            <div class="col-sm-12">
              <b-form-group label="클러스터명" :label-cols="2">
                <b-form-input type="text" v-model="autocomplete.clusterName" placeholder="클러스터명을 입력하세요."></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row" v-if="autocomplete.clusterName">
            <div class="col-sm-12">
              <div class="list-group">
                <a href="#" v-for="(item, idx) in clusters.filter(c => c.clusterName.indexOf(autocomplete.clusterName) != -1)"
                  :key="idx"
                  class="list-group-item list-group-item-action"
                  @click="updateOrderClusters(item)">
                  {{ item.clusterName }}
                </a>
              </div>
            </div>
          </div>
        </b-form>
        <br />
        <b-row>
          <b-col>
            <div class="table-responsive-sm">
              <table class="table b-table table-bordered table-sm">
              <colgroup>
                <col width="200">
                <col width="200">
                <col width="150">
                <col width="150">
                <col width="60">
              </colgroup>
                <thead>
                  <tr>
                    <th class="text-center">클러스터ID</th>
                    <th class="text-center">클러스터명</th>
                    <th class="text-center">등록자</th>
                    <th class="text-center">등록일시</th>
                    <th class="text-center">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="orderCluster">
                    <td class="text-center">{{ orderCluster.clusterId }}</td>
                    <td class="text-center">{{ orderCluster.clusterName }}</td>
                    <td class="text-center">{{ orderCluster.clusterModId }}</td>
                    <td class="text-center">{{ orderCluster.clusterModDate }}</td>
                    <td class="text-center">
                      <b-link href="#" class="card-header-action" v-on:click="removeOrderClusters()">
                        <i class="fa fa-times fa-sm"></i>
                      </b-link>
                    </td>
                  </tr>
                  <tr v-if="!orderCluster">
                    <td class="text-center" colspan="5">등록된 클러스터 정보가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>

</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {

  },
  data: () => ({
    autocomplete: {
      clusterName: ''
    }
  }),
  props: [
    'id'
  ],
  computed: {
		order: function() {
			return this.$store.state.order.orderDetail.order;
		},
    orderProduct: function() {
      return this.$store.state.order.orderDetail.orderProduct;
    },
    orderPackageCategories: function() {
      return this.$store.state.order.orderDetail.orderPackageCategories;
    },
    orderCluster: function() {
      return this.$store.state.order.orderDetail.orderCluster;
    },
    clusters: function() {
      return this.$store.state.order.clusters;
    }
	},
  created () {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch('order/getOrder', {id: this.id})
      this.$store.dispatch('order/getClusters')
    },
    updateOrderClusters(cluster) {
      axios.put('/api/admin-order/orders/' + this.order.id + '/cluster/' + cluster.id).then(response => {
        this.autocomplete.clusterName = '';
        this.reload();
        this.$emit('list-reload');
  		}).catch(error => {
  			console.log(error);
  			this.$store.commit('showOkMessage', {show:true, content:'처리 중 오류가 발생하였습니다.'}, {root:true})
  		})
    },
    removeOrderClusters() {
      if(confirm('클러스터 정보를 삭제하시겠습니까?')){
        axios.delete('/api/admin-order/orders/' + this.order.id + '/cluster').then(response => {
    			if (response && response.status === 204) {
    				this.reload();
            this.$emit('list-reload');
    			} else {
    				this.$store.commit('showOkMessage', {show:true, content:'처리 중 오류가 발생하였습니다.'}, {root:true})
    			}
    		}).catch(error => {
    			console.log(error);
    			this.$store.commit('showOkMessage', {show:true, content:'처리 중 오류가 발생하였습니다.'}, {root:true})
    		})
      }
    },
    reload() {
      this.$store.dispatch('order/getOrder', {id: this.id})
    }
  }
}
</script>
