

const article=(state=[], action)=> {
  switch (action.type) {
    case 'RECEIVE_ARTICLE':
      return action.article
    case 'REMOVE_ARTICLE':
      return []
    default:
      return state
  }
}



export default article
