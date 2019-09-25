import axios from 'axios'
import { openLoadingComponent, closeLoadingComponent } from './loading'
import { openSuccessSnackbar, openFailSnackbar } from './snackbar'

const domain = 'http://localhost/APITest/api'
// const domain = 'https://localhost:44397/api'

export function login(id, pa) {
    console.log(id, pa)
    return (dispatch, getState) => {
        dispatch(openLoadingComponent())

        axios.get(domain + '/login', {
            params: {
                id: id,
                passwd:pa,
            }
          })
          .then(function (response) {
            console.log(response);
            if (response.data.ResultCode===10){
                // 用法
                sleep(1000).then(() => {
                    dispatch(closeLoadingComponent())
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export function getDataTable() {
    return (dispatch, getState) => {
        dispatch(openLoadingComponent())
        axios.get(domain + '/data')
          .then(function (response) {
            console.log(response.data);
            if (response.data.ResultCode===10){
                dispatch({
                    type: 'GET_ALL_DATA',
                    payload: {
                        data: response.data.Data,
                    }
                })
                dispatch({
                    type: 'GET_ALL_DATA1',
                    payload: {
                        data: response.data.Data,
                    }
                })
                // 用法
                sleep(1000).then(() => {
                    dispatch(closeLoadingComponent())
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export function pagerDataTable(page, count) {
    return (dispatch, getState) => {
        dispatch(openLoadingComponent())
        axios.get(domain + '/data', {
            params: {
                page: page,
                count:count,
            }
          })
          .then(function (response) {
            console.log(response.data);
            if (response.data.ResultCode===10){
                dispatch({
                    type: 'GET_PAGER_DATA',
                    payload: {
                        data: response.data.Data,
                    }
                })
                // 用法
                sleep(1000).then(() => {
                    dispatch(closeLoadingComponent())
                    dispatch(openSuccessSnackbar('搜索資料成功'))
                })
               
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

//API只開傳入一個ID
export function deleteDataRows(deletedIds) {
    console.log(deletedIds[0])
    return (dispatch, getState) => {
        console.log(getState().dataTableReducer1.rows)
        dispatch(openLoadingComponent())

        axios.put(domain + '/data', {
            // params: {
            //     id: deletedIds[0],
            // }
        })
        .then(function (response) {
            console.log(response.data);
            // if (response.data.ResultCode===10){
            //     //處理內部資料表
            //     const rowsForDelete = getState().dataTableReducer1.rows.slice();
            //     deletedIds.forEach((rowId) => {
            //         const index = rowsForDelete.findIndex(row => row.id === rowId);
            //         if (index > -1) {
            //             rowsForDelete.splice(index, 1);
            //         }
            //     });
            //     console.log('參數處理:',rowsForDelete)
            //     dispatch({
            //         type: 'DELETE_DATATABLE_IDS',
            //         payload: {
            //             data: rowsForDelete,
            //         }
            //     })
                
            //     // 用法
            //     sleep(1000).then(() => {
            //         dispatch(closeLoadingComponent())
            //         dispatch(openSuccessSnackbar('刪除資料成功'))
            //     })
            // }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}