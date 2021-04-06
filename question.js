/**
 * @description  用户输入信息
 */
 module.exports = [
  {
    type: 'confirm',
    name: 'private',
    message: 'This is a private registry?'
  },
  {
    type: 'input',
    name: 'author',
    message: "what's your author name"
  },
  {
    type: 'input',
    name: 'description',
    message: "what's your description"
  },
  {
    type: 'list',
    choices: ['MIT', 'apache-2.0'],
    name: 'license',
    message: "what's your description"
  }
]
