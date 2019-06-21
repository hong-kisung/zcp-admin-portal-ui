import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../components/Layout.vue'

import General from '../pages/estimate/iks_cost/General.vue'
import IKSVmCost from '../pages/estimate/iks_cost/IKSVmCost.vue'
import IKSStorageCost from '../pages/estimate/iks_cost/IKSStorageCost.vue'
import ProductList from '../pages/estimate/platform/ProductList.vue'
import ProductMspCost from '../pages/estimate/platform/ProductMspCost.vue'
import ProjectList from '../pages/estimate/project/ProjectList.vue'
import ProjectVolume from '../pages/estimate/project/ProjectVolume.vue'
import ProjectCostEstimate from '../pages/estimate/project/ProjectCostEstimate.vue'

Vue.use(Router)

const routes = [
	{
	    path: '/',
	    name: 'home',
	    component: Layout,
	    redirect: '/estimate/general',
	},
	{
	    path: '/estimate',
	    name: 'estimate',
	    component: Layout,
	    redirect: '/estimate/general',
	    children: [
	    	{
	    		path: 'general',
	    		name: 'general',
	    		component: General
	    	},
	    	{
	    		path: 'iks_vm',
	    		name: 'iks_vm',
	    		component: IKSVmCost
	    	},
	    	{
	    		path: 'iks_storage',
	    		name: 'iks_storage',
	    		component: IKSStorageCost
	    	},
	    	{
	    		path: 'product',
	    		name: 'product',
	    		component: ProductList
	    	},
	    	{
	    		path: 'product_msp',
	    		name: 'product_msp',
	    		component: ProductMspCost
	    	},
	    	{
	    		path: 'project',
	    		name: 'project',
	    		component: ProjectList
	    	},
	    	{
	    		path: 'project/:projectId/volume',
	    		name: 'project_volume',
	    		component: ProjectVolume
	    	},
	    	{
	    		path: 'project/:projectId/cost_estimate',
	    		name: 'project_cost_estimate',
	    		component: ProjectCostEstimate
	        }
	    ]
	}
]

export default new Router({
	routes
})

