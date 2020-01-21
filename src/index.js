import EmployeeManager from './employeeManager'
import Register from './registerManager'

const readlineSync = require('readline-sync')
const register = new Register()
const employeeManager = new EmployeeManager()

const REGISTRATION = '1'
const SHOW_LIST = '2'
const DELETE = '3'
const END = '4'

// メニュー表示
selectionMenu: while (true) {
  const menus = ['==メニュー==', '1. 登録', '2. 一覧', '3. 削除', '4. おわり', '===========']
  menus.forEach(menu => console.log(menu))

  const input = readlineSync.question('選択してください。＞')
  switch (input) {
    case REGISTRATION:
      const data = register.register()
      employeeManager.addEmployee(data.name, data.birthday, data.salary)
      break
    case SHOW_LIST:
      employeeManager.allEmployee()
      break
    case DELETE:
      const targetId = readlineSync.question('IDを入力してください。＞')
      employeeManager.deleteEmployee(targetId)
      break
    case END:
      break selectionMenu
  }
}
