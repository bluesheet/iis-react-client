import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Routes } from '../../features'
import './style.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../containers/action'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu

import { menuSub as InformationMenuSub } from '../../features/information'


export default class Sider extends PureComponent {
  static propTypes = {
    location: PropTypes.object
  }

  static defaultProps = {
    location: null
  }

  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentDidMount () {
    //const { initialPending, initialProgress } = this.props
    //initialPending && this.props.actions.initialProgress(65)
  }
  
  render () {
    const { location } = this.props
    const { pathname } = location
    const pathMatch = pathname.match(/^(\/)([a-z]+)/)
    return (
      <div className={'layout-sider'} 
        style={this.state.collapsed ? { flex: '0 0 64px' } : null}>
        <div className={'menu-collapsed'} 
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <Menu
          mode={'inline'}
          theme={'dark'}
          inlineCollapsed={this.state.collapsed}
          defaultOpenKeys={[pathMatch && pathMatch[2]]}
          selectedKeys={[pathname.toLowerCase()]}
          >
          {this.renderSubMenu(`information`, `信息数据管理`, `appstore`, InformationMenuSub)}
        </Menu>
      </div>
    )
  }

  renderSubMenu (key, name, icon, data) {
    return (
      <SubMenu
        key={key}
        title={<span><Icon type={icon || 'appstore'} /><span>{name}</span></span>} >
        {data.map( (item, i) => {
          return(
            <Menu.Item key={`/${item.path}/${item.key}`}>
              <Link to={`/${item.path}/${item.key}`}>{item.name}</Link>
            </Menu.Item>
          )
        })}
      </SubMenu>
    )
  }
}

