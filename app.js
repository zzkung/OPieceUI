const cEnv = require('common/env.js')

App({
  onLaunch: function () {
    
  },

  globalData: {
    env: cEnv.env,
    imghost: cEnv.imghost,
    imghttp: cEnv.imghttp
  }
})