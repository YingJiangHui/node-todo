export {}
import {Todo} from '../custom';
const showTodoList = require('../view/showTodoList.ts');
const editTodo = require('../view/editTodo.ts');
// const askForAction = require('../view/askForAction.ts')
import askForAction from '../view/askForAction'
const db = require("../../db.js");
require('colors')
const {add} = require('../../function/add.js')

function markAsDone(list:Todo[], index:number) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list:Todo[], index:number) {
  list[index].done = false
  db.write(list)
}

async function edit (list:Todo[], index:number) {
  const answer = await editTodo()
  list[index] = {...list[index],...answer}
  await db.write(list)
}

async function remove(list:Todo[], index:number) {
  list.splice(index, 1)
  await db.write(list)
}

const actionMap = {
  markAsDone,
  markAsUndone,
  edit,
  remove
}

async function choiceAction(todoList:Todo[], index:number) {
  const answer = await askForAction(todoList[index])
  const action = actionMap[answer.action]
  action?.(todoList, index)
}


type Options = {
  done:boolean,
  undone:boolean
}

const show = async (opts:Options) => {
  const data:Todo[] = await db.read()
  //通过选项过滤展示的Todo
  const todoList = (opts.done&&opts.undone)||(!opts.done&&!opts.undone)? data:opts.done?data.filter(item=>item.done):data.filter(item=>!item.done)
  const answer = await showTodoList(todoList)
  const index = parseInt(answer.index)
  if (index >= 0) {
    await choiceAction(todoList, index)
  } else if (index === -2) {
    add()
  }
}

module.exports = show