// ------------------------------------
// Reducer
// ------------------------------------
import { statusToError, getStatusError, createReducer } from 'http-services'
import * as types from './constant'

const initialState = {
  addPending: false,
  addError: -1,
  addMessage: null,
  listData: [],
  listPending: false,
  listError: -1,
  listMessage: null,
  editPending: false,
  editError: -1,
  editMessage: null,
  removePending: false,
  removeError: -1,
  removeMessage: null,
  pushPointPending: false,
  pushPointError: -1,
  pushPointMessage: null,
}

const ACTION_HANDLERS = {
  // ADD
  [types.INFORMATION_FETCH_ADD_BEGIN]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      addPending: true,
      addError: -1,
      addMessage: null
    }
  },
  [types.INFORMATION_FETCH_ADD_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'addError', 'addMessage'),
      addPending: false,
      listData: createItem(data, status, state.listData)
    }
  },
  [types.INFORMATION_FETCH_ADD_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'addError', 'addMessage'),
      addPending: false
    }
  },
  // LIST
  [types.INFORMATION_FETCH_LIST_BEGIN]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      listPending: true,
      listError: -1,
      listMessage: null,
      listData: null
    }
  },
  [types.INFORMATIOM_FETCH_LIST_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'listError', 'listMessage'),
      listPending: false,
      listData: data
    }
  },
  [types.INFORMATION_FETCH_LIST_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'listError', 'listMessage'),
      listPending: false
    }
  },
  // EDIT
  [types.INFORMATION_FETCH_EDIT_BEGIN]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      editPending: true,
      editError: -1,
      editMessage: null
    }
  },
  [types.INFORMATION_FETCH_EDIT_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'editError', 'editMessage'),
      editPending: false,
      listData: updateItem(data, status, state.listData)
    }
  },
  [types.INFORMATION_FETCH_EDIT_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'editError', 'editMessage'),
      editPending: false
    }
  },
  // REMOVE
  [types.INFORMATION_FETCH_REMOVE_BEGIN]: (state, action) => {
    return {
      ...state,
      removePending: true,
      removeError: -1,
      removeMessage: null
    }
  },
  [types.INFORMATION_FETCH_REMOVE_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'removeError', 'removeMessage'),
      removePending: false,
      listData: data ? data : state.listData
    }
  },
  [types.INFORMATION_FETCH_REMOVE_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'removeError', 'removeMessage'),
      removePending: false
    }
  },
  // PUSHPOINT
  [types.INFORMATION_FETCH_PUSHPOINT_BEGIN]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      pushPointPending: true,
      pushPointError: -1,
      pushPointMessage: null
    }
  },
  [types.INFORMATION_FETCH_PUSHPOINT_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, status } = payload
    return {
      ...state,
      ...statusToError(payload, 'pushPointError', 'pushPointMessage'),
      pushPointPending: false,
      listData: updateItem(data, status, state.listData)
    }
  },
  [types.INFORMATION_FETCH_PUSHPOINT_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({status}, 'pushPointError', 'pushPointMessage'),
      pushPointPending: false
    }
  },
}

export default (state = initialState, action) => createReducer(state, action, ACTION_HANDLERS)

function createItem (data, status, listData) {
  if (status.code !== 0) return listData
  listData.push(data)
  return listData
}

function updateItem (data, status, listData) {
  if (status.code !== 0) return listData
  const index = _.findIndex(listData, { _id: data._id })
  listData[index] = data
  return listData
}