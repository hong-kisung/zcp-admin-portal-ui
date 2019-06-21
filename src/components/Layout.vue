<template>
  <div class="flexible-content">
    <mdb-navbar position="top" expand="large" class="navbar-light-blue font-weight-bold" scrolling>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#" anchorClass="white-text" waves-fixed>ZCP</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item href="#!" anchorClass="white-text" waves-fixed ><mdb-icon fa class="text-white" icon="user"/>Account</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div class="sidebar-fixed position-fixed">
      <mdb-list-group class="list-group-flush">
        <router-link to="/estimate/general" @click.native="activeItem = 1">
          <mdb-list-group-item :action="true" :class="activeItem === 1 && 'active'"><mdb-icon icon="chart-pie" class="mr-3"/>기준정보</mdb-list-group-item>
        </router-link>
        <router-link to="/estimate/iks_vm" @click.native="activeItem = 2">
          <mdb-list-group-item :action="true" :class="activeItem === 2 && 'active'"><mdb-icon icon="user" class="mr-3"/>VM</mdb-list-group-item>
        </router-link>
        <router-link to="/estimate/iks_storage"  @click.native="activeItem = 3">
          <mdb-list-group-item :action="true" :class="activeItem === 3 && 'active'"><mdb-icon icon="table" class="mr-3"/>Storage</mdb-list-group-item>
        </router-link>
        <router-link to="/estimate/product" @click.native="activeItem = 4">
          <mdb-list-group-item :action="true" :class="activeItem === 4 && 'active'"><mdb-icon icon="map" class="mr-3"/>Product</mdb-list-group-item>
        </router-link>
        <router-link to="/estimate/product_msp" @click.native="activeItem = 5">
          <mdb-list-group-item :action="true" :class="activeItem === 5 && 'active'"><mdb-icon icon="exclamation" class="mr-3"/>MSP Cost</mdb-list-group-item>
        </router-link>
        <router-link to="/estimate/project" @click.native="activeItem = 6">
          <mdb-list-group-item :action="true" :class="activeItem === 6 && 'active'"><mdb-icon icon="exclamation" class="mr-3"/>Project</mdb-list-group-item>
        </router-link>
      </mdb-list-group>
    </div>
    <main style="margin-top: 70px;">
      <div class="mt-3 p-3">
        <router-view></router-view>
      </div>
    </main>
    <mdb-footer class="font-small mt-4 navbar-light-blue">
    </mdb-footer>
  </div>
</template>

<script>
import { mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbBtn, mdbIcon, mdbListGroup, mdbListGroupItem, mdbCardBody, mdbFooter, waves } from 'mdbvue'

export default {
	name: 'App',
  	components: {
    	mdbContainer,
   	 	mdbNavbar,
    	mdbNavbarBrand,
    	mdbNavItem,
    	mdbNavbarNav,
    	mdbNavbarToggler,
    	mdbBtn,
    	mdbListGroup,
    	mdbListGroupItem,
    	mdbIcon,
    	mdbCardBody,
    	mdbFooter
  	},
  	data () {
    	return {
      		activeItem: 1
    	}
  	},
  	mixins: [waves],
  	methods: {
  		handleBtnAClick() {
  		
  		}
  	}
}
</script>

<style scoped>
main {
  	
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 250px;
}

.sidebar-fixed {
  position: fixed;
  left: 0;
  top: 60px;
  margin-top: 4px;
  height: 100%;
  width: 15rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  padding: 0;
  padding-top: 10px;
  
  background-color: #6a9ed3;
  font-size: 0.8rem;
}

.sidebar-fixed .logo-wrapper img{
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
  background-color: inherit;
  color: #fff;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
<style>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: 700!important;
}
</style>


<style>
.navbar-light-blue {
	/** background-color: #4b515d !important **/
	background-color: #3f5c80;
}

footer.page-footer {
	bottom: 0;
	color: #fff;
}
</style>

