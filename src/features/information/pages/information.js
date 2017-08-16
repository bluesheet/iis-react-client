import React, { Component } from 'react'
import { CoreLayout, LayoutBreadcrumb } from '../../../layouts'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { Button, Input, Table, message, Tooltip, Popconfirm, InputNumber } from 'antd'
import AddFormModal from '../modal/add'
import EditFormModal from '../modal/edit'
import { bindActionCreators } from 'redux'
import * as actions from '../action'
import './style.scss'

@connect(
  state => ({
    auth: state.Passport.auth,
    listData: state.Information.listData,
    listPending: state.Information.listPending,
    listError: state.Information.listError,
    listMessage: state.Information.listMessage,
    removePending: state.Information.removePending,
    removeError: state.Information.removeError,
    removeMessage: state.Information.removeMessage,
    pushPointPending: state.Information.pushPointPending,
    pushPointError: state.Information.pushPointError,
    pushPointMessage: state.Information.pushPointMessage
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class Information extends Component {

  constructor (props) {
    super(props)
    this.state = {
      modal: null,
      selectId: null,
      searchText: undefined
    }
  }

  componentDidMount () {
    this.props.actions.fetchListInformation()
  }

  render () {
    const { location, auth, listData, listPending, removePending, pushPointPending } = this.props
    const columns = [
      {
        title: '编号',
        dataIndex: '_id',
        key: '_id',
        width: 220,
        fixed: 'left',
        render: (record) => (
          <span className="record-id">{record}</span>
        )
      },
      {
        title: '标题名称',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        //fixed: 'left'
        render: (record) => (
          <div className="word-ellipsis" style={{ width: 184 }}>
            <Tooltip placement="topLeft" title={record}><span>{record}</span></Tooltip>
          </div>
        )
      },
      {
        title: '简述',
        dataIndex: 'desc',
        key: 'desc',
        width: 500,
        //fixed: 'left'
        render: (record) => (
          <div className="word-ellipsis" style={{ width: 484 }}>
            <Tooltip placement="topLeft" title={record}><span>{record}</span></Tooltip>
          </div>
        )
      },
      {
        title: '数量',
        dataIndex: 'counts',
        key: 'counts',
        width: 100,
        //fixed: 'left'
        render: (record) => (
          <div className="word-ellipsis" style={{ width: 84 }}>
            <Tooltip placement="topLeft" title={record}><span>{record}</span></Tooltip>
          </div>
        )
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        fixed: 'right',
        render: (text, record) => (
          <span>
            <a onClick={() => this.setState({ modal: 'edit', selectId: record._id })}>编辑</a>
            <span className="ant-divider" />
            <Popconfirm title={`确定要删除该信息吗？`}
              onConfirm={() => this.props.actions.fetchRemoveInformation(record._id)}>
              <a>删除</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Popconfirm title={`确定要增加该信息数量吗？`}
              onConfirm={() => this.props.actions.fetchPushPointInformation(record._id)}>
              <a>增加数量</a>
            </Popconfirm>
          </span>
        )
      }
    ]
    listDataByKey(listData || [])
    let _listData = _.orderBy(listData, ['_id'], ['desc'])
    if (this.state.searchText) {
      const searchText = new RegExp(this.state.searchText.toLocaleLowerCase())
      _listData = _.filter(_listData, o => searchText.test(o.title.toLocaleLowerCase()) || searchText.test(o.desc.toLocaleLowerCase()) )
    }
    return (
      <CoreLayout 
        location={location}
        auth={auth}
        pageCode={'8001'}>
        <LayoutBreadcrumb
          data={[
            { name: '主页', link: '/'},
            { name: '信息数据管理'},
            { name: '信息列表', link: '/information/list' }
          ]}
          />
        <div className={'layout-page-tools'}>
          <Button
            size={'large'}
            type={'primary'}
            onClick={() => this.setState({ modal: 'add' })}
            >
            新建
          </Button>
          <Input
            size={'large'}
            style={{ width: 200, marginLeft: 10 }} 
            placeholder={'按标题名称或简述检索'}
            value={this.state.searchText}
            onChange={this.handleChangeBySearch.bind(this)} />
        </div>
        <Table style={{ maxWidth: 1200, minWidth: 1000 }}
            columns={columns} 
            dataSource={_listData}
            pagination={true}
            loading={listPending || removePending || pushPointPending}
            scroll={{ x: 1200 }}
            bordered
            />
        <AddFormModal
          visible={this.state.modal === 'add'}
          closeModel={() => this.setState({ modal: null })}
          />
        <EditFormModal
          visible={this.state.modal === 'edit'}
          selectId={this.state.selectId}
          closeModel={() => this.setState({ modal: null, selectId: null })}
          />
      </CoreLayout>
    )
  }

  handleChangeBySearch (e) {
    const { value } = e.target
    this.setState({ searchText: value })
  }
}

const listDataByKey = (data) => {
  for (let e of data) {
    e.key = e._id
  }
}