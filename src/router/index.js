import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Customer Management
const CustomerList = () => import('@/views/customer/CustomerList')
const CustomerDetail = () => import('@/views/customer/CustomerDetail')

// Project Management
const ProjectList = () => import('@/views/project/ProjectList')
const ProjectDetail = () => import('@/views/project/ProjectDetail')
const OpsCostTransfer = () => import('@/views/project/OpsCostTransfer')

// Product Management
const ProductList = () => import('@/views/product/ProductList')
const ProductAddOnService = () => import('@/views/product/AddOnService') // Add-on Service 관리
const ProductCostEstimateTemplate = () => import('@/views/product/CostEstimateTemplate') // 원가견적서 템플릿 관리

// Cluster Management
const ClusterList = () => import('@/views/cluster/ClusterList')
const ClusterDetail = () => import('@/views/cluster/ClusterDetail')

// Estimate Management
//const ProjectEstimateList = () => import('@/views/estimate/ProjectList')
const EstimateList = () => import('@/views/estimate/EstimateList')
const ProjectVolume = () => import('@/views/estimate/project/ProjectVolume') // Estimates 용량산정
const CostEstimateDetail = () => import('@/views/estimate/estimate/CostEstimateDetail')
const CostEstimateCloudDetail = () => import('@/views/estimate/estimate/CostEstimateCloudDetail')
const StandardInfomation = () => import('@/views/estimate/StandardInfo')
const VMCost = () => import('@/views/estimate/VmCost')
const StorageCost = () => import('@/views/estimate/StorageCost')
const MSPCost = () => import('@/views/estimate/MspCost')

// Order Management
const Order = () => import('@/views/order/OrderList')

// Backup Management
const Backup = () => import('@/views/backup/Backup')

// Notification Management
const Notification = () => import('@/views/notification/Notification')

// others
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [{
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
                    name: 'Customers Management',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                        path: 'customer',
                        redirect: '/customer/customer',
                        name: 'Customers',
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [
                            {
                                path: '',
                                component: CustomerList
                            },
                            {
                                path: ':id',
                                name: 'CustomerDetail',
                                component: CustomerDetail,
                                meta: {
                                    label: 'Customer Details'
                                }
                            },
                        ]
                    }]
                },
                {
                    path: 'project',
                    redirect: '/project/projects',
                    name: 'Project Management',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/project/projects',
                            name: 'Projects',
                            component: ProjectList
                        },
                        {
                            path: '/project/:id/detail',
                            name: 'ProjectDetail',
                            component: ProjectDetail
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
                    redirect: '/product/products',
                    name: 'Product Management',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'products',
                            redirect: '/product/products',
                            name: 'Products',
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
                                    path: ':productId/cost',
                                    name: 'ProductCostEstimateTemplate',
                                    component: ProductCostEstimateTemplate,
                                    meta: {
                                        label: '원가견적서 템플릿 관리',
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    path: 'cluster',
                    redirect: '/cluster/clusters',
                    name: 'Cluster Management',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/cluster/clusters',
                            name: 'Clusters',
                            component: ClusterList
                        },
                        {
                            path: '/cluster/:id/detail',
                            name: 'ClusterDetail',
                            component: ClusterDetail
                        },
                    ]
                },
                {
                    path: 'estimate',
                    redirect: '/estimate/estimates',
                    name: 'Estimate Management',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'estimates',
                            redirect: '/estimate/estimates',
                            name: 'Estimates',
                            component: {
                                render(c) {
                                    return c('router-view')
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    component: EstimateList
                                },
                                {
                                    path: ':projectId/volume',
                                    name: 'ProjectVolume',
                                    component: ProjectVolume,
                                    meta: {
                                        label: 'Estimates 용량산정'
                                    }
                                },
                                {
                                    path: 'cost-estimate',
                                    name: 'CostEstimateDetail',
                                    component: CostEstimateDetail,
                                    meta: {
                                        label: 'Estimates 원가견적',
                                    }
                                },
                                {
                                    path: 'cost-estimate-cloud',
                                    name: 'CostEstimateCloudDetail',
                                    component: CostEstimateCloudDetail,
                                    meta: {
                                        label: 'Estimates 원가견적',
                                    }
                                },
                            ]
                        },
                        {
                            path: 'standardinfomation',
                            name: 'Standard Infomation',
                            component: StandardInfomation
                        },
                        {
                            path: 'vmcost',
                            name: 'VM Cost',
                            component: VMCost
                        },
                        {
                            path: 'storagecost',
                            name: 'Storage Cost',
                            component: StorageCost
                        },
                        {
                            path: 'mspcost',
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
                        render(c) {
                            return c('router-view')
                        }
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
                        render(c) {
                            return c('router-view')
                        }
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
                        render(c) {
                            return c('router-view')
                        }
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

export default router
