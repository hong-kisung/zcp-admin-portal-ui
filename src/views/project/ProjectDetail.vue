<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />
            <clusters />

            <b-tab>
                <template slot="title">
                    <i class="icon-people mr-1"></i> Stakeholders
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-calculator mr-1"></i> Estimate Sheet
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icon-basket mr-1"></i> Orders
                </template>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import BasicInfomation from './detail/BasicInfomation'
import Clusters from './detail/Clusters'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation,
        Clusters
    },
    data()  {
        return {
            title: ''
        }
    },
    created () {
		this.title = this.$route.params.name
	},
}
</script>
