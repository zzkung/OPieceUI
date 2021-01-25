const app = getApp()
var _url = '/json/getData'
export function requstGet(data) {
  _url = '/json/getData'
  return requst('GET', data)
}

export function requstPost(data) {
  _url = '/json/getData'
  return requst('POST', data)
}

export function requstGetBus(data) {
  _url = "/bus/getFunc"
  return requst('GET', data)
}

export function requstPostBus(data) {
  _url = "/bus/getFunc"
  return requst('POST', data)
}

//封装Request请求方法
function requst(method, data = {}) {
  // console.log('请求地址', app.globalData.urlhost + _url)
  // console.log('请求数据', data)
  //data.method = method
  return new Promise((resove, reject) => {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.urlhost + _url,
      data: data,
      header: {},
      method: method.toUpperCase(),
      success: function(res) {
        wx.hideNavigationBarLoading()
        resove(res.data)
      },
      fail: function(msg) {
        console.error('reqest error', msg)
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.getNetworkType({ // 获取网络状态
          success (res) {
            const networkType = res.networkType
            if (networkType == 'none') {
              wx.showToast({
                title: '没有网络连接',
                icon: 'none'
              })
            } else if (networkType != 'none' && msg.errMsg == 'request:fail ') {
              wx.showToast({
                title: '请求失败',
                icon: 'none'
              })
            } else if (networkType != 'none' && msg.errMsg == 'request:fail timeout') {
              wx.showToast({
                title: '请求超时',
                icon: 'none'
              })
            }
            reject('fail')
          }
        })
      }
    })
  })
}