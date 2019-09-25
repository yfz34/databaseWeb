let initial = { 
    column:{
        title:'',
        field:'',
        type:'',
    },
    columns:[],
    data:[]
}

let defaulttable={
    columns: [
        { title: '帳號1', name: 'Account' },
        { title: '名字', name: 'Name' },
        { title: '性別', name: 'Sex' },
        { title: '電話', name: 'Phone' },
        { title: '信箱', name: 'EMail' },
        { title: '生日', name: 'Birthday' },
        { title: '公司名稱', name: 'CName' },
        { title: '公司電話', name: 'CPhone' },
        { title: '公司地址', name: 'CAddr' },
    ],
    tableColumnExtensions: [
        { columnName: 'Account', width: 180 },
        { columnName: 'Name', width: 180 },
        { columnName: 'Sex', width: 180},
        { columnName: 'Phone', width: 180 },
        { columnName: 'EMail', width: 180 },
        { columnName: 'Birthday', width: 180 },
        { columnName: 'CName', width: 180 },
        { columnName: 'CPhone', width: 180 },
        { columnName: 'CAddr', width: 180 },
    ],
    rows: [],
}

const dataTableReducer1 = (state = defaulttable, action) => {
    switch (action.type) {
        case "DEFAULT_ALL_DATA1":
           
            return state = {
                ...state,
            }
        case "GET_ALL_DATA1":
            console.log(action.payload.data)
            state.rows=action.payload.data;
            return state = {
                ...state,
            }
        case "GET_PAGER_DATA":
            console.log(action.payload.data)
            state.rows=action.payload.data;
            return state = {
                ...state,
            }
        case "DELETE_DATATABLE_IDS":
            // console.log(action.payload.data)
            state.rows=action.payload.data;
            return state = {
                ...state,
            }
        default:
            return state
    }
}
export default dataTableReducer1