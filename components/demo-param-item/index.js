Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    params: {
      type: Array,
      value: []
    }
  },

  methods: {
    radioChange(e) {
      let value = e.detail.value.split('').map(Number)
      this.triggerEvent('radiochange', { value })
    }
  }
})
