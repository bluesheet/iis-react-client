import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../action'

const FormItem = Form.Item
const { TextArea } = Input

class NormalForm extends Component {
  static PropTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      desc: PropTypes.string,
      content: PropTypes.string
    })
  }

  static defaultProps = {
    data: {
      title: undefined,
      desc: undefined,
      content: undefined
    }
  }

  render () {
    const { data } = this.props
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
            ],
            initialValue: data.title
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
            ],
            initialValue: data.desc
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内容详情"
          hasFeedback>
          {getFieldDecorator('content', {
            rules: [],
            initialValue: data.content
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
    editPending: state.Information.editPending,
    editError: state.Information.editError,
    editMessage: state.Information.editMessage,
    listData: state.Information.listData
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class NormalFromModel extends Component {
  static PropTypes = {
    visible: PropTypes.bool,
    closeModel: PropTypes.func,
    selectId: PropTypes.string
  }

  static defaultProps = {
    visible: false,
    closeModel: () => null,
    selectId: null
  }

  componentWillReceiveProps (nextProps) {
    const { visible, editPending, editError, editMessage } = nextProps
    if (editError !== this.props.editError) {
      editError === 0 && this.handleCancel()
      editError > 0 && message.error(editMessage)
    }
    if (visible === this.props.visible) return
  }

  render () {
    const { visible, editPending, selectId, listData } = this.props
    const useData = _.find(listData, { _id: selectId })
    const options = {
      title: `编辑`,
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
          loading={editPending}
          onClick={this.handleOk.bind(this)}>
          提交
        </Button>
      ],
      width: 600,
      maskClosable: false
    }
    return (
      <Modal {...options}>
        
          <WrappedNormalForm ref={'myform'} data={useData} />
        
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
        this.props.actions.fetchEditInformation(this.props.selectId, {
          title     : values.title,
          desc      : values.desc,
          content   : values.content
        })
      }
    })
  }
}