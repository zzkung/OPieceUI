export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      console.log('page.js')
      return {
        title: 'OPiece UI 组件库'
      }
    },
    ...options
  })
}