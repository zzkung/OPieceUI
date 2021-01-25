import { getGitUserList } from '../../common/cRequest'

Page({

  data: {
    userList: []
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '获取用户列表中...',
    })
    getGitUserList().then((res) => {
      wx.hideLoading()
      console.log(res.data)
      this.setData({
        userList: res.data
      })
    })
  }

})