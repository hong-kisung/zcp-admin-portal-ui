import Vue from 'vue'
import Router from 'vue-router'

// Containers
import DefaultContainer from '@/components/DefaultContainer'

import Page404 from '@/pages/common/Page404.vue'

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
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/product',
    name: 'Home',
    component: DefaultContainer,
    children: [
      {
        path: 'product',
        meta: {
            label: 'Product Mgmt',
        },
        component: {
            render(c) {
              return c('router-view')
            }
        },
        children: [
          {
              path: '',
              component: ProductList
          },
          {
              path: ':productId/addonservice',
              name: 'ProductAddOnService',
              component: ProductAddOnService,
              meta: {
                label: 'Add-on Service 관리',
              }
            },
            {
              path: ':productId/cost_estimate_template',
              name: 'ProductCostEstimateTemplate',
              component: ProductCostEstimateTemplate,
              meta: {
                label: '원가 견적서 템플릿 관리',
              }
            },
        ]
      },
      {
        path: 'estimate',
        redirect: '/estimate/estimates',
        name: 'Estimate Mgmt',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'estimates',
            component: ProjectList,
            meta: {
                label: 'Estimates',
            }
          },
          {
            path: 'project/:projectId/volume',
            name: 'ProjectVolume',
            component: ProjectVolume,
            meta: {
              label: 'Estimates 용량산정',
            }
          },
          {
            path: 'project/:projectId/cost_estimate',
            name: 'project_cost_estimate',
            component: ProjectCostEstimate,
            meta: {
              label: 'Estimates 원가 견적서',
            }
          },
          {
            path: 'general',
            name: 'general',
            component: General,
            meta: {
              label: 'Standard Information',
            }
          },
          {
            path: 'iks_vm',
            name: 'iks_vm',
            component: IKSVmCost,
            meta: {
              label: 'VM Cost',
            }
          },
          {
            path: 'iks_storage',
            name: 'iks_storage',
            component: IKSStorageCost,
            meta: {
              label: 'Storage Cost',
            }
          },
          {
            path: 'product_msp',
            name: 'product_msp',
            component: ProductMspCost,
            meta: {
              label: 'MSP Cost',
            }
          }
        ]
      },
      {
        path: 'operation',
        redirect: '/operation/order',
        name: 'Order Mgmt',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'order',
            component: OrderList
          }
        ]
      },

    ]
  },
  {
      path: '*',
      redirect: '/error/404',
      name: 'Error',
      component: DefaultContainer,
      children: [
        {
          path: 'error',
          component: {
              render(c) {
                return c('router-view')
              }
          },
          children: [
            {
                path: '404',
                component: Page404,
            },
          ]
        }
      ]
  }]
})
