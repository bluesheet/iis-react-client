import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import { Actions, Login } from '../passport'
import './style.scss'
import ProgressBar from '../components/progress-bar'

@connect(
  state => ({
    Root      : state.Root,
    Passport  : state.Passport
  }),
  dispatch => ({
    actions: bindActionCreators({...actions, ...Actions}, dispatch)
  })
)
export default class App extends Component {

  componentWillMount () {
    this.props.actions.initial()
  }

  componentWillReceiveProps (nextProps) {
    const { Root, Passport } = nextProps
    if (Passport.initialPending) {
      this.props.actions.initialProgress(65, 'begin')
    }
    else {
      if (Root.initialPending) {
        if (Root.initialProgress >= 100) {
          this.props.actions.initialComplete()
        }
        else {
          Root.initialProgress !== this.props.Root.initialProgress && this.props.actions.initialProgress(100, 'end')
        }
      }
    }
  }
  
  render () {
    const { children, Root, Passport } = this.props
    let initialMaskStyle = Root.initialProgress === 100 ? {
      animation: 'hideMask 1.8s'
    } : null
    return (
      <div className={'layout-root'}>
        {Passport.auth ? children : <Login />}
        {Root.initialPending ? (
          <div className={'layout-initial-mask'} style={initialMaskStyle}>
            <i className={'fa fa-cog fa-spin fa-2x fa-fw'} style={{ color: '#999', marginBottom: 8 }}></i>
            <div className={'progress-span'}>Loading...{`${Root.initialProgress}%`}</div>
            <ProgressBar pending={`${Root.initialProgress}%`} />
          </div>
        ) : null}
      </div>
    )
  }
}