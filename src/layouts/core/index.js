import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Sider from '../sider'
import './style.scss'
import Header from '../header'
import Permission from '../../components/permission'


export default class CoreLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    pageCode: PropTypes.string,
    auth: PropTypes.object,
  }

  static defaultProps = {
    children: null,
    pageCode: 'none',
    auth: null,
  }
  
  render () {
    const { location, children, auth, pageCode } = this.props
    const permissionView = this.renderPermission()
    return (
      <div className={'layout-warpper'} style={{ flexDirection: 'column' }}>
        <Header />
        <div className={'layout-warpper'}>
          <Sider location={location} />
          <Permission 
            className={'layout-page-container'}
            pageCode={pageCode} 
            flag={auth && auth.group.flag || []}
            viewComponent={permissionView}>
            <div>{children}</div>
          </Permission>
        </div>
      </div>
    )
  }

  renderPermission () {
    return (
      <div className="layout-page-not-found">
        <div className="page-not-found">
          <h1>401</h1>
          <div>
            <h2>The page is not allowed.</h2>
          </div>
        </div>
      </div>
    )
  }
}

import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export const LayoutBreadcrumb = ({ data }) => (
  <Breadcrumb>
    {data.map( (item, i) => {
      return (
        <Breadcrumb.Item>
          {item.link ? (
            <Link to={item.link}>{item.name}</Link>
          ) : item.name}
        </Breadcrumb.Item>
      )
    })}
  </Breadcrumb>
)