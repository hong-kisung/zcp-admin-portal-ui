<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />
            <clusters />
            <stakeholders />

            <b-tab>
                <template slot="title">
                    <i class="icon-calculator mr-1"></i> Estimate Sheet
                </template>
            </b-tab>
            <orders />
            <sizing />
        </b-tabs>
    </div>
</template>

<script>
import BasicInfomation from './detail/BasicInfomation'
import Clusters from './detail/Clusters'
import Stakeholders from './detail/Stakeholders'
import Orders from './detail/Orders'
import Sizing from '@/views/estimate/project/ProjectVolume'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation,
        Clusters,
        Stakeholders,
        Orders,
        Sizing
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
