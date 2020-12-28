Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    length: { type: Number, value: 4, optionalTypes: [Number, String] },
    defaultValue: { type: String, value: '334' },
    enableSystemKeyboard: { type: Boolean, value: false }
  },
  methods: {
    
  }
})