import request from 'superagent'


function receiveArticle(article) {
  return {
    type: 'RECEIVE_ARTICLE',
    article: article
  }
}


export const getAllArticle=()=> {
	return dispatch=> {

		request
      .get('http://localhost:3004/find')
      .set('Accept', 'application/json')
      .end(function(err, res){
        dispatch(receiveArticle(res.body))
      });
	}
}

export const sendToDb=(article,cb)=> {
	return dispatch=> {

		request.post('http://localhost:3004/add')
        // .set('Accept', 'application/json')
        .query({ 
          title: article.title, 
          content: article.content,
          intro:article.intro,
          auth:article.auth,
          time:article.time,
          category:article.category,
        })
        .end(function(err,res){
          // alert(res)
          // console.log(res.status)
          if(res.status==200){
          	cb('保存成功')
            dispatch(getAllArticle())
          }
        })

    
	}
}


export const remove=(cb)=> {
	return dispatch=> {
		request
      .get('http://localhost:3004/remove')
      .end(function(err, res){
      		if(res.status==200) {
      			cb('已删除')
      		}
      })
    dispatch(removeArticle())
	}
}


const removeArticle=()=> {
  return {
    type: 'REMOVE_ARTICLE',
  }
}


export const findonearticle=(_id)=> {
  return (dispatch,getState)=> {
    getState().article.map((item)=> {
      if(item._id==_id) {
        // console.log(_id)
        dispatch(receiveonearticle(item))
      }
    })
  }
}


const receiveonearticle=(item)=> {
  return {
    type:'RECEIVE_ONEARTICLE',
    onearticle:item,
  }
}


export const addCategory=(name,cb)=> {
  return dispatch=> {

    request.get('http://localhost:3004/addcategory')
        // .set('Accept', 'application/json')
        .query({ name:name})
        .end(function(err,res){
          if(err) {
            return
          }
          if(res.status==200){
            cb('发送成功')
            dispatch(getAllCategory())
          }
        })
  }
}



function receiveCategory(category) {
  return {
    type: 'RECEIVE_CATEGORY',
    category: category
  }
}


export const getAllCategory=()=> {
  return dispatch=> {
    request
      .get('http://localhost:3004/findcate')
      // .send({ name: 'Manny', species: 'cat' })
      // .set('X-API-Key', 'foobar')
      .set('Accept', 'application/json')
      .end(function(err, res){
        dispatch(receiveCategory(res.body))
      });
  }
}


export const deleteCategory=(id,cb)=> {
  return dispatch=> {

      request
      .get('http://localhost:3004/deletecategory')
      .query({ _id:id})
      .end(function(err, res){
        if(err) {
          return 
        }
        if(res.status==200) {
          dispatch(getAllCategory())
        }
      });
  }
}




export const findcategoryarticlelist=(name)=> {
  return dispatch=> {
    request
      .get('http://localhost:3004/findcategoryarticlelist')
      .query({ name:name})
      .end(function(err, res){
        // console.log(res.body)
        dispatch(receiveCategoryArticleList(res.body))
      });
  }
}

function receiveCategoryArticleList(articleList) {
  return {
    type: 'RECEIVE_CATEGORYARTICLELIST',
    articleList: articleList
  }
}

