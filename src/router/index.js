import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Customer Management
const Customer = () => import('@/views/customer/Customer')

// Project Management
const Projects = () => import('@/views/project/Projects')
const OpsCostTransfer = () => import('@/views/project/OpsCostTransfer')

// Product Management
const Product = () => import('@/views/product/Product')
const AddOnService = () => import('@/views/product/AddOnService') // Add-on Service 관리
const ProductCostTemplate = () => import('@/views/product/ProductCostTemplate') // 원가견적서 템플릿 관리

// Cluster Management
const ClusterStatus = () => import('@/views/cluster/ClusterStatus')
const NodeStatus = () => import('@/views/cluster/NodeStatus')
const AddOnServiceStatus = () => import('@/views/cluster/AddOnServiceStatus')

// Estimate Management
const Estimates = () => import('@/views/estimate/Estimates')
const EstimatesVolume = () => import('@/views/estimate/EstimatesVolume') // Estimates 용량산정
const EstimatesCost = () => import('@/views/estimate/EstimatesCost') // Estimates 원가견적
const StandardInfomation = () => import('@/views/estimate/StandardInfo')
const VMCost = () => import('@/views/estimate/VmCost')
const StorageCost = () => import('@/views/estimate/StorageCost')
const MSPCost = () => import('@/views/estimate/MspCost')

// Order Management
const Order = () => import('@/views/order/Order')

// Backup Management
const Backup = () => import('@/views/backup/Backup')

// Notification Management
const Notification = () => import('@/views/notification/Notification')

// others
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'customer',
          redirect: '/customer/customer',
          name: 'Customer Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/customer/customer',
              name: 'Customer Management',
              component: Customer
            }
          ]
        },
        {
          path: 'project',
          redirect: '/project/projects',
          name: 'Project Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/project/projects',
              name: 'Projects',
              component: Projects
            },
            {
              path: '/project/opscosttransfer',
              name: 'Ops. Cost Transfer Status',
              component: OpsCostTransfer
            }
          ]
        },
        {
          path: 'product',
          redirect: '/product/product',
          name: 'Product Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/product/product',
              name: 'Product Management',
              component: Product
            },
            {
              path: '/product/addonservice',
              name: 'Add-on Service 관리',
              component: AddOnService
            },
            {
              path: '/product/productcosttemplate',
              name: '원가견적서 템플릿 관리',
              component: ProductCostTemplate
            }
          ]
        },
        {
          path: 'cluster',
          redirect: '/cluster/clusterstate',
          name: 'Cluster Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/cluster/clusterstate',
              name: 'Cluster Status',
              component: ClusterStatus
            },
            {
              path: '/cluster/nodestatus',
              name: 'Node Status',
              component: NodeStatus
            },
            {
              path: '/cluster/addonservicestatus',
              name: 'Add-on Service Status',
              component: AddOnServiceStatus
            }
          ]
        },
        {
          path: 'estimate',
          redirect: '/estimate/estimates',
          name: 'Estimate Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/estimate/estimates',
              name: 'Estimates',
              component: Estimates
            },
            {
              path: '/estimate/estvolume',
              name: 'Estimates 용량산정',
              component: EstimatesVolume
            },
            {
              path: '/estimate/estcost',
              name: 'Estimates 원가견적',
              component: EstimatesCost
            },
            {
              path: '/estimate/standardinfomation',
              name: 'Standard Infomation',
              component: StandardInfomation
            },
            {
              path: '/estimate/vmcost',
              name: 'VM Cost',
              component: VMCost
            },
            {
              path: '/estimate/storagecost',
              name: 'Storage Cost',
              component: StorageCost
            },
            {
              path: '/estimate/mspcost',
              name: 'MSP Cost',
              component: MSPCost
            }
          ]
        },
        {
          path: 'order',
          redirect: '/order/order',
          name: 'Order Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'order',
              name: 'Order',
              component: Order
            }
          ]
        },
        {
          path: 'backup',
          redirect: '/backup/backup',
          name: 'Backup Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'backup',
              name: 'Backup',
              component: Backup
            }
          ]
        },
        {
          path: 'notification',
          redirect: '/notification/notification',
          name: 'Notification Management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'notification',
              name: 'Notification',
              component: Notification
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    },
    {
      path: '',
      name: 'Page500',
      component: Page500
    }
  ]
})
