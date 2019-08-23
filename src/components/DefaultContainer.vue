<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="/static/cloudzcp-logo.png" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="/static/cloudzcp-logo.png" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="px-5">{{ userName }}</b-nav-item>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <CostEstimateHistory/>
      </AppAside>
      <OkMessageBox/>
    </div>
  </div>
</template>

<script>
import nav from './_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import CostEstimateHistory from '@/pages/estimate/project/cost_estimate/CostEstimateHistory'
import OkMessageBox from '@/components/common/OkMessageBox'

import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '@/shared/classes'
import toggleClasses from '@/shared/toggle-classes'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    CostEstimateHistory,
    OkMessageBox
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    userName () {
    	return this.$store.getters.getUserName
    }
  },
  mounted () {
  	this.$store.watch(this.$store.getters.asideToggleStatus, status => {
  		this.toggle()
  	})
  },
  created () {
  	this.$store.dispatch('getUserInfo')
  },
  methods: {
	toggle(force) {
	   	const [display, mobile] = ['lg', false]
	   	let cssClass = asideMenuCssClasses[0]
	   	if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
	       	cssClass = `aside-menu-${display}-show`
	   	}
	   	toggleClasses(cssClass, asideMenuCssClasses, force)
	}
  }
}
</script>
