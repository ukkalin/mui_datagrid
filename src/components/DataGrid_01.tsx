// src/components/DataGrid.tsx
'use client'; // クライアントコンポーネントとして指定

import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

// 列の定義
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 150,
    editable: true,
    // valueFormatter: (params) => `$${params.value.toFixed(2)}`, // フォーマット
  },
];

// データの定義
const rows = [
  { id: 1, name: 'John Doe', age: 35, email: 'john@example.com', price: 120.00 },
  { id: 2, name: 'Jane Smith', age: 42, email: 'jane@example.com', price: 80.00 },
  { id: 3, name: 'Kevin Brown', age: 28, email: 'kevin@example.com', price: 60.00 },
  { id: 4, name: 'Alice Johnson', age: 52, email: 'alice@example.com', price: 150.00 },
  { id: 5, name: 'Michael Lee', age: 37, email: 'michael@example.com', price: 90.00 },
];

const DataGridComponent: React.FC = () => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  // チェックボックスの選択が変更されたときに呼ばれる関数
  const handleRowSelection = (newSelection: GridRowSelectionModel) => {
    setSelectedRows(newSelection as number[]);
  };

  // 選択された行をフィルタリングする
  const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));

  // 選択された行の価格の合計を計算する
  const totalPrice = selectedRowData.reduce((sum, row) => sum + (row.price || 0), 0);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: 400, width: '50%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 6 }}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={selectedRows}
        />
      </div>
      <div style={{ marginLeft: 20, width: '50%' }}>
        <h2>Selected Rows</h2>
        <ul>
          {selectedRowData.map((row) => (
            <li key={row.id}>
              {row.name} - {row.email} - ${row.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default DataGridComponent;
