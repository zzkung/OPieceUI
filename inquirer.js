const inquirer = require('inquirer')

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

async function init() {
  let result = await inquirerResult()
  console.log(result)
}

init()