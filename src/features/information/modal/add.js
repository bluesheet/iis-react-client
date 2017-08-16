import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../action'

const FormItem = Form.Item
const { TextArea } = Input

class NormalForm extends Component {

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return (
      <Form layout={'horizontal'} className={'app-modal-form'}>
        <FormItem
          {...formItemLayout}
          label="标题名称"
          hasFeedback>
          {getFieldDecorator('title', {
            rules: [
              { required: true, message: '标题名称不能为空!' }
            ]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内容简述"
          hasFeedback>
          {getFieldDecorator('desc', {
            rules: [
              { required: true, message: '内容简述不能为空!' }
            ]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内容详情"
          hasFeedback>
          {getFieldDecorator('content', {
            rules: []
          })(
            <TextArea rows="4" />
          )}
        </FormItem>
      </Form>
    )
  }

}

const WrappedNormalForm = Form.create()(NormalForm)



@connect(
  state => ({
    addPending: state.Information.addPending,
    addError: state.Information.addError,
    addMessage: state.Information.addMessage
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class NormalFromModel extends Component {
  static PropTypes = {
    visible: PropTypes.bool,
    closeModel: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    closeModel: () => null
  }

  componentWillReceiveProps (nextProps) {
    const { visible, addPending, addError, addMessage } = nextProps
    if (addError !== this.props.addError) {
      addError === 0 && this.handleCancel()
      addError > 0 && message.error(addMessage)
    }
    if (visible === this.props.visible) return
  }

  render () {
    const { visible, addPending } = this.props
    const options = {
      title: '新建',
      visible: visible,
      onCancel: this.handleCancel.bind(this),
      onOk: this.handleOk.bind(this),
      footer: [
        <Button
          key={'back'}
          size={'large'}
          onClick={this.handleCancel.bind(this)}>
          取消
        </Button>,
        <Button
          key={'create'}
          size={'large'}
          type={'primary'}
          loading={addPending}
          onClick={this.handleOk.bind(this)}>
          提交
        </Button>
      ],
      width: 600,
      maskClosable: false
    }
    return (
      <Modal {...options}>
        <WrappedNormalForm ref={'myform'} />
      </Modal>
    )
  }

  handleCancel (e) {
    this.refs.myform.resetFields()
    this.props.closeModel()
  }

  handleOk () {
    this.refs.myform.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.actions.fetchAddInformation({
          title     : values.title,
          desc      : values.desc,
          content   : values.content
        })
      }
    })
  }
}