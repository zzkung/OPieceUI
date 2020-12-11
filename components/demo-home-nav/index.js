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
        url: event.target.dataset.url
      });
    }
  }
});
