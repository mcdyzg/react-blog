import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
// import Styles from 'material-ui/lib/utils/styles';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import '../../www/scss/Header.scss'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Menu from 'material-ui/lib/svg-icons/navigation/menu';
import a from '../../www/img/16.jpg'
import {Link} from 'react-router'

class Header extends React.Component {
  constructor(props,context) {
    super(props,context)
  }

  static contextTypes={
    color:React.PropTypes.string,
    title:React.PropTypes.string,
    router:React.PropTypes.object,
  }

  handleTouchTap=(e,child)=> {
    this.props.handleTouchTapRight(child.props.value)
  }

  render() {
    const {
      style,
      onLeftIconButtonTouchTap,
      showMenuIconButton,
      title,
      handleTouchTapRight,
    } = this.props;


    return (
      <header style={style} className='header_wrap'>
        <AppBar 
        // backgroundColor:this.context.color,
          style={{
            backgroundImage:'url('+a+')',
            backgroundSize:'cover',height:this.props.style.height,
            backgroundColor:this.context.color,}}
          zDepth={0}
          // iconElementLeft={iconLeft}
          onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
          showMenuIconButton={showMenuIconButton}
          title={title}
          iconElementRight={
            <IconMenu
              onItemTouchTap={this.handleTouchTap}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >

              <Link to='/admin'>
                <MenuItem primaryText="进入后台"/>
              </Link>
            </IconMenu>
          }
           >

        </AppBar>
      </header>
      );
  }
}

export default Header;
