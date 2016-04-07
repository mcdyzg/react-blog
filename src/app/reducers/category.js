

const category=(state=[], action)=> {
  switch (action.type) {
    case 'RECEIVE_CATEGORY':
      return action.category
    default:
      return state
  }
}



export default category
