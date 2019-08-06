import Vue from 'vue'
import Router from 'vue-router'

// Containers
import DefaultContainer from '@/components/DefaultContainer'

import General from '@/pages/estimate/iks_cost/General.vue'
import IKSVmCost from '@/pages/estimate/iks_cost/IKSVmCost.vue'
import IKSStorageCost from '@/pages/estimate/iks_cost/IKSStorageCost.vue'
import ProductList from '@/pages/estimate/platform/ProductList.vue'
import ProductAddOnService from '@/pages/estimate/platform/AddOnService.vue'
import ProductCostEstimateTemplate from '@/pages/estimate/platform/CostEstimateTemplate.vue'
import ProductMspCost from '@/pages/estimate/platform/ProductMspCost.vue'
import ProjectList from '@/pages/estimate/project/ProjectList.vue'
import ProjectVolume from '@/pages/estimate/project/ProjectVolume.vue'
import ProjectCostEstimate from '@/pages/estimate/project/ProjectCostEstimate.vue'

import OrderList from '@/pages/operation/order/OrderList.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/estimate',
    name: 'Home',
    component: DefaultContainer,
    children: [{
        path: 'estimate',
        redirect: '/estimate/project',
        name: '견적서',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [{
            path: 'general',
            name: 'general',
            component: General,
            meta: {
              label: '기준정보',
            }
          },
          {
            path: 'iks_vm',
            name: 'iks_vm',
            component: IKSVmCost,
            meta: {
              label: 'VM',
            }
          },
          {
            path: 'iks_storage',
            name: 'iks_storage',
            component: IKSStorageCost,
            meta: {
              label: 'Storage',
            }
          },
          {
            path: 'product',
            name: 'product',
            component: ProductList,
            meta: {
              label: 'Product',
            }
          },
          {
            path: 'product/:productId/addonservice',
            name: 'ProductAddOnService',
            component: ProductAddOnService,
            meta: {
              label: 'Product > Add-on Service 관리',
            }
          },
          {
            path: 'product/:productId/cost_estimate_template',
            name: 'ProductCostEstimateTemplate',
            component: ProductCostEstimateTemplate,
            meta: {
              label: 'Product > 원가 견적서 템플릿 관리',
            }
          },
          {
            path: 'product_msp',
            name: 'product_msp',
            component: ProductMspCost,
            meta: {
              label: 'MSP 비용',
            }
          },
          {
            path: 'project',
            name: 'Project',
            component: ProjectList,
            meta: {
              label: 'Project',
            }
          },
          {
            path: 'project/:projectId/volume',
            name: 'ProjectVolume',
            component: ProjectVolume,
            meta: {
              label: 'Project > 용량산정',
            }
          },
          {
            path: 'project/:projectId/cost_estimate',
            name: 'project_cost_estimate',
            component: ProjectCostEstimate,
            meta: {
              label: 'Project > 원가 견적',
            }
          }
        ]
      },
      {
        path: 'operation',
        redirect: '/operation/order',
        name: '운영',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'order',
            name: 'order',
            component: OrderList,
            meta: {
              label: '주문 관리',
            }
          }
        ]
      }

    ]
  }]
})
