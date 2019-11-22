import React, { useState } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  SortingState, EditingState, PagingState, SummaryState,
  IntegratedPaging, IntegratedSorting, IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import { getDataTable, deleteDataRows, insertDataRows, updataDataRows, changeAddedRows } from '../../../actions/axios'

import {
  generateRows,
  globalSalesValues,
} from '../data/generator';

const styles = theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});

//新增按鈕
const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="新增資料"
    >
      新增
    </Button>
  </div>
);

//編輯按鈕
const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="編輯列表">
    <EditIcon />
  </IconButton>
);

//刪除按鈕
const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      // if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      // }
    }}
    title="刪除列表"
  >
    <DeleteIcon />
  </IconButton>
);

//儲存按鈕
const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="儲存">
    <SaveIcon />
  </IconButton>
);

//取消按鈕
const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="取消">
    <CancelIcon />
  </IconButton>
);

//按鈕集合
const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

//資料
const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
      )}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const Cell = (props) => {
  const { column } = props;
//   if (column.name === 'discount') {
//     return <ProgressBarCell {...props} />;
//   }
//   if (column.name === 'amount') {
//     return <HighlightedCell {...props} />;
//   }
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  // const { column } = props;
  // const availableColumnValues = availableValues[column.name];
  // if (availableColumnValues) {
  //   return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  // }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

// export default () => {
function DataTable(props){
  const [onece, setOnece] = React.useState(0)
  React.useEffect(() => {
    // Update the document title using the browser API
    if(onece===0){
        props.getDataTable();
        setOnece(1);
    }
    
  });

  // const [columns] = useState([
  //   { name: 'product', title: '帳號' },
  //   { name: 'region', title: '名字' },
  //   { name: 'amount', title: '性別' },
  //   { name: 'discount', title: '電話' },
  //   { name: 'saleDate', title: '' },
  //   { name: 'customer', title: 'Customer' },
  // ]);

  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...globalSalesValues },
    length: 12,
  }));
  // console.log(rows)
  // const [tableColumnExtensions] = useState([
  //   { columnName: 'product', width: 200 },
  //   { columnName: 'region', width: 180 },
  //   { columnName: 'amount', width: 180, align: 'right' },
  //   { columnName: 'discount', width: 180 },
  //   { columnName: 'saleDate', width: 180 },
  //   { columnName: 'customer', width: 200 },
  // ]);

  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  // const [columnOrder, setColumnOrder] = useState(['product', 'region', 'amount', 'discount', 'saleDate', 'customer']);
  const [currencyColumns] = useState(['amount']);
  const [percentColumns] = useState(['discount']);
  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);

  //總平均
  const [totalSummaryItems] = useState([
    { columnName: 'discount', type: 'avg' },
    { columnName: 'amount', type: 'sum' },
  ]);

  // const changeAddedRows = value => setAddedRows(
  //   value.map(row => (Object.keys(row).length ? row : {
  //     account: 0,
  //     name: 0,
  //     sex: 0,
  //     phone: 0,
  //     eMail: 0,
  //     birthday: new Date().toISOString().split('T')[0],
  //     cName: 0,
  //     cPhone: 0,
  //     cAddr: 0
  //   })),
  // );

  // const deleteRows = (deletedIds) => {
  //   const rowsForDelete = props.rows.slice();

  //   console.log('傳入參數:',deletedIds)
  //   console.log('參數:',rowsForDelete)
    
  //   deletedIds.forEach((rowId) => {
  //     const index = rowsForDelete.findIndex(row => row.id === rowId);
  //     if (index > -1) {
  //       rowsForDelete.splice(index, 1);
  //     }
  //   });

  //   console.log('參數處理:',rowsForDelete)
  //   return rowsForDelete;
  // };

  //集合包
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = props.rows.length > 0 ? props.rows[props.rows.length - 1].id + 1 : 0;
      changedRows = [
        ...props.rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];

      changedRows = props.insertDataRows(added)
    }
    if (changed) {
      // changedRows = props.rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      changedRows = props.updataDataRows(changed)
    }
    if (deleted) {
      // changedRows = deleteRows(deleted);
      changedRows = props.deleteDataRows(deleted);
      console.log('changedRows: ' + changedRows)
    }
    // setRows(changedRows);
  };

  return (
    <Paper>
      <Grid
        rows={props.rows}
        columns={props.columns}
        getRowId={getRowId}
      >
        <SortingState
          sorting={sorting}
          onSortingChange={getSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={getEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          // addedRows={addedRows}
          // onAddedRowsChange={changeAddedRows}
          addedRows={props.addedRows}
          onAddedRowsChange={props.changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <SummaryState
          totalItems={totalSummaryItems}
        />

        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedSummary />

        {/* <CurrencyTypeProvider for={currencyColumns} />
        <PercentTypeProvider for={percentColumns} /> */}

        <DragDropProvider />

        <Table
          // stickyHeader
          columnExtensions={props.tableColumnExtensions}
          cellComponent={Cell}
        />
        <TableColumnReordering
          order={props.columnOrder}
          // onOrderChange={setColumnOrder}
        />
        <TableHeaderRow showSortingControls />
        <TableEditRow
          cellComponent={EditCell}
        />
        <TableEditColumn
          width={170}
          showAddCommand={!props.addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
        {/* <TableSummaryRow /> */}
        <TableFixedColumns
          leftColumns={leftFixedColumns}
        />
        {/* <PagingPanel
          pageSizes={pageSizes}
        /> */}
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    columns: state.dataTableReducer1.columns,
    tableColumnExtensions: state.dataTableReducer1.tableColumnExtensions,
    rows: state.dataTableReducer1.rows,
    columnOrder: state.dataTableReducer1.columnOrder,
    addedRows: state.dataTableReducer1.addedRows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDataTable,
    deleteDataRows,
    updataDataRows,
    insertDataRows,
    changeAddedRows
    // setColumnOrder
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)