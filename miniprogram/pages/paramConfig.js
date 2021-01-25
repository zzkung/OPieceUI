export default {
  vtabsParam: [
    {
      title: '切换方式',
      remark: '',
      items: [
        { name: '左右联动', checked: true },
        { name: '互相独立' }
      ]
    }, {
      title: '提示文字',
      remark: '',
      items: [
        { name: '刷新成功', checked: true },
        { name: '推荐已更新' }
      ]
    }, {
      title: '提示背景颜色',
      remark: '',
      items: [
        { name: '主题色', checked: true },
        { name: '绿色' },
        { name: '橙色' }
      ]
    }
  ],
  pv_inputParam: [
    {
      title: '输入长度',
      remark: '最长支持8个长度',
      items: [
        { name: '4' },
        { name: '5', checked: true },
        { name: '6' }
      ]
    }, {
      title: '初始值',
      remark: '',
      items: [
        { name: '空', checked: true },
        { name: '23' },
        { name: '789' }
      ]
    }
  ]
}