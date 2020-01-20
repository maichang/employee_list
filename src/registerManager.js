const readlineSync = require('readline-sync')
const moment = require('moment')

const MAX_SALARY = 1000000

export default class Register {
  _inputName() { // input name
    let name = null
    console.log('＊登録します。')
    while (true) {
      const inputName = readlineSync.question('名前 ＞')
      if (inputName) {
        name = inputName
        break
      }
      console.log('＊名前を必ず入力してください。')
    }
    return name
  }
  _inputBirthday() { // input birthday
    let birthday = null
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
      }
      if (!match) { // regexチェック
        console.log('＊正しく入力してください。 e.g. 1999-07-21')
        continue
      }
      if (!valid) { // うるう年とかはじく
        console.log('＊不正な日付です。')
        continue
      }
      if ((age + 1) < 15) { // 年齢チェック
        console.log('＊15歳未満は登録できません。')
        continue
      }
      const formatCheck = moment(inputBirthday).format('YYYY-MM-DD')
      birthday = formatCheck
      break
    }
    return birthday
  }
  _inputSalary() { // input salary
    let salary = null
    while (true) {
      const inputSalary = readlineSync.question('給与 ＞')
      if (!inputSalary) { // 空白チェック
        console.log('＊入力必須です。')
        continue
      }
      const toInt = parseInt(inputSalary, 10) // 数値に変換
      if (!toInt) {
        console.log('＊数値で入力してください。')
        continue
      }
      if (Math.sign(toInt) === -1) { // マイナスチェック
        console.log('＊マイナスの金額は入力できません。')
        continue
      }
      if (toInt > MAX_SALARY) {
        console.log('sss')
        continue
      }
      salary = toInt
      break
    }
    return salary
  }
  register() {
    const name = this._inputName()
    const birthday = this._inputBirthday()
    const salary = this._inputSalary()
    return {
      name,
      birthday,
      salary
    }
  }
}
