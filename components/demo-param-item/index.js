Component({
  properties: {
    params: {
      type: Array,
      value: []
    }
  },

  externalClasses: ['custom-class'],

  methods: {
    radioChange(e) {
      let value = e.detail.value.split(',')
      this.triggerEvent('radiochange', { value })
    }
  }
});
