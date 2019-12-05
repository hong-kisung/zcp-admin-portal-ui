<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />
            <cloud-service-account />

            <b-tab>
                <template slot="title">
                    <i class="icon-folder-alt mr-1"></i> Projects
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-layers mr-1"></i> Clusters
                </template>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

import BasicInfomation from './detail/BasicInfomation'
import CloudServiceAccount from './detail/CloudServiceAccount'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation,
        CloudServiceAccount
    },
    data()  {
        return {
            title: ''
        }
    },
    created () {
		this.title = this.$route.params.name
	}
}
</script>
