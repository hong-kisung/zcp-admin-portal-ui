<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
	  dark
    >
      <v-list dense>
        <v-list-tile @click="changeRoute('general', 1)">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]">기준정보</v-list-tile-title>
        </v-list-tile>
        
        <v-list-group
          no-action
          value="true">
          <template v-slot:activator>
            <v-list-tile>
	          <v-list-tile-action>
	            <v-icon>settings</v-icon>
	          </v-list-tile-action>
              <v-list-tile-title class="item-title">IKS Cost</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile @click="changeRoute('iks_vm', 2)">
            <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">VM</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>sd_storage</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="changeRoute('iks_storage', 3)">
            <v-list-tile-title :class="[{'active': selectedIndex === 3}, 'item-title' ]">Storage</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>storage</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        
        <v-list-group
          no-action
          value="true">
          <template v-slot:activator>
            <v-list-tile>
	          <v-list-tile-action>
	            <v-icon>settings</v-icon>
	          </v-list-tile-action>
              <v-list-tile-title class="item-title">Platform</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile @click="changeRoute('product', 4)">
            <v-list-tile-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">Product</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>apps</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="changeRoute('product_msp', 4)">
            <v-list-tile-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">MSP Cost</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>settings_applications</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="changeRoute('project', 1)">
          <v-list-tile-action>
            <v-icon>report</v-icon>
          </v-list-tile-action>
          <v-list-tile-title :class="[{'active': selectedIndex === 5}, 'item-title' ]">Project</v-list-tile-title>
        </v-list-tile>
      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>ZCP 견적서</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app fixed dark>
      <span>&copy; </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  	data: () => ({
	  	drawer: true,
      	selectedIndex: 1
  	}),
  	methods: {
    	changeRoute (routeName, selectedIndex) {
      		const vm = this;
      		vm.selectedIndex = selectedIndex;
      		return vm.$router.push({name: routeName});
    	}
  	},
    created () {
      	this.changeRoute('general', 1);
    }
}
</script>

<style>
  .active {
    font-weight: bold;
  }

  .item-title {
    font-size: 15px;
    font-weight: 500;
  }

</style>
