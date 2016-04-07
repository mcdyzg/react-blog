

const categoryList=(state={}, action)=> {
  switch (action.type) {
    case 'RECEIVE_CATEGORYARTICLELIST':
    	state[action.articleList[0].category]=action.articleList
      return Object.assign({},state)
    default:
      return state
  }
}



export default categoryList
