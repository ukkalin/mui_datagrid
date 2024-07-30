// src/components/DataGrid.tsx
'use client'; // クライアントコンポーネントとして指定

import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'コース名',
    width: 200,
    editable: true,
  },
  {
    field: 'time',
    headerName: '制限時間',
    type: 'string',
    width: 100,
    editable: true,
  },
  {
    field: 'conditional',
    headerName: '条件',
    width: 100,
    editable: true,
  },
  {
    field: 'price',
    headerName: '価格',
    type: 'number',
    width: 150,
    editable: true,
    // valueFormatter: (params) => `$${(params.value ?? 0).toFixed(2)}`, // フォーマット
  },
];

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({ page: 10, pageSize: 100 });

  // データの取得と状態の更新
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json', {
          cache: 'no-store', // キャッシュを無効にする
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();

    // 定期的にデータを更新
    const intervalId = setInterval(fetchData, 30000); // 30秒ごとにデータを取得

    return () => clearInterval(intervalId); // クリーンアップ
  }, []);

  // チェックボックスの選択が変更されたときに呼ばれる関数
  const handleRowSelection = (newSelection: GridRowSelectionModel) => {
    setSelectedRows(newSelection as number[]);
  };

  // ページネーションの状態が変更されたときに呼ばれる関数
  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  // ページネーションに基づいて表示するデータを取得
  const { page, pageSize } = paginationModel;
  const paginatedRows = rows.slice(page * pageSize, (page + 1) * pageSize);

  // 選択された行をフィルタリングする
  const selectedRowData = paginatedRows.filter((row) => selectedRows.includes(row.id));

  // 選択された行の価格の合計を計算する
  const totalPrice = selectedRowData.reduce((sum, row) => sum + (row.price || 0), 0);

  // 数字にカンマを付けるフォーマット関数
  const formatCurrency = (value: number) => new Intl.NumberFormat().format(value);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={selectedRows}
        />
      </div>
      <div style={{ marginLeft: 20, width: '50%' }}>
        <h2>選択したコース</h2>
        <ul>
          {selectedRowData.map((row) => (
            <li key={row.id}>
              {row.name} - {row.email} - ￥{formatCurrency(row.price)}
            </li>
          ))}
        </ul>
        <h3>合計金額: ￥{formatCurrency(totalPrice)}</h3>
      </div>
    </div>
  );
};

export default DataGridComponent;
