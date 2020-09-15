const file = {
  head: 'file',
  list: ['New', 'Open', 'Save', 'Reset', 'Save Product Image'],
}
const help = { head: 'help', list: ['About', 'Help'] }

export const items = [file, help]

export const listItemFunctions = (listItem, action) => {
  switch (listItem) {
    case 'New':
      console.log('new')
      break
    case 'Open':
      console.log('open')
      break
    case 'Save':
      console.log('save')
      break
    case 'Reset':
      console.log('reset')
      break
    case 'Save Product Image':
      console.log('save product image')
      break
    case 'About':
      action(true)
      console.log('about')
      break
    case 'Help':
      console.log('help')
      break
    default:
      break
  }
}

// export default { file, help }
