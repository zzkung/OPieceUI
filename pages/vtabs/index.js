const datas = require('./data.js')
const app = getApp()

Page({

  data: {
    imghttp: app.globalData.imghttp,
    vtabs: datas.tabList,
    listData: [],
    activeTab: 0
  },
  onLoad() {
    let listData = datas.randomData()
    this.setData({
      listData: listData
    })
    console.log(this.data.listData)
  },
  onTabCLick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },
  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  }
})