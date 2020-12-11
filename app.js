const cEnv = require('common/env.js')
const cont = require('utils/console.js')

App({
  onLaunch: function () {
    cont.consoleLogo()
  },

  globalData: {
    env: cEnv.env,
    imghost: cEnv.imghost,
    imghttp: cEnv.imghttp
  }
})