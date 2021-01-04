import Page from '../../common/page'
import paramConfig from '../paramConfig'

Page({

  data: {
    showParam: false,
    params: paramConfig.pv_inputParam,
    paramCheckeds: [],
    showKeyboard: false,
    verifyValue: ''
  },
  verifyFocus () {
    this.setData({
      showKeyboard: true
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
  paramInit (e) {
    let { params } = this.data
    let { value } = e.detail
    let verifyValue = params[1].items[value[1]].name
    this.setData({
      paramCheckeds: value,
      verifyValue: verifyValue == '空' ? '' : verifyValue
    })
  },
  radioChange (e) {
    console.log(e)
    let { value } = e.detail
    let { paramCheckeds } = this.data
    paramCheckeds[value[0]] = value[1]
    if (value[0] == 1) {
      // **********************
      // 设置初始值
    }
    this.setData({
      paramCheckeds
    })
  }
})