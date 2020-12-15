export default function(options = {}) {
  return Page({
    showScreenDialog() {
      this.setData({
        showParam: true
      })
    },
    onShareAppMessage() {
      console.log('page.js')
      return {
        title: 'OPiece UI 组件库'
      }
    },
    ...options
  })
}