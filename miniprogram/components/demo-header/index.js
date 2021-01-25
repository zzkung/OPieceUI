const app = getApp()

Component({
  properties: {
    title: String,
    subTitle: String,
    icon: String,
    customFont: {
      type: Boolean,
      value: false
    }
  },

  lifetimes: {
    attached () {
      wx.loadFontFace({
        family: 'CustomFont',
        source: `url("${app.globalData.imghttp}/font/Barlow/Barlow-SemiBoldItalic.ttf")`,
        success() {}
      })
    }
  }
})
