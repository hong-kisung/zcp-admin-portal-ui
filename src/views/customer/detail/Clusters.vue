<template>
    <b-tab>
        <template slot="title">
            <i class="icon-layers mr-1"></i> Clusters
        </template>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="clusters_fields" :items="customerProjectsClusters">
                <template slot="no" slot-scope="data">
                    {{ customerProjectsClusters.length - data.index }}
                </template>
                <template slot="projectName" slot-scope="data">
                    <router-link :to="{ name: 'ProjectDetail', params: { id: data.item.projectId, name: data.item.projectName, active: 'BasicInfomation' }}">
                        {{data.item.projectName}}
                    </router-link>
                </template>
                <template slot="customerCloudAccountCspCode" slot-scope="data">
                    <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'GCP'">
                    <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'AWS'">
                    <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'CLOUDZ'">
                    <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCodecspCode == 'IBM'">
                    <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'AZURE'">
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
        customerProjectsClusters: function() {
            return this.$store.state.customer.customerProjectsClusters
        }
    },
    data()  {
        return {
            clusters_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'projectName', label: 'Project Name', tdClass: 'text-left' },
                { key: 'customerCloudAccountCspCode', label: 'Cloud', tdClass: 'text-center' },
                { key: 'projectEnviromentType', label: 'Project Env', tdClass: 'text-center' },
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
            ]
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

            this.$store.dispatch('customer/getCustomerProjectsClusters', {id: this.id})
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
