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
  }
})