import lists from './data'

Page({

  data: {
    lists
  },

  copyUrl(e) {
    let { link } = e.currentTarget.dataset
    wx.setClipboardData({
      data: link,
      success (res) {
        wx.showToast({
          title: '链接已复制',
        })
      }
    })
  }
})