import {Todo} from '../custom';
import {priorityColorMap,priorityTextMap} from '../constant/priorityColor'
const colors = require('colors')
const inquirer  = require('inquirer')

type actions =  "markAsUndone"|"markAsDone"|"edit"|"remove"

async function askForActionToTask(todo:Todo):Promise<{action:actions}> {
  const color = priorityColorMap[todo.priority]
  const title = `${colors[color](todo.title)} ${colors[color](priorityTextMap[todo.priority])} ${todo.done?colors.yellow("Done"):colors.yellow("Undone")}`
  const gapLine = colors[color]("----------------------------------------------------------------------------------")
  console.log(gapLine)
  console.log(` ${title} \n ${colors.brightWhite(todo.description)}`)
  console.log(gapLine)
  
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select action',
      choices: [
        {name: todo.done?'Mark undone':'Mark done', value: todo.done?'markAsUndone':'markAsDone'},
        {name: 'Edit to do ?', value: 'edit'},
        {name: 'Delete to do ?', value: 'remove'}
      ],
    },
  ])
}

export default askForActionToTask