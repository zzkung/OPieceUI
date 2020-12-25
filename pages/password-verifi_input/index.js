import Page from '../../common/page'
import paramConfig from '../paramConfig'

Page({

  data: {
    showParam: false,
    params: paramConfig.pv_inputParam,
    paramCheckeds: [0]
  },
  radioChange (e) {
    console.log(e)
  }
})