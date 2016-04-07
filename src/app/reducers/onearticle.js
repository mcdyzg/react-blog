

const onearticle=(state=[], action)=> {
  switch (action.type) {
    case 'RECEIVE_ONEARTICLE':
      return action.onearticle
    default:
      return state
  }
}



export default onearticle
