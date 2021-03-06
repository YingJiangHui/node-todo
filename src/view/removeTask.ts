const inquirer = require('inquirer')
import {Todo} from '../custom';

async function confirmRemoveTodo (todoList:Todo[]){
  return inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'choices',
      message: () => {
        return "confirm delete to do --> " + todoList.map(item => item.title).join(' | ')
      },
    },
  ])
}
async function chooseRemoveTodos (todoList:Todo[]):Promise<{select:string[]}>{
  return inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'select',
      message: 'remove todo/todos ？',
      choices: [...todoList.map((item, index) => {
        return {
          name: `${index+1}. ${item.title}`,
          value: index.toString()
        }
      })],
    },
  ])
}

export {confirmRemoveTodo,chooseRemoveTodos}