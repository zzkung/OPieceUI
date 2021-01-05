module.exports = {
  title: 'OPiece UI',
  description: 'OPiece UI 小程序组件库',
  port: '1214',
  head: [
    ['link', { rel: 'icon', href: '.vuepress/public/accets/img/logo.png' }]
  ],
  dest: '.vuepress/dist',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '.vuepress/public/accets/img/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/component/' },
      {
        text: '关于',
        items: [
          { text: '版权信息', link: '/about/copyright' },
          { text: '关于作者', link: '/about/author' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/zzkung/OPieceUI', target: '_blank' }
    ],
    sidebar: {
      '/guide/': [
        'introduce',
        'quick'
      ],
      '/component/': [
        'button',
        'icon'
      ],
    }
  },
  evergreen: true
}