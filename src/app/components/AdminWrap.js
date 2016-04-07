import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import {Link} from 'react-router'
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});


export default class AdminWrap extends React.Component {
	constructor(props,context) {
		super(props,context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {open: false}
	}

	static contextTypes = {
    router: React.PropTypes.object, 
  };

  handleToggle = () => this.setState({open: !this.state.open});

	goBack=()=> {
		this.context.router.goBack()
	};

	goHome=()=> {
		this.context.router.push('/admin/')
	}

	render() {
		return (
			<div>
				<MuiThemeProvider muiTheme={muiTheme}>
					<AppBar
				    title="Admin"
				    onTitleTouchTap={this.goHome}
				    titleStyle={{cursor:'pointer'}}
				    iconElementRight={<Link to='/'><FlatButton style={{color:'#fff'}} label="博客" /></Link>}
				    // showMenuIconButton={false}
				    onLeftIconButtonTouchTap={this.handleToggle} 
				  />
			  </MuiThemeProvider>
			  <MuiThemeProvider muiTheme={muiTheme}>
				  <LeftNav
	          docked={false}
	          width={200}
	          open={this.state.open}
	          onRequestChange={open => this.setState({open})}
	        >
	        	<AppBar
					    title="控制面板"
					    titleStyle={{cursor:'pointer',fontSize:'20px'}}
					    showMenuIconButton={false}
					  />
					  <Link to='/admin/'>
	        		<MenuItem>博文列表</MenuItem>
	        	</Link>
	        	<Link to='/admin/category'>
	        		<MenuItem>修改分类</MenuItem>
	        	</Link>
	        	<Link to='/admin/add'>
	        		<MenuItem>添加文章</MenuItem>
	        	</Link>
	        	<Link to='/'>
	        		<MenuItem>返回前台</MenuItem>
	        	</Link>
	        </LeftNav>
        </MuiThemeProvider>
			  <div style={{padding:'15px',backgroundColor:'#efefef'}}>
			 		{React.cloneElement(this.props.children,{key:this.props.location.pathname})}
			  </div>
			</div>
			)
	}
}

