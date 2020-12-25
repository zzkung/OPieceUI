Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    showParam: { type: Boolean, value: false },
    params: { type:Object, value: null }
  },
  methods: {
    radioChange (e) {
      let value = e.detail.value
      this.triggerEvent('radiochange', { value })
    }
  }
})
