import { Tooltip } from '../Tooltip';
import { useStyles } from './styles';
import { SortBy } from '../../interface';
import SortIcon from '@material-ui/icons/Sort';
import _ from 'lodash';
import { useState, useEffect } from 'react';

export interface TableColumnSetting {
  title: string;
  customTitle?: () => JSX.Element;
  field: string;
  columnTooltipTitle?: string | JSX.Element;
  customRender?: (record: Object) => JSX.Element;
  sortable?: boolean;
}
interface Props {
  columnsSettings: TableColumnSetting[];
  rowsData: Record<string, Object>;
  onSort?: (field: string, sort: SortBy) => void;
}
interface SortParam {
  field?: string;
  sort?: SortBy;
}

export const Table = (props: Props) => {
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
        {columnsSettings.map(column => {
          const {
            customTitle,
            title,
            columnTooltipTitle,
            sortable,
            field,
          } = column;
          const columnContent = customTitle ? customTitle() : title;
          return (
            <th>
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
      {_.map(rowsData, rowData => {
        return (
          <tr>
            {columnsSettings.map(column => {
              return column.customRender ? (
                <td>{column.customRender(rowData)}</td>
              ) : (
                <td>{rowData[column.field]}</td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};
