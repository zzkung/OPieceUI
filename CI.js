const ci = require('miniprogram-ci')
const inquirer = require('inquirer')

;(async () => {
  let result = await inquirerResult()
  console.log(result)

  const project = new ci.Project({
    appid: 'wxa1afff41f4458cd3',
    type: 'miniProgram',
    projectPath: 'F:/CAREER/OPieceUI/miniprogram',
    privateKeyPath: './ci-private.key',
    ignores: ['node_modules/**/*'],
  })
  const previewResult = await ci.preview({
    project,
    desc: result.versionDesc, // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: './qrcode/destination.jpg',
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)
  
  function inquirerResult() {
    return inquirer.prompt([
      { // 设置版本号
        type: 'input',
        name: 'version',
        message: '设置预览的版本号:'
      }, { // 设置描述
        type: 'input',
        name: 'versionDesc',
        message: '写一个简单的介绍来描述这个版本的改动过:'
      }
    ])
  }
})()