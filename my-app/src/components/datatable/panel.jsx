import React from 'react'
import DataTable from './table/datatable1'
// import DataTable from './table/dt'
import Filter from './filter/filter'

function DataTablePanel(){
	return(
		<div style={{textAlign:'center'}}>
			<h2>資料表</h2>
			<Filter />
			<DataTable />		
		</div>
	)
}

export default DataTablePanel