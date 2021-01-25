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
    layout: { type: String, value: 'grid' }, // grid: 网格，box: 方框，inline: 中划线，underline: 下划线
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