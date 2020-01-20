import Employee from "./employee"

export default class EmployeeManager {
  constructor() {
    this.employees = [] // 社員を管理する配列
    this.nextId = 1
  }

  addEmployee(name, birthday, salary) {
    const employee = new Employee (this.nextId, name, birthday, salary) // nextId, name, birthday, salaryを使ってEmployeeを作る
    this.employees.push(employee)
    this.nextId++ // IDが重複しないようにするため増やしていく
  }
  allEmployee() {
    console.log('▼ 一覧')
    console.log('id name birthday saraly')
    this.employees.forEach(n => {
      console.log(`${n.id} ${n.name} ${n.birthday} ${n.salary}`)
    })
  }
  deleteEmployee(targetId) {
    const id = (typeof targetId !== 'number') ? parseInt(targetId, 10) : targetId
    this.employees = this.employees.filter(n => n.id !== id)

    console.log('削除しました！')
    this.allEmployee()
  }
}
