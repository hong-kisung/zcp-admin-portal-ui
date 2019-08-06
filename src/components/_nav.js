export default {
  items: [
    {
      name: '견적서',
      url: '/estimate',
      icon: 'icon-note',
      children: [
        {
          name: '기준정보',
          url: '/estimate/general'
        },
        {
          name: 'VM',
          url: '/estimate/iks_vm'
        },
        {
          name: 'Storage',
          url: '/estimate/iks_storage'
        },
        {
            name: 'Product',
            url: '/estimate/product'
        },
        {
            name: 'MSP 비용',
            url: '/estimate/product_msp'
        },
        {
            name: 'Project',
            url: '/estimate/project'
        },
      ]
    },
    {
      name: '운영',
      url: '/operation',
      icon: 'icon-note',
      children: [
        {
          name: '주문 관리',
          url: '/operation/order'
        },
        {
          name: '클러스터 관리',
          url: '/operation/cluster'
        },
        {
          name: '프로젝트 관리',
          url: '/operation/cluster'
        }
      ]
    }
  ]
}
