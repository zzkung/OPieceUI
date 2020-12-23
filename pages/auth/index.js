import auth from './auth'

Page({

  data: {

  },

  onLoad: function (options) {
    auth.getPermission({
      name: 'writePhotosAlbum'
    })
  }
})