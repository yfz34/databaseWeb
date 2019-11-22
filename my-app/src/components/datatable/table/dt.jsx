import React, { useState } from 'react';
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

import { ProgressBarCell } from '../material/progress-bar-cell';
import { HighlightedCell } from '../material/highlighted-cell';
import { CurrencyTypeProvider } from '../material/currency-type-provider';
import { PercentTypeProvider } from '../material/percent-type-provider';

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
    selectMenu: {
      position: 'absolute !important',
    },
  });
  
  const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onExecute}
        title="Create new row"
      >
        New
      </Button>
    </div>
  );
  
  const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
      <EditIcon />
    </IconButton>
  );
  
  const DeleteButton = ({ onExecute }) => (
    <IconButton
      onClick={() => {
        // eslint-disable-next-line
        if (window.confirm('Are you sure you want to delete this row?')) {
          onExecute();
        }
      }}
      title="Delete row"
    >
      <DeleteIcon />
    </IconButton>
  );
  
  const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
      <SaveIcon />
    </IconButton>
  );
  
  const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
      <CancelIcon />
    </IconButton>
  );
  
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
        MenuProps={{
          className: classes.selectMenu,
        }}
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
    if (column.name === 'discount') {
      return <ProgressBarCell {...props} />;
    }
    if (column.name === 'amount') {
      return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
  };
  
  const EditCell = (props) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
      return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }
    return <TableEditRow.Cell {...props} />;
  };
  
  const getRowId = row => row.id;
  
  export default () => {
    const [columns] = useState([
      { name: 'product', title: 'Product' },
      { name: 'region', title: 'Region' },
      { name: 'amount', title: 'Sale Amount' },
      { name: 'discount', title: 'Discount' },
      { name: 'saleDate', title: 'Sale Date' },
      { name: 'customer', title: 'Customer' },
    ]);
    const [rows, setRows] = useState(generateRows({
      columnValues: { id: ({ index }) => index, ...globalSalesValues },
      length: 12,
    }));
    const [tableColumnExtensions] = useState([
      { columnName: 'product', width: 200 },
      { columnName: 'region', width: 180 },
      { columnName: 'amount', width: 180, align: 'right' },
      { columnName: 'discount', width: 180 },
      { columnName: 'saleDate', width: 180 },
      { columnName: 'customer', width: 200 },
    ]);
    const [sorting, getSorting] = useState([]);
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageSizes] = useState([5, 10, 0]);
    //cols
    const [columnOrder, setColumnOrder] = useState(['product', 'region', 'amount', 'discount', 'saleDate', 'customer']);
    const [currencyColumns] = useState(['amount']);
    const [percentColumns] = useState(['discount']);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
    const [totalSummaryItems] = useState([
      { columnName: 'discount', type: 'avg' },
      { columnName: 'amount', type: 'sum' },
    ]);
  
    const changeAddedRows = value => setAddedRows(
      value.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    );
  
    const deleteRows = (deletedIds) => {
      const rowsForDelete = rows.slice();
      deletedIds.forEach((rowId) => {
        const index = rowsForDelete.findIndex(row => row.id === rowId);
        if (index > -1) {
          rowsForDelete.splice(index, 1);
        }
      });
      return rowsForDelete;
    };
  
    const commitChanges = ({ added, changed, deleted }) => {
      let changedRows;
      //新增
      if (added) {
        console.log("新增")
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        console.log('startingAddedId: '+startingAddedId)
        console.log("added: " + added[0])

        let bbb = {}
        added.map((row, index) => {
            console.log(row)
            console.log(index)
            bbb = row
        })
        console.log(bbb[0])
        
        let ccc = added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          }))

        console.log(ccc[0])


        changedRows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];

        // let aaa = [
        //     {
        //       "1234567890": "Nina Ricci",
        //     },
        //     {
        //       "2345678901": "Hello Kitty",
        //     },
        //     {
        //       "3456789012": "Pusheen the cat",
        //     },
        //   ]

        // console.log(aaa)
      }
      //修改
      if (changed) {
        console.log("修改")
        console.log(changed)
        changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        // let id = -1
        // rows.map(row => { if(changed[row.id]){id=row.id}});
        // console.log(id)
        // console.log(Object.keys(changed));
        let keys = Object.keys(changed)
        console.log(changed[keys[0]])
        let aaa = {
            test: '123',
            ...changed[keys[0]]
        }
        console.log(aaa)
      }
      //刪除
      if (deleted) {
        console.log("刪除")
        changedRows = deleteRows(deleted);
      }
      console.log('changedRows: '+changedRows)
      setRows(changedRows);
    };
  
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
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
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <SummaryState
            totalItems={totalSummaryItems}
          />
  
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />
  
          <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} />
  
          <DragDropProvider />
  
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow
            cellComponent={EditCell}
          />
          <TableEditColumn
            width={170}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <TableSummaryRow />
          <TableFixedColumns
            leftColumns={leftFixedColumns}
          />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    );
  };