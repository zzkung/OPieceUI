import Page from '../../common/page'
import paramConfig from '../paramConfig'

Page({

  data: {
    showParam: false,
    params: paramConfig.pv_inputParam,
    paramCheckeds: [0],
    showKeyboard: false,
    verifyValue: '',
    cursorIndex: 0
  },
  verifyFocus (e) {
    let { index } = e.detail
    this.setData({
      showKeyboard: true,
      cursorIndex: index
    })
  },
  keyboardInput (e) {
    let { verifyValue } = this.data
    let { value } = e.detail
    this.setData({
      verifyValue: verifyValue + value
    })
  },
  keyboardBackspace () {
    let { verifyValue } = this.data
    this.setData({
      verifyValue: verifyValue.substring(0, verifyValue.length - 1)
    })
  },
  radioChange (e) {
    console.log(e)
  }
})