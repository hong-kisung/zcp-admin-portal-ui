import Vue from 'vue'
import Router from 'vue-router'

import General from '../pages/iks_cost/General.vue'
import IKSVmCost from '../pages/iks_cost/IKSVmCost.vue'
import IKSStorageCost from '../pages/iks_cost/IKSStorageCost.vue'
import ProductList from '../pages/platform/ProductList.vue'
import ProductDetail from '../pages/platform/ProductDetail.vue'
import ProductMspCost from '../pages/platform/ProductMspCost.vue'
import ProjectList from '../pages/project/ProjectList.vue'
import ProjectDetail from '../pages/project/ProjectDetail.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/general',
			name: 'general',
			component: General,
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
			path: '/product_new',
			name: 'product_new',
			component: ProductDetail,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/product/:productId',
			name: 'product_detail',
			component: ProductDetail,
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
			path: '/product_new',
			name: 'project_new',
			component: ProjectDetail,
			meta: {
				allowAnonymous: true
			}
		},
		{
			path: '/project/:projectId',
			name: 'project_detail',
			component: ProjectDetail,
			meta: {
				allowAnonymous: true
			}
		}
	]
})
