<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ title }}</h1>
        <b-tabs class="detail-cnt">
            <basic-infomation />
            <projects />
            
            <b-tab>
                <template slot="title">
                    <i class="icon-calculator mr-1"></i> Estimate Sheet
                </template>
            </b-tab>

            <orders />
        </b-tabs>
    </div>
</template>

<script>
import BasicInfomation from './detail/BasicInfomation'
import Projects from './detail/Projects'
import Orders from './detail/Orders'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        BasicInfomation,
        Projects,
        Orders
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
