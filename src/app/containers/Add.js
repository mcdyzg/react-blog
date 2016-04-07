import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Editor from 'react-md-editor'
import '../../www/css/mdeditor.css'
import '../../www/css/codemirror.css'
import '../../www/scss/add.scss'
import '../../www/css/mui-github-markdown.css'
// import '../../www/css/github-markdown-css.css'
import marked from 'marked'
import {sendToDb} from '../actions'
import { connect } from 'react-redux'
import TextField from 'material-ui/lib/text-field';
import moment from 'moment'
import Snackbar from 'material-ui/lib/snackbar';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});

// moment.locale('zh-cn')

class Add extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			code:'# mark',
			title:'',
			auth:'',
			intro:'',
			open: false,
			category:'',
		}
	}

	updateCode=(newCode)=> {
		this.setState({
        code: newCode,
    })
	};

	saveCode=()=>{
		const article={
			title:this.state.title,
			content:this.state.code,
			auth:this.state.auth,
			intro:this.state.intro,
			time:moment().format('LLL'),
			category:this.state.category,
		}
		// console.log(article)
		this.props.sendToDb(article,(code)=> {
			if(code=='保存成功'){
				// alert('保存成功')
				this.setState({
					open:true,
				})
			}
		})
	};

	handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    })
  };

  handleintroChange = (event) => {
    this.setState({
      intro: event.target.value,
    })
  };

  handleAuthChange = (event) => {
    this.setState({
      auth: event.target.value,
    })
  };

  handleCategoryChange = (event, index, value) => {
    this.setState({
      category: value,
    })
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

	render() {
		// const {sendToDb}=this.props
		const {category}=this.props
		// console.log(category)
		return (
			<div style={{border:'1px solid #e0e0e0',backgroundColor:'#fff',maxWidth:1200,position:'relative',margin:'30px auto 20px auto'}}> 
				<div className='add-header'>
					<MuiThemeProvider muiTheme={muiTheme}>
						<TextField 
							onChange={this.handleTitleChange}
				      hintText="new blog"
				      multiLine={true}
				      floatingLabelText="请输入标题"
				      style={{marginLeft:20,width:'20%',minWidth:200}}
				    />
			    </MuiThemeProvider>
			    <MuiThemeProvider muiTheme={muiTheme}>
				    <TextField
				    	onChange={this.handleAuthChange}
				      hintText="name"
				      multiLine={true}
				      style={{marginLeft:20,width:'20%',minWidth:200}}
				      floatingLabelText="请输入作者"
				    />
				  </MuiThemeProvider>
				  <MuiThemeProvider muiTheme={muiTheme}>
				    <TextField
				    	onChange={this.handleintroChange}
				      hintText="intro"
				      style={{marginLeft:20,minWidth:'30%'}}
				      multiLine={true}
		     			// rows={2}
				      floatingLabelText="输入博文简介"/>
			    </MuiThemeProvider>
			      <br />
			    <SelectField 
			    	value={this.state.category} 
			    	floatingLabelText="请选择分类"
			    	style={{marginLeft:20,width:'20%',minWidth:200}}
			    	onChange={this.handleCategoryChange}>
			    {
			    	category.map((item)=> {
			    		return <MenuItem key={item._id} value={item.name} primaryText={item.name} />
			    	})
			    }
	        </SelectField>
			  </div>
				<div className='admin'>
					<div  className='admin-editor'>
						<Editor value={this.state.code} onChange={this.updateCode} />
					</div>
					<div className="admin-preview markdown-body" dangerouslySetInnerHTML={{__html:marked(this.state.code) }} />
				</div>
				<div className='admin-save-btn' onClick={this.saveCode}>点击保存</div>
				<Snackbar
          open={this.state.open}
          message="文章已保存"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    category: state.category
  }
}

// const mapDispatchToProps=(dispatch)=> {
// 	return {
// 		onSaveClick:(article)=> {
// 			dispatch(sendToDb(article))
// 		}
// 	}
// }

export default connect(
	mapStateToProps,
  {sendToDb}
)(Add)

