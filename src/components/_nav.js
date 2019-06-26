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
  ]
}
