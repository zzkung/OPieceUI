import Page from '../../common/page'
import paramConfig from '../paramConfig'

Page({

  data: {
    showParam: false,
    params: paramConfig.pv_inputParam,
    paramCheckeds: [0] // 暂时无效
  },
  radioChange (e) {
    console.log(e)
  }
})