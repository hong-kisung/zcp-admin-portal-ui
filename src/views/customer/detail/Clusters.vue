<template>
    <b-tab v-bind="{ active: isActive }">
        <template slot="title">
            <i class="icon-layers mr-1"></i> Clusters
        </template>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="clusters_fields" :items="customerClusters">
                <template slot="no" slot-scope="data">
                    {{ customerClusters.length - data.index }}
                </template>
                <template slot="clusterName" slot-scope="data">
                    <router-link :to="{ name: 'ClusterDetail', params: { id: data.item.id, name: data.item.clusterName }}">
                        {{data.item.clusterName}}
                    </router-link>
                </template>
                <template slot="activation" slot-scope="data">
                    {{data.item.activation == true ? 'Activation' : 'Inactivation' }}
                </template>
                <template slot="clusterStatus" slot-scope="data">
                    <b-badge pill :variant="variant(data.item.clusterStatus)">{{data.item.clusterStatus}}</b-badge>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/customer/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
        </div>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
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
        customerClusters: function() {
            return this.$store.state.customer.customerClusters
        }
    },
    data()  {
        return {
            clusters_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'clusterId', label: 'Cluster ID', tdClass: 'text-left' },
                { key: 'clusterName', label: 'Cluster Name' },
                { key: 'clusterStatus', label: 'Status', tdClass: 'text-center' },
                { key: 'clusterEnviromentType', label: 'Cluster Env', tdClass: 'text-center' },
                { key: 'nwArchTypeName', label: 'n/w arch', tdClass: 'text-left' },
                { key: 'sreIntegrationYn', label: 'SRE Intergration', tdClass: 'text-center' },
                { key: 'multiTenantYn', label: 'Multi Tenant', tdClass: 'text-center' },
                { key: 'mngK8sVersion', label: 'k8s version', tdClass: 'text-right' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created date', tdClass: 'text-center' }
            ],
            isActive: false
        }
    },
    filters: {
        toDevPeriod(val) {
            if (val) {
                return val
            } else {
                return ''
            }
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
            if (this.$route.params.active) {
                this.isActive = this.$route.params.active === 'Clusters' ? true : false
            }

            this.$store.dispatch('customer/getCustomerClusters', {id: this.id})
        },
        variant (status) {
            let val

            if (status == 'Running') {
                val = 'success'
            } else if(status == 'Deleted') {
                val = 'secondary'
            }

            return val
        }
    }
}
</script>
