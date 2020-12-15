import Page from '../../common/page'
const datas = require('./data.js')
const app = getApp()

Page({

  data: {
    imghttp: app.globalData.imghttp,
    vtabs: [],
    activeTab: 0,

    showParam: false,
    params: [
      {
        title: '切换方式',
        items: [
          {name: '左右联动', checked: 'true'},
          {name: '互相独立'}
        ]
      }
    ],
    paramCheckeds: [0]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    let vtabs = datas.randomData()
    this.setData({
      vtabs: vtabs
    }, () => {
      wx.hideLoading()
    })
  },
  onTabCLick(e) {
    const index = e.detail.index
    if (this.data.paramCheckeds[0] == 0) return
    this.setData({
      activeTab: index
    })
  },
  onChange(e) {
    const index = e.detail.index
  },
  radioChange(e) { // 切换参数
    let value = e.detail.value
    this.setData({
      [`paramCheckeds[${value[0]}]`]: value[1]
    })
  }
})