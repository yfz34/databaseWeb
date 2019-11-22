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
        { title: '帳號1', name: 'account' },
        { title: '名字', name: 'name' },
        { title: '性別', name: 'sex' },
        { title: '電話', name: 'phone' },
        { title: '信箱', name: 'eMail' },
        { title: '生日', name: 'birthday' },
        { title: '公司名稱', name: 'cName' },
        { title: '公司電話', name: 'cPhone' },
        { title: '公司地址', name: 'cAddr' },
    ],
    tableColumnExtensions: [
        { columnName: 'account', width: 100 },
        { columnName: 'name', width: 100 },
        { columnName: 'sex', width: 100},
        { columnName: 'phone', width: 100 },
        { columnName: 'eMail', width: 150 },
        { columnName: 'birthday', width: 150 },
        { columnName: 'cName', width: 150 },
        { columnName: 'cPhone', width: 100 },
        { columnName: 'cAddr', width: 150 },
    ],
    rows: [],
    columnOrder: ['account', 'name', 'sex', 'phone', 'eMail', 'birthday', 'cName', 'cPhone', 'cAddr'],
    addedRows:[],
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
        case "CHANGE_ADDED_ROWS":
            state.addedRows = action.payload.data.map(row => (Object.keys(row).length ? row : {
                account: 0,
                name: 0,
                sex: 0,
                phone: 0,
                eMail: 0,
                birthday: new Date().toISOString().split('T')[0],
                cName: 0,
                cPhone: 0,
                cAddr: 0
            }))
            return state = {
                ...state,
            }
        default:
            return state
    }
}
export default dataTableReducer1