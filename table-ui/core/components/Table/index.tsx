import { map } from 'lodash';
import { Tooltip } from '../Tooltip';
import { useStyles } from './styles';
import { SortOrder } from '../../interfaces';
import SortIcon from '@material-ui/icons/Sort';
import { useState, useEffect } from 'react';

export interface TableColumnSetting<T extends object> {
  title: string;
  customTitle?: () => JSX.Element;
  field: string;
  columnTooltipTitle?: string | JSX.Element;
  customRender?: (record: T) => JSX.Element;
  sortable?: boolean;
}
interface Props<T extends object> {
  columnsSettings: TableColumnSetting<T>[];
  rowsData: T[];
  onSort?: (field: string, sort: SortOrder) => void;
}
interface SortParam {
  field?: string;
  sort?: SortOrder;
}

export const Table = <T extends object>(props: Props<T>) => {
  const { columnsSettings, rowsData, onSort } = props;
  const classes = useStyles();
  const [sortParam, setSortParam] = useState<SortParam>({
    field: undefined,
    sort: 'asc',
  });

  const onClickSort = (field: string) => {
    setSortParam({
      field,
      sort: sortParam.sort === 'asc' ? 'desc' : 'asc',
    });
  };

  useEffect(() => {
    const { field, sort } = sortParam;
    if (field && sort) onSort(field, sort);
  }, [sortParam]);

  return (
    <table className={classes.table}>
      <tr>
        {columnsSettings.map((column, index) => {
          const {
            customTitle,
            title,
            columnTooltipTitle,
            sortable,
            field,
          } = column;
          const columnContent = customTitle ? customTitle() : title;
          return (
            <th key={index.toString()}>
              {columnTooltipTitle ? (
                <Tooltip title={columnTooltipTitle}>
                  {
                    <div
                      className={classes.cell}
                      onClick={() => {
                        onClickSort(field);
                      }}
                    >
                      {columnContent}
                      {sortable && <SortIcon />}
                    </div>
                  }
                </Tooltip>
              ) : (
                <div
                  className={classes.cell}
                  onClick={() => {
                    sortable && onClickSort(field);
                  }}
                >
                  {columnContent}
                  {sortable && <SortIcon />}
                </div>
              )}
            </th>
          );
        })}
      </tr>
      {map(rowsData, (rowData: T, index: number) => {
        return (
          <tr key={index.toString()}>
            {columnsSettings.map((column, index) => {
              return column.customRender ? (
                <td key={index.toString()}>{column.customRender(rowData)}</td>
              ) : (
                <td key={index.toString()}>{rowData[column.field]}</td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};
