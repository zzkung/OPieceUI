const ci = require('miniprogram-ci')
const inquirer = require('inquirer')

;(async () => {
  let result = await inquirerResult()
  let buildId = randomString()

  const project = new ci.Project({
    appid: 'wxa1afff41f4458cd3',
    type: 'miniProgram',
    projectPath: `${process.env.PWD}/miniprogram`,
    privateKeyPath: './ci-private.key',
    ignores: ['node_modules/**/*'],
  })

  const previewResult = await ci.preview({
    project,
    desc: result.versionDesc, // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true,
    },
    robot: 1,
    qrcodeFormat: 'image',
    qrcodeOutputDest: `${process.env.PWD}/preview-img/preview-${buildId}.png`,
    onProgressUpdate: console.log,
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

  function randomString(e) {  
    e = e || 6;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  }
})()