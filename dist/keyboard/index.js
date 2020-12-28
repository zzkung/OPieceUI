Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    show: { type: Boolean, value: false }
  },
  methods: {
    close () {
      this.setData({
        show: false
      })
    }
  }
})