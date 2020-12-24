Component({
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_/,
        multipleSlots: true
    },
    observers: {
        'resetCanvas': function(value) {
            if (value) {
                this.handleClear()
                this.init() 
            }
        }
    },
    properties: {
        resetCanvas: {
            type: Boolean,
            value: false
        }
    },
    data: {
        canvasPlaceholder: '请在空白处签字',
        canvasWidth: 0,
        canvasHeight: 0,
        dpr: 0,
        canvas: null,
        ctx: null,
        drawNum: 0 // 用于显示/隐藏提示文字
    },
    lifetimes: {
        attached() {
            this.init()
        }
    },
    methods: {
        init() {
            // 通过 SelectorQuery 获取 Canvas 节点
            const query = this.createSelectorQuery()
            query.select('#signatureCanvas').fields({
                node: true,
                size: true
            }, (res) => {
                console.log(res)
                const canvas = res.node
                const ctx = canvas.getContext('2d')
                const dpr = wx.getSystemInfoSync().pixelRatio
                canvas.width = res.width * dpr
                canvas.height = res.height * dpr
    
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
            }).exec()
        },

        // 绘制背景
        drawBg() {
            let { ctx, canvasWidth, canvasHeight } = this.data
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        },

        // 绘制提示文字
        drawPlaceholderText() {
            let { ctx, canvasPlaceholder, canvasWidth, canvasHeight, dpr } = this.data
            ctx.font = `${20 * dpr}px sans-serif`,
                ctx.fillStyle = '#c0c4cc'
            ctx.fillText(canvasPlaceholder, Math.ceil((canvasWidth - ctx.measureText(canvasPlaceholder).width) / 2), Math.ceil(canvasHeight / 2))
        },

        // 绘制覆盖提示文字的矩形
        drawRect() {
            let { ctx, canvasWidth, canvasHeight, canvasPlaceholder, dpr } = this.data
            ctx.fillStyle = '#fff'
            ctx.fillRect(Math.ceil((canvasWidth - ctx.measureText(canvasPlaceholder).width) / 2), Math.ceil(canvasHeight / 2) - (20 * dpr), ctx.measureText(canvasPlaceholder).width, (25 * dpr))
        },

        // 记录绘制起点
        handleTouchStart(e) {
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
        handleTouchMove(e) {
            let { ctx, dpr } = this.data
            let { x, y } = e.changedTouches[0]
            ctx.lineTo(x * dpr, y * dpr)
            ctx.stroke()
            ctx.moveTo(x * dpr, y * dpr)
        },

        handleTouchEnd(e) {
            console.log('手指触摸动作结束')
        },

        // 清除画布
        handleClear() {
            let { ctx, canvasWidth, canvasHeight } = this.data
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            this.setData({ drawNum: 0 })
            this.drawBg()
            this.drawPlaceholderText()
        },

        // 导出图片
        handleSubmit() {
            let { canvas, canvasWidth, canvasHeight, drawNum } = this.data
            if (drawNum < 1) {
                wx.showToast({
                    title: '您还没有签名！',
                    icon: 'error'
                })
                return
            }
            wx.showLoading({
                title: '正在导出签名',
            })
            this.canvasToImage(canvas, canvasWidth, canvasHeight)
        },

        canvasToImage(canvas, width, height) {
            const _self = this
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
                    console.log('路径', res)
                    if (res.errMsg == 'canvasToTempFilePath:ok') {
                        let tempFilePath = res.tempFilePath
                        _self.triggerEvent('canvastoimage', { tempFilePath: tempFilePath })
                    } else {
                        wx.showToast({
                            title: '导出失败',
                            icon: 'error'
                        })
                    }
                }
            })
        },
    }
})