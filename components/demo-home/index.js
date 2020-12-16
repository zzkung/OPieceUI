import list from '../../config'
const app = getApp()

Component({
  data: {
    list,
    imghttp: app.globalData.imghttp
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
});
