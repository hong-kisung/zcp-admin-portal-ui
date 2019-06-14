import Vue from 'vue'
import Router from 'vue-router'

import General from '../pages/iks_cost/General.vue'
import IKSVmCost from '../pages/iks_cost/IKSVmCost.vue'
import IKSStorageCost from '../pages/iks_cost/IKSStorageCost.vue'
import ProductList from '../pages/platform/ProductList.vue'
import ProductMspCost from '../pages/platform/ProductMspCost.vue'
import ProjectList from '../pages/project/ProjectList.vue'
import ProjectVolume from '../pages/project/ProjectVolume.vue'
import ProjectCostEstimate from '../pages/project/ProjectCostEstimate.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/general',
			name: 'general',
			component: General,
		    alias: '/',
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/iks_vm',
			name: 'iks_vm',
			component: IKSVmCost,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/iks_storage',
			name: 'iks_storage',
			component: IKSStorageCost,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/product',
			name: 'product',
			component: ProductList,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/product_msp',
			name: 'product_msp',
			component: ProductMspCost,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/project',
			name: 'project',
			component: ProjectList,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/project/:projectId/volume',
			name: 'project_volume',
			component: ProjectVolume,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/project/:projectId/cost_estimate',
			name: 'project_cost_estimate',
			component: ProjectCostEstimate,
			meta: {
				allowAnonymous: true
			}
	    },
	    {
	      path: '*',
	      props: { page: 5 },
	      redirect: '/404'
	    }
	]
})
