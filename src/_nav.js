export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Z-MANAGEMENT PORTAL'
    },
    {
      name: 'Customer Mgmt',
      url: '/customer/customer',
      icon: 'icon-people'
    },
    {
      name: 'Project Mgmt',
      url: '/project',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Projects',
          url: '/project/projects',
          icon: 'icon-folder'
        },
        {
          name: 'Ops. Cost Transfer Status',
          url: '/project/opscosttransfer',
          icon: 'icon-shuffle'
        }
      ]
    },
    {
      name: 'Product Mgmt',
      url: '/product/product',
      icon: 'icon-present'
    },
    {
      name: 'Cluster Mgmt',
      url: '/cluster',
      icon: 'icon-layers',
      children: [
        {
          name: 'Cluster Status',
          url: '/cluster/clusterstate',
          icon: 'icon-puzzle'
        },
        {
          name: 'Node Status',
          url: '/cluster/nodestatus',
          icon: 'icon-options-vertical'
        },
        {
          name: 'Add-on Service Status',
          url: '/cluster/addonservicestatus',
          icon: 'icon-speech'
        }
      ]
    },
    {
      name: 'Estimate Mgmt',
      url: '/estimate',
      icon: 'icon-calculator',
      children: [
        {
          name: 'Estimates',
          url: '/estimate/estimates',
          icon: 'icon-pencil'
        },
        {
          name: 'Standard Infomation',
          url: '/estimate/standardinfomation',
          icon: 'icon-docs'
        },
        {
          name: 'VM Cost',
          url: '/estimate/vmcost',
          icon: 'icon-picture'
        },
        {
          name: 'Storage Cost',
          url: '/estimate/storagecost',
          icon: 'icon-drawer'
        },
        {
          name: 'MSP Cost',
          url: '/estimate/mspcost',
          icon: 'icon-handbag'
        }
      ]
    },
    {
      name: 'Order Mgmt',
      url: '/order/order',
      icon: 'icon-basket'
    },
      {
      name: 'Backup Mgmt',
      url: '/backup/backup',
      icon: 'icon-arrow-down-circle'
    },
      {
      name: 'Notification Mgmt',
      url: '/notification/notification',
      icon: 'icon-directions'
    }
  ]
}
