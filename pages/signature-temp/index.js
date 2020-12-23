import auth from '../auth/auth'

Page({
  data: {
    canvasPlaceholder: '签名区域',
    canvasWidth: 0,
    canvasHeight: 0,
    dpr: 0,
    canvas: null,
    ctx: null,
    drawNum: 0 // 用于显示/隐藏提示文字
  },
  onShow: function () {
    // 通过 SelectorQuery 获取 Canvas 节点
    const query = wx.createSelectorQuery()
    query.select('#signatureCanvas').fields({
      node: true,
      size: true
    }).exec(this.init.bind(this))
  },

  init (res) {
    console.log(res)
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = res[0].width * dpr
    canvas.height = res[0].height * dpr

    this.setData({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      dpr,
      canvas,
      ctx
    }, () => {
      this.drawBg()
      this.drawPlaceholderText()
    })
  },

  // 绘制背景
  drawBg () {
    let { ctx, canvasWidth, canvasHeight } = this.data
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  },

  // 绘制提示文字
  drawPlaceholderText () {
    let { ctx, canvasPlaceholder, canvasWidth, canvasHeight } = this.data
    ctx.font = '40px sans-serif',
    ctx.fillStyle = '#c0c4cc'
    ctx.fillText(canvasPlaceholder, Math.ceil((canvasWidth - ctx.measureText(canvasPlaceholder).width) / 2), Math.ceil(canvasHeight / 2))
  },

  // 绘制覆盖提示文字的矩形
  drawRect () {
    let { ctx, canvasWidth, canvasHeight, canvasPlaceholder } = this.data
    ctx.fillStyle = '#fff'
    ctx.fillRect(Math.ceil((canvasWidth - ctx.measureText(canvasPlaceholder).width) / 2), Math.ceil(canvasHeight / 2) - 40, ctx.measureText(canvasPlaceholder).width, 50)
  },

  // 记录绘制起点
  handleTouchStart (e) {
    let { ctx, dpr, drawNum } = this.data
    let { x, y } = e.changedTouches[0]
    if (drawNum < 1) {
      this.drawRect()
    }
    this.setData({ drawNum: drawNum + 1 })
    ctx.beginPath()
    ctx.strokeStyle = '#303133' // 描边颜色
    ctx.lineWidth = 8
    ctx.lineCap = 'round' // 线条的端点样式
    ctx.lineJoin = 'round' // 线条的交点样式
    ctx.moveTo(x * dpr, y * dpr)
  },
  
  // 记录绘制移动点，刷新绘制路径
  handleTouchMove (e) {
    let { ctx, dpr } = this.data
    let { x, y } = e.changedTouches[0]
    ctx.lineTo(x * dpr, y * dpr)
    ctx.stroke()
    ctx.moveTo(x * dpr, y * dpr)
  },

  handleTouchEnd (e) {
    console.log('手指触摸动作结束')
  },

  // 清除画布
  handleClear () {
    let { ctx, canvasWidth, canvasHeight } = this.data
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    this.setData({ drawNum: 0 })
    this.drawBg()
    this.drawPlaceholderText()
  },

  // 导出图片
  handleSubmit () {
    wx.showLoading({
      title: '正在导出签名',
    })
    let { canvas, canvasWidth, canvasHeight } = this.data
    this.canvasToImage(canvas, canvasWidth, canvasHeight)
  },

  canvasToImage (canvas, width, height) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: width,
      height: height,
      destWidth: width,
      destHeight: height,
      canvas: canvas,
      fileType: 'png',
      success(res) {
        wx.hideLoading()
        console.log('路径', res)
        if (res.errMsg == 'canvasToTempFilePath:ok') {
          let tempFilePath = res.tempFilePath
          auth.getPermission({
            name: 'writePhotosAlbum'
          }).then((res) => {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                console.log(res)
                wx.showModal({
                  title: '',
                  content: '签名已经保存到相册!',
                  showCancel: false,
                  success() {}
                })
              },
              fail(err) {
                console.error(err)
              }
            })
          })
        } else {
          wx.showToast({
            title: '导出失败',
            icon: 'error'
          })
        }
      }
    })
  }
})