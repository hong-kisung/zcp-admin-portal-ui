<template>
<div>
  <b-card >
    <b-row>
      <b-col>
        <div class="table-responsive-sm">
          <table class="table b-table table-striped table-hover table-bordered table-sm">
          <colgroup>
            <col width="100">
          </colgroup>
            <thead>
              <tr>
                <th class="text-center">주문상태</th>
                <th class="text-center">등록자</th>
                <th class="text-center">등록일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in orderStatusLogs">
                <td class="text-center">{{ item.orderStatus | toOrderStatusText }}</td>
                <td class="text-center">{{ item.regId }}</td>
                <td class="text-center">{{ item.regDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>

export default {
  components: {

  },
  props: [
    'id'
  ],
  data: () => ({

  }),
  computed: {
		orderStatusLogs: function() {
      return this.$store.state.order.orderDetail.orderStatusLogs;
    }
	},
	created () {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch('order/getOrder', {id: this.id})
    }
  }
}
</script>
