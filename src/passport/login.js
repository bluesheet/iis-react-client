import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button, message } from 'antd'
import * as actions from './action'
import './style.scss'
const FormItem = Form.Item

@connect (
  state => ({
    loginPending  : state.Passport.loginPending, 
    loginMessage  : state.Passport.loginMessage, 
    loginError    : state.Passport.loginError
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    return (
      <div className={'passport-wraper'}>
        <h1>账号登录</h1>
        <WrappedLoginForm
          onSubmit={this.handleSubmit.bind(this)}
          pending={this.props.loginPending}
          />
      </div>
    )
  }

  handleSubmit (values) {
    this.props.actions.login(values)
  }

  componentWillReceiveProps (nextProps) {
    let { loginPending, loginMessage, loginError } = nextProps
    if (loginError > 0) {
      message.error(loginMessage)
    }
      
  }
}

const WrappedLoginForm = Form.create()(React.createClass({

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={'form-container'}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
            //initialValue: undefined
          })(
            <Input 
              prefix={<Icon type={'user'} style={{ fontSize: 13 }} />} 
              autoComplete="off"
              placeholder={'用户名'} />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
            //initialValue: undefined
          })(
            <Input 
              prefix={<Icon type={'lock'} style={{ fontSize: 13 }} />} 
              type={'password'} 
              autoComplete="off"
              placeholder={'密 码'} />
          )}
        </FormItem>
        <FormItem>
          <Button 
            type={'primary'} 
            htmlType={'submit'} 
            className={'form-button'} 
            icon={'login'}
            loading={this.props.pending}>
            登 录
          </Button>
        </FormItem>
      </Form>
    )
  },

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

}))