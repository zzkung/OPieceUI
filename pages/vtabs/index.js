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
      },
      {
        title: '切换方式',
        items: [
          {name: '左右联动', checked: 'true'},
          {name: '互相独立'}
        ]
      }
    ]
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
    console.log(this.data.vtabs)
  },
  onTabCLick(e) {
    const index = e.detail.index
    // this.setData({
    //   activeTab: index
    // })
  },
  onChange(e) {
    const index = e.detail.index
    // this.setData({
    //   activeTab: index
    // })
  },
  radioChange(e) {
    console.log(e.detail.value)
  }
})