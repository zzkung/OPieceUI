const app = getApp()
/**
 * API 接口统一配置
 */

let MAIN_DOMAIN = app.globalData.url // 主域名
let SUB_DOMAIN = 'https://api.github.com' // 辅助域名

function request(url, method = 'GET', data = {}) {
  wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method.toUpperCase(),
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        wx.hideNavigationBarLoading()
        resolve(res)
      },
      fail(err) {
        wx.hideNavigationBarLoading()
        console.error(err)
        reject('fail')
      }
    })
  })
}

module.exports = {
  request,
  getGitUserList: data => request(`${SUB_DOMAIN}/users`, data),
  getGitUserInfo: (param = '', data) => request(`${SUB_DOMAIN}/users${param}`, data),
}