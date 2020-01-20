<template>
    <b-tab>
        <template slot="title">
            <i class="icon-folder-alt mr-1"></i> Projects
        </template>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="projects_fields" :items="customerProjects">
                <template slot="no" slot-scope="data">
                    {{ customerProjects.length - data.index }}
                </template>
                <template slot="customerCloudAccountCspCode" slot-scope="data">
                    <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'GCP'">
                    <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'AWS'">
                    <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'CLOUDZ'">
                    <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCodecspCode == 'IBM'">
                    <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1" v-if="data.item.customerCloudAccountCspCode == 'AZURE'">
                </template>
                <template slot="period" slot-scope="data">
                    {{data.item.devStartDt | toDevPeriod}} ~ {{data.item.devEndDt | toDevPeriod}}
                </template>
                <template slot="activation" slot-scope="data">
                    {{data.item.activation == true ? 'Activation' : 'Inactivation' }}
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
import { Switch as cSwitch } from '@coreui/vue'

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
        customerProjects: function() {
            return this.$store.state.customer.customerProjects
        }
    },
    data()  {
        return {
            projects_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'name', label: 'Project Name', tdClass: 'text-left' },
                { key: 'status', label: 'Status', tdClass: 'text-center' },
                { key: 'customerCloudAccountCspCode', label: 'Cloud', tdClass: 'text-center' },
                { key: 'period', label: 'Dev. Period', tdClass: 'text-center' },
                { key: 'launchDt', label: 'Launching Date', tdClass: 'text-center' },
                { key: 'closedDt', label: 'Closed Date', tdClass: 'text-center' },
                { key: 'estimatedYn', label: 'Estimated YN', tdClass: 'text-center' },
                { key: 'slackChannel', label: 'Slack Channel', tdClass: 'text-left' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center' }
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

            this.$store.dispatch('customer/getCustomerProjects', {id: this.id})
        }
    }
}
</script>
