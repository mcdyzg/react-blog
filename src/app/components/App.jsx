import React from 'react'
import { QueueAnim } from 'antd'
import Header from './Header'
import Events from 'material-ui/lib/utils/events'
import { Styles } from 'material-ui/lib/utils/'
import AppLeftNav from '../containers/AppLeftNav.js'
import '../../www/scss/style.scss'
import '../../www/css/通用css.css'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';


const Sizes={
	SMALL:1,
	MEDIUM:2,
	LARGE:3,
}

const muiTheme = getMuiTheme({
  fontFamily:'Microsoft Yahei',
});


export default class App extends React.Component {

	constructor(props,context) {
		super(props,context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state={
			leftNavOpen: false,
			AppLeftNavWidth:256,
      AppLeftNavHeight:180,
			deviceSize:Sizes.SMALL,
			color:'#303F9F',
			// #303F9F
			// #F57C00
			// #4285F4
		}
	}

	getChildContext() {
		return {
			color:this.state.color,
			title:
				this.context.router.isActive('/app')?'blog':
        this.context.router.isActive('/admin')?'Admin后台':'blog',
      size:this.state.deviceSize,
		}
	}

	// 需要引用的context声明
  static contextTypes = {
    router: React.PropTypes.object, 
  };

  // 给children的context声明
  static childContextTypes={
  	color:React.PropTypes.string,
  	title:React.PropTypes.string,
  	size:React.PropTypes.number,
  }

  componentDidMount() {
    this._updateDeviceSize();
    if (!this.manuallyBindResize) this._bindResize();
  }

  componentWillUnmount() {
    this._unbindResize();
  }

  isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  }

  _updateDeviceSize = () => {
    const width = window.innerWidth;

    if (width >= 992) {
      this.setState({ 
        deviceSize: Sizes.LARGE,
      });
    } else if (width >= 768) {
      this.setState({ 
        deviceSize: Sizes.MEDIUM,
      });
    } else { // width < 768
      this.setState({ 
        deviceSize: Sizes.SMALL,
      });
    }
  };

  _bindResize = () => {
    Events.on(window, 'resize', this._updateDeviceSize);
  };

  _unbindResize = () => {
    Events.off(window, 'resize', this._updateDeviceSize);
  };

  handleTouchTapLeftIconButton = () => {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
  };

  handleChangeRequestLeftNav = (open) => {
    this.setState({
      leftNavOpen: open,
    });
  };

  handleRequestChangeList = (event, value) =>{
    this.context.router.push(value);
    this.setState({
      leftNavOpen: false,
    });
  };

  handleTouchTapRight=(color)=> {
  	this.setState({
  		color:color,
  	})
  }


  getStyles() {
  	const style={
  		AppLeftNav:{
  			width:this.state.AppLeftNavWidth,
  		},
  		header:{
  			marginLeft:0,
        height:this.state.AppLeftNavHeight,
  		},
  		content:{
  			// padding:24,
  			marginTop:this.state.AppLeftNavHeight,
  			minHeight:400,
  			position:'relative',
  			backgroundColor:'#EEEEEE',
  		},
  		contentWhenMedium:{
  			padding:48,
  		},
  	}
    // if(this.isDeviceSize(Sizes.LARGE)||this.isDeviceSize(Sizes.MEDIUM)){

      // style.content=Styles.mergeStyles(style.content,style.contentWhenMedium)

      style.header.boxShadow=' 0 3px 10px rgba(0,0,0,0.16), 0 3px 10px rgba(0,0,0,0.23)'
    // }
    return style
  }

	render() {
		let docked=false

		let {leftNavOpen}=this.state

		const style=this.getStyles()

		const title=
			this.context.router.isActive('/app')?'blog':
      this.context.router.isActive('/admin')?'Admin后台':'blog'

    let showMenuIconButton=true

    // if(this.isDeviceSize(Sizes.LARGE)) {
    // 	docked=true,
    // 	leftNavOpen=true,
    // 	style.header.marginLeft=this.state.AppLeftNavWidth
    //   showMenuIconButton=false
    //   style.content.marginLeft=this.state.AppLeftNavWidth
    // }

		return (
			<div>
        <MuiThemeProvider muiTheme={muiTheme}>
  				<Header
  					style={style.header}
  					onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            showMenuIconButton={showMenuIconButton}
            handleTouchTapRight={this.handleTouchTapRight}
            title={title} />
        </MuiThemeProvider>
				<div style={style.content}>
					<div style={{position:'relative'}}>
						<QueueAnim type={['right', 'left']}  style={{overflow:'hidden'}}>
							{React.cloneElement(this.props.children,{key:this.props.location.pathname})}
						</QueueAnim>
					</div>
				</div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppLeftNav
            height={this.state.AppLeftNavHeight}
            width={style.AppLeftNav.width}
            docked={docked}
            open={leftNavOpen}
            onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
            onRequestChangeList={this.handleRequestChangeList}
          />
        </MuiThemeProvider>
			</div>
			)
	}
}
