import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {addCategory,deleteCategory} from '../actions'
import {connect} from 'react-redux'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});


class Category extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			category:'',
		}
	}

	saveCategory=()=> {
		// alert(this.state.category)
		if(this.state.category!==''){
			this.props.addCategory(this.state.category,(res)=> { alert(res)})
		}
		this.setState({category:''})
	};

	deleteCate=(_id)=> {
		this.props.deleteCategory(_id)
	};

	render() {
		const {category}=this.props
		// console.log(category)
		return (
			<div  className='category-setting' style={{boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',margin:'35px auto 20px auto',maxWidth:1000,backgroundColor:'#fff',padding:'0 20px 20px 20px'}}>
				<MuiThemeProvider muiTheme={muiTheme}>
					<TextField
			      hintText="分类名称"
			      floatingLabelText="添加新分类"
			      value={this.state.category}
			      onChange={ e=> this.setState({category:e.target.value})}
			    />
		    </MuiThemeProvider>
		    <br />
		    <MuiThemeProvider muiTheme={muiTheme}>
		    	<RaisedButton label="保存分类" primary={true} onClick={this.saveCategory} />
		    </MuiThemeProvider>
				<div style={{marginTop:20}}>
					<span style={{color:'#A2A1A1'}}>已有分类：</span><br />
					{
						category.map((item)=> {
							return <div 
							key={item._id}
							style={{display:'inline-block',margin:'10px 10px 0 0'}}>
							<MuiThemeProvider muiTheme={muiTheme}>
								<RaisedButton 
									onClick={this.deleteCate.bind(this,item._id)}
									label={item.name} 
									secondary={true} 
									key={item._id}>
									<NavigationClose
										color='#fff'
										style={{float:'right',marginTop:6,marginRight:2}} />
									</RaisedButton>
								</MuiThemeProvider>
							</div>
						})
					}
				</div>
			</div>
			)
	}
}

function mapStateToProps(state) {
  return {
    category: state.category
  }
}

export default connect(
	mapStateToProps,
	{ addCategory , deleteCategory }
	)(Category)


