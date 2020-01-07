<template>
    <b-tab>
        <template slot="title">
            <i class="icon-basket mr-1"></i> Orders
        </template>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped small hover bordered :fields="fields" :items="clusterOrders">
                <template slot="no" slot-scope="data">
                    {{ clusterOrders.length - data.index }}
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
                <template slot="masterUserName" slot-scope="data">
                    {{ data.item.masterUserName }} ({{ data.item.masterUserId }})
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/cluster/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
        </div>
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
        clusterOrders: function() {
            return this.$store.state.cluster.clusterOrders
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
                { key: 'masterUserName', label: 'Master', tdClass: 'text-left' },
                { key: 'orderCustomerId', label: 'Customer ID', tdClass: 'text-center' },
                { key: 'companyName', label: 'Company Name', tdClass: 'text-left' },
                { key: 'productName', label: 'Product Name' },
                { key: 'productPackageName', label: 'Package Name' },
                { key: 'clusterName', label: 'Cluster', tdClass: 'text-left' },
                { key: 'productDescription', label: 'Description', tdClass: 'text-left' },
                { key: 'orderDate', label: 'Orderd Date', tdClass: 'text-center' },
                { key: 'batchTargetYn', label: 'Batch YN', tdClass: 'text-center' }
            ],
            id: 0
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

            this.$store.dispatch('cluster/getClusterOrders', {clusterId: this.id})
        }
    }
}
</script>
