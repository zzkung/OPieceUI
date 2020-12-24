import auth from '../auth/auth'

Page({
  data: {
    resetCanvas: false
  },
  canvasToImage(e) {
    let { tempFilePath } = e.detail
    auth.getPermission({
      name: 'writePhotosAlbum'
    }).then((res) => {
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(res) {
          console.log(res)
          wx.showModal({
            title: '',
            content: '签名已经保存到相册！',
            showCancel: false,
            success() { }
          })
        },
        fail(err) {
          wx.hideLoading()
          wx.showToast({
            title: '取消保存签字',
            icon: 'none'
          })
          console.error(err)
        }
      })
    })
  },
  // 监听屏幕旋转
  onResize(e) {
    // 重置canvas
    this.setData({ resetCanvas: true })
  }
})