export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      console.log('page.js')
      return {
        title: 'jMeiiUI 组件库'
      }
    },
    ...options
  })
}