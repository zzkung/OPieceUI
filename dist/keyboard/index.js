import keyboardType from './config'

let KEYBOARD_TYPE = {
  digit: keyboardType.digitKeyboard,
  english: keyboardType.englishKeyboard,
  cartPlate: keyboardType.cartPlateKeyboard
}

Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  observers: {
    'keyboardType': function (value) {
      // this.
    }
  },
  properties: {
    show: { type: Boolean, value: false },
    title: { type: String, value: '' },
    closeButtonText: { type: String, value: '' },
    closeButtonPosition: { type: String, value: 'right' },
    borderLine: { type: Boolean, value: true },
    keyboardType: { type: String, value: 'digit' },
    zIndex: { type: Number, value: 5000, optionalTypes: [Number, String] }
  },
  data: {
    keyboardArray: []
  },
  methods: {
    close () {
      this.setData({
        show: false
      })
    }
  }
})