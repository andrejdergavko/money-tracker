import React from 'react';
import { useStyletron } from 'baseui';
import { Tag, KIND, VARIANT } from 'baseui/tag';
import DeleteAlt from 'baseui/icon/delete-alt';
import { Block } from 'baseui/block';
import Alert from 'baseui/icon/alert';
import Check from 'baseui/icon/check';
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
  DatetimeColumn,
} from 'baseui/data-table';

const columns = [
  DatetimeColumn({
    title: 'Date',
    formatString: 'dd-MM-yyyy',
    // cellBlockAlign: 'center',
    mapDataToValue: (data) => new Date(data.date),
  }),
  StringColumn({
    title: 'Transaction name',
    mapDataToValue: (data) => data.name,
  }),
  CategoricalColumn({
    title: 'Category',
    // eslint-disable-next-line react/display-name
    mapDataToValue: (data) => {
      return data.category;
      // if (!data.category) {
      //   return '';
      // }

      // return (
      //   <Tag
      //     closeable={false}
      //     color={data.categoryColor}
      //     variant={VARIANT.solid}
      //     kind={KIND.custom}
      //     overrides={{
      //       Root: {
      //         style: ({ $theme }) => ({
      //           margin: '0px',
      //           padding: '4px 10px 6px 10px',
      //           height: '20px',
      //           // color: data.color,
      //         }),
      //       },
      //       // Text: {
      //       //   style: ({ $theme }) => ({
      //       //     // outline: `${$theme.colors.warning200} solid`,
      //       //     // backgroundColor: $theme.colors.warning200,
      //       //     color: data.color,
      //       //   }),
      //       // },
      //     }}
      //   >
      //     {data.category}
      //   </Tag>
      // );
    },
  }),
  NumericalColumn({
    title: 'Sum',
    // format: NUMERICAL_FORMATS.ACCOUNTING,
    precision: 2,
    mapDataToValue: (data) => data.sum,
  }),
  StringColumn({
    title: 'Currency',
    mapDataToValue: (data) => data.currency,
  }),
  NumericalColumn({
    title: 'Flow (BYN)',
    precision: 2,
    mapDataToValue: (data) => data.flow,
  }),
  // BooleanColumn({
  //   title: 'is it good?',
  //   mapDataToValue: (data) => data[1],
  // }),
  // CategoricalColumn({
  //   title: 'Genre',
  //   mapDataToValue: (data) => data[2],
  // }),
  // NumericalColumn({
  //   title: 'Production Budget (millions)',
  //   format: NUMERICAL_FORMATS.ACCOUNTING,
  //   mapDataToValue: (data) => data[3],
  // }),
  // NumericalColumn({
  //   title: 'Box Office (millions)',
  //   format: NUMERICAL_FORMATS.ACCOUNTING,
  //   mapDataToValue: (data) => data[4],
  // }),
  // NumericalColumn({
  //   title: 'ROI',
  //   precision: 2,
  //   mapDataToValue: (data) => data[5],
  // }),
  // NumericalColumn({
  //   title: 'Rating IMDB',
  //   precision: 2,
  //   mapDataToValue: (data) => data[6],
  // }),
];

// eslint-disable-next-line react/prop-types
export function BrowseTable({
  rows,
  handleSetCategoryButtonClick,
  handleDeleteTransactionsButtonClick,
}) {
  // const [rows, setRows] = React.useState(initialRows);

  // function flagRows(ids) {
  //   const nextRows = rows.map((row) => {
  //     if (ids.includes(row.id)) {
  //       const nextData = [...row.data];
  //       nextData[1] = !nextData[1];
  //       return { ...row, data: nextData };
  //     }
  //     return row;
  //   });
  //   // setRows(nextRows);
  // }
  // function flagRow(id) {
  //   flagRows([id]);
  // }
  // function removeRows(ids) {
  //   const nextRows = rows.filter((row) => !ids.includes(row.id));
  //   setRows(nextRows);
  // }
  // function removeRow(id) {
  //   removeRows([id]);
  // }
  const batchActions = [
    {
      label: 'Set category',
      onClick: ({ selection, clearSelection }) => {
        handleSetCategoryButtonClick(selection.map((r) => r.id));
        clearSelection();
      },
      renderIcon: () => 'Set category',
    },
    {
      label: 'Delete transactions',
      onClick: ({ selection, clearSelection }) => {
        handleDeleteTransactionsButtonClick(selection.map((r) => r.id));
        clearSelection();
      },
      renderIcon: () => 'Delete transactions',
    },
  ];
  const rowActions = [
    {
      label: 'Delete',
      onClick: ({ row }) => {
        handleDeleteTransactionsButtonClick([row.id]);
      },
      // eslint-disable-next-line react/display-name
      renderIcon: ({ size }) => <DeleteAlt size={size} />,
    },
    // {
    //   label: 'Remove',
    //   onClick: () => {},
    //   renderIcon: () => 1,
    // },
  ];
  return (
    <Block marginLeft="10px" marginRight="10px" style={{ height: '99.9%' }}>
      <StatefulDataTable
        batchActions={batchActions}
        rowActions={rowActions}
        columns={columns}
        rows={rows}
      />
    </Block>
  );
}
