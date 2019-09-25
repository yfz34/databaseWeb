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
        { title: '帳號', field: 'Account' },
        { title: '名字', field: 'Name' },
        { title: '性別', field: 'Sex' },
        { title: '電話', field: 'Phone' },
        { title: '信箱', field: 'EMail' },
        { title: '生日', field: 'Birthday' },
        { title: '公司名稱', field: 'CName' },
        { title: '公司電話', field: 'CPhone' },
        { title: '公司地址', field: 'CAddr' },

        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
    ],
    data: [
        // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        // {
        //   name: 'Zerya Betül',
        //   surname: 'Baran',
        //   birthYear: 2017,
        //   birthCity: 34,
        // },
    ],
}

const dataTableReducer = (state = defaulttable, action) => {
    switch (action.type) {
        case "DEFAULT_ALL_DATA":
           
            return state = {
                ...state,
            }
        case "GET_ALL_DATA":
            console.log(action.payload.data)
            state.data=action.payload.data;
            return state = {
                ...state,
            }
        default:
            return state
    }
}
export default dataTableReducer