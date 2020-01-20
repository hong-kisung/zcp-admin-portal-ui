<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />
            <cloud-service-account />
            <projects />

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
import Projects from './detail/Projects'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation,
        CloudServiceAccount,
        Projects
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
