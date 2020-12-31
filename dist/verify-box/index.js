Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  observers: {
    'value': function (value) {
      this.setData({
        cursorIndex: value.length
      })
    }
  },
  properties: {
    length: { type: Number, value: 4, optionalTypes: [Number, String] },
    enableSystemKeyboard: { type: Boolean, value: false },
    cursorIndex: { type: Number, value: 0 }, // 光标位置
    value: String
  },
  methods: {
    handleFocus (e) {
      let { index } = e.currentTarget.dataset
      this.triggerEvent('focus', { index })
    }
  }
})