Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    show: { type: Boolean, value: false },
    title: { type: String, value: '' },
    zIndex: { type: Number, value: 5000, optionalTypes: [Number, String] },
    closeButtonText: { type: String, value: '' },
    closeButtonPosition: { type: String, value: 'right' },
    borderLine: { type: Boolean, value: true }
  },
  methods: {
    close () {
      this.setData({
        show: false
      })
    }
  }
})