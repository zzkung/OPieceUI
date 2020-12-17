import lists from './config'

Page({

  data: {
    lists
  },
  
  handleClipboard (e) {
    let value = e.currentTarget.dataset.value
    wx.setClipboardData({
      data: value,
      success (res) {
        wx.showToast({
          title: '色值已复制',
        })
      }
    })
  }
})