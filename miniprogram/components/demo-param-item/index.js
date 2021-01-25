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

  ready () {
    this.paramInit()
  },

  methods: {
    paramInit () {
      let { params } = this.data
      let paramCheckeds = []
      params.forEach((item, index) => {
        item.items.forEach((citem, cindex) => {
          if (!citem.checked) return
          paramCheckeds[index] = cindex
        })
      })
      this.triggerEvent('paraminit', { value: paramCheckeds })
    },
    radioChange(e) {
      let value = e.detail.value.split('').map(Number)
      this.triggerEvent('radiochange', { value })
    }
  }
})
