export default {
  items: [
    {
    	title: true,
    	name: 'Z-Management Portal',
    	class: '',
        wrapper: {
            element: '',
            attributes: {}
        }
    },
    {
    	name: 'Customer Mgmt',
      	url: '/customer',
  		icon: 'icon-puzzle',
    },
    {
        name: 'Project Mgmt',
        url: '/project',
  		icon: 'icon-puzzle',
        children: [
            {
            	name: 'Projects',
            	url: '/project/a',
            },
            {
                name: 'Ops. Cost Transfer',
                url: '/project/b',
            },
        ]
    },
    {
        name: 'Product Mgmt',
        url: '/product',
    	icon: 'icon-puzzle',
    },
    {
        name: 'Cluster Mgmt',
        url: '/cluster',
    	icon: 'icon-puzzle',
        children: [
            {
            	name: 'Cluster Status',
            	url: '/cluster/a',
            },
            {
                name: 'Node Status',
                url: '/cluster/b',
            },
            {
                name: 'Add-on Service Status',
                url: '/cluster/c',
            },
        ]
    },
    {
        name: 'Estimate Mgmt',
        url: '/estimate',
        icon: 'icon-puzzle',
        children: [
          {
              name: 'Estimates',
              url: '/estimate/estimates'
          },
          {
              name: 'Standard Information',
              url: '/estimate/general'
          },
          {
        	  name: 'VM Cost',
        	  url: '/estimate/iks_vm'
          },
          {
        	  name: 'Storage Cost',
        	  url: '/estimate/iks_storage'
          },
          {
              name: 'MSP Cost',
              url: '/estimate/product_msp'
          },
        ]
    },
    {
    	name: 'Order Mgmt',
    	url: '/order',
    	icon: 'icon-puzzle',
    },
    {
    	name: 'Backup Mgmt',
    	url: '/backup',
    	icon: 'icon-puzzle',
    },
    {
    	name: 'Notification Mgmt',
    	url: '/notification',
    	icon: 'icon-puzzle',
    }
  ]
}
