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
      this.keyboardInit(value)
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
    keyboardArray: [],
    cartPlateType: 'chinese', // chinese, letter
    inputValue: ''
  },
  ready () {
    this.init()
  },
  methods: {
    init () {
      this.keyboardInit(this.data.keyboardType)
    },
    keyboardInit (value) {
      switch (value) {
        case 'cartPlate':
          this.setData({
            keyboardArray: KEYBOARD_TYPE.cartPlate
          })
          break;
      
        default:
          break;
      }
    },
    handleInput (e) {
      let value = e.currentTarget.dataset.value
      let { inputValue } = this.data
      this.setData({
        inputValue: inputValue + value
      })
      console.log(this.data.inputValue)
    },
    handleSwitchKeyboard () {
      let { cartPlateType } = this.data
      this.setData({
        keyboardArray: cartPlateType == 'chinese' ? KEYBOARD_TYPE.english : KEYBOARD_TYPE.cartPlate
      }, () => {
        this.setData({
          cartPlateType: cartPlateType == 'chinese' ? 'letter' : 'chinese'
        })
      })
    },
    close (e) {
      let type = e.currentTarget.dataset.type
      this.setData({
        show: false
      })
      this.triggerEvent('close', type)
    }
  }
})