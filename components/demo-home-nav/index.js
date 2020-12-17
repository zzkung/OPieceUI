Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    group: Object
  },

  methods: {
    onClick(event) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      });
    }
  }
});
