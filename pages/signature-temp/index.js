Page({
  data: {
    canvasWidth: 0,
    canvasHeight: 0,
    dpr: 0,
    canvas: null,
    ctx: null
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
      this.drawPlaceholderText(ctx, canvas.width, canvas.height)
    })
  },

  drawPlaceholderText (ctx, width, height) {
    let drawTxt =  '签名区域'
    ctx.fillStyle = '#c0c4cc'
    ctx.font = '40px sans-serif'
    ctx.fillText(drawTxt, Math.ceil((width - ctx.measureText(drawTxt).width) / 2), Math.ceil(height / 2) - 20)
  },

  // 记录绘制起点
  handleTouchStart (e) {
    let { ctx, dpr } = this.data
    let { x, y } = e.changedTouches[0]
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

  // 清除画布
  handleClear () {
    let { ctx, canvasWidth, canvasHeight } = this.data
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)  
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
          let previewArr = [tempFilePath]
          wx.previewImage({
            urls: previewArr,
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