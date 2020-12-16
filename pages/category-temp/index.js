import Page from '../../common/page'
import paramConfig from '../paramConfig'
const datas = require('./data.js')
const app = getApp()

Page({

  data: {
    imghttp: app.globalData.imghttp,
    vtabs: [],
    activeTab: 0,

    showParam: false,
    params: paramConfig.vtabsParam,
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