function getPermission ({ name = '' } = {}) {
  return new Promise((resove, reject) => {
    if (name == '') {
      console.error('要获取的权限名必填')
      reject()
    } else {
      wx.getSetting({ // 获取用户授权状态
        success(res) {
          let authSetting = res.authSetting
          if (authSetting[`scope.${name}`]) {
            console.log('用户已同意授权,进行下一步')
            resove()
          } else if (authSetting[`scope.address.${name}`] === undefined) {
            console.log('初始未授权')
            wx.authorize({
              scope: `scope.${name}`,
              success(res) {
                console.log('授权了', res)
                resove()
              },
              fail(err) {
                console.error('还没有授权', err)
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting[`scope.${name}`]) {
                      wx.showToast({
                        title: '授权成功'
                      })
                      resove()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'error'
                      })
                      console.error('Failed to get permission: 获取权限失败')
                      reject()
                    }
                  }
                })
              }
            })
          } else {
            wx.openSetting({
              success: function (res) {
                if (res.authSetting[`scope.${name}`]) {
                  wx.showToast({
                    title: '授权成功'
                  })
                  resove()
                } else {
                  wx.showToast({
                    title: '授权失败',
                    icon: 'error'
                  })
                  console.error('Failed to get permission: 获取权限失败')
                  reject()
                }
              }
            })
          }
        }
      })
    }
  })
}

module.exports = {
  getPermission
}