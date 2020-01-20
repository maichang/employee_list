import EmployeeManager from './employeeManager'

const readlineSync = require('readline-sync')
const moment = require('moment')
const employee = new EmployeeManager()

const register = () => {
  // start
  console.log('＊登録します。')

  // input name
  let name = ''
  while (true) {
    const inputName = readlineSync.question('名前 ＞')
    if (inputName) {
      name = inputName
      break
    }
    console.log('＊名前を必ず入力してください。')
  }

  // input birthday
  let birthday = ''
  while (true) {
    const inputBirthday = readlineSync.question('誕生日 ＞')
    // 正規表現
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
    const match = inputBirthday.match(regex)

    // 不正な日付チェック
    const valid = moment(inputBirthday).isValid()
    const age = moment().diff(inputBirthday, 'years')

    // requiredチェック
    if (!inputBirthday) { // 空白をチェック
      console.log('＊入力必須です。')
      continue
    } else if (!match) { // regexチェック
      console.log('＊正しく入力してください。 e.g. 1999-07-21')
      continue
    } else if (!valid) { // うるう年とかはじく
      console.log('＊不正な日付です。')
      continue
    } else if ((age + 1) < 15) { // 年齢チェック
      console.log('＊15歳未満は登録できません。')
      continue
    }
    const formatCheck = moment(inputBirthday).format('YYYY-MM-DD')
    birthday = formatCheck
    break
  }

  // input salary
  let salary = ''
  while (true) {
    const inputSalary = readlineSync.question('給与 ＞')
    const toInt = (typeof inputSalary !== 'number') ? parseInt(inputSalary, 10) : inputSalary // 数値に変換

    if (!toInt) { // 空白チェック
      console.log('＊入力必須です。')
      continue
    } else if (Math.sign(toInt) === -1) { // マイナスチェック
      console.log('＊マイナスの金額は入力できません。')
      continue
    }
    salary = toInt.toLocaleString() // カンマ区切りで表示
    break
  }
  employee.addEmployee(name, birthday, salary)
}

// メニュー表示
selectionMenu: while (true) {
  const menus = ['==メニュー==', '1. 登録', '2. 一覧', '3. 削除', '4. おわり', '===========']
  menus.forEach(menu => console.log(menu))

  const input = readlineSync.question('選択してください。＞')
  switch (input) {
    case '1':
      register()
      break
    case '2':
      employee.allEmployee()
      break
    case '3':
      const targetId = readlineSync.question('IDを入力してください。＞')
      employee.deleteEmployee(targetId)
      break
    case '4':
      break selectionMenu
  }
}
