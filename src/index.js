import EmployeeManager from './employeeManager'
import Register from './registerManager'

const readlineSync = require('readline-sync')
const register = new Register()
const employeeManager = new EmployeeManager()

const REGISTER_NUMBER = ['1', '2', '3', '4']

// メニュー表示
selectionMenu: while (true) {
  const menus = ['==メニュー==', '1. 登録', '2. 一覧', '3. 削除', '4. おわり', '===========']
  menus.forEach(menu => console.log(menu))

  const input = readlineSync.question('選択してください。＞')
  switch (input) {
    case REGISTER_NUMBER[0]:
      const data = register.register()
      employeeManager.addEmployee(data.name, data.birthday, data.salary)
      break
    case REGISTER_NUMBER[1]:
      employeeManager.allEmployee()
      break
    case REGISTER_NUMBER[2]:
      const targetId = readlineSync.question('IDを入力してください。＞')
      employeeManager.deleteEmployee(targetId)
      break
    case REGISTER_NUMBER[3]:
      break selectionMenu
  }
}
