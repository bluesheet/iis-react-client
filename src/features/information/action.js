// ------------------------------------
// Actions
// ------------------------------------
import { createAction, httpServices } from 'http-services'
import * as types from './constant'
import config from '../../config'
import { getToken } from '../../services/token'

const { domain, apiPath } = config
const HttpServices = new httpServices(domain, apiPath)

export function fetchAddInformation (data) {
  return dispatch => {
    dispatch(createAction(types.INFORMATION_FETCH_ADD_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST('/information/create', { ...data, accesstoken: token })
          dispatch(createAction(types.INFORMATION_FETCH_ADD_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.INFORMATION_FETCH_ADD_FAILURE, error))
          reject(error)
        }
      })
    }, 500)
  }
}

export function fetchListInformation () {
  return dispatch => {
    dispatch(createAction(types.INFORMATION_FETCH_LIST_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.GET('/information', { accesstoken: token })
          dispatch(createAction(types.INFORMATIOM_FETCH_LIST_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.INFORMATION_FETCH_LIST_FAILURE, error))
          reject(error)
        }
      })
    }, 500)
  }
}

export function fetchEditInformation (id, data) {
  return dispatch => {
    dispatch(createAction(types.INFORMATION_FETCH_EDIT_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/information/edit/${id}`, { ...data, accesstoken: token })
          dispatch(createAction(types.INFORMATION_FETCH_EDIT_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.INFORMATION_FETCH_EDIT_FAILURE, error))
          reject(error)
        }
      })
    }, 500)
  }
}

export function fetchRemoveInformation (id) {
  return dispatch => {
    dispatch(createAction(types.INFORMATION_FETCH_REMOVE_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/information/remove`, { id, accesstoken: token })
          dispatch(createAction(types.INFORMATION_FETCH_REMOVE_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.INFORMATION_FETCH_REMOVE_FAILURE, error))
          reject(error)
        }
      })
    }, 500)
  }
}

export function fetchPushPointInformation (id) {
  return dispatch => {
    dispatch(createAction(types.INFORMATION_FETCH_PUSHPOINT_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const result = await HttpServices.POST(`/information/counts`, { id, accesstoken: token })
          dispatch(createAction(types.INFORMATION_FETCH_PUSHPOINT_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.INFORMATION_FETCH_PUSHPOINT_FAILURE, error))
          reject(error)
        }
      })
    }, 500)
  }
}