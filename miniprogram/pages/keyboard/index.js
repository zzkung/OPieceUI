import Page from '../../common/page'

Page({

  data: {
    showKeyboard: false
  },
  handleKeyboard () {
    this.setData({
      showKeyboard: true
    })
  }
})