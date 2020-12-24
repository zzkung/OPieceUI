const cEnv = require('common/env.js')
const cont = require('utils/console.js')

App({
  onLaunch: function () {
    cont.consoleLogo()
  },

  globalData: {
    env: cEnv.env,
    url: cEnv.host,
    imghost: cEnv.imghost,
    imghttp: cEnv.imghttp
  }
})