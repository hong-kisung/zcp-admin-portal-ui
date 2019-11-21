<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />

            <b-tab>
                <template slot="title">
                    <i class="icon-folder-alt mr-1"></i> Projects
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

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation
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
