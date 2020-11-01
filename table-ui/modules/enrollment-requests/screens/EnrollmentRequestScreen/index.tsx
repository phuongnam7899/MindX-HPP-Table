import {
  Table,
  TableColumnSetting,
  HelperPopover,
  MenuOption,
} from '../../../../core/components';
import dayjs from 'dayjs';
import { useStyles } from './styles';
import { useState } from 'react';
import _ from 'lodash';
import { SortBy } from '../../../../core/interface';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { green, red } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
import { EnrollmentRequest, EnrollmentRequestStatues } from '../../interface';

const fakeRowData = {
  name: 'Nguyen Van A',
  type: 'ENROLLMENT',
  status: 'WAITING',
  email: 'phuongnam7899@gmail.com',
  course: 'Code for everyone',
  class: 'C4E-24',
  centre: '22C TC',
  phoneNo: '0981038589',
};
const fakeRowsData = {};
for (let i = 1; i < 21; i++) {
  fakeRowsData[`er${i}`] = {
    ...fakeRowData,
    id: `er${i}`,
    createdAt: dayjs()
      .add(i, 'day')
      .toISOString(),
  };
}
export const EnrollmentRequestsScreen = props => {
  const classes = useStyles();

  const [rowsData, setRowsData] = useState(fakeRowsData);
  const updateEnrollmentRequestStatus = (
    recordId: string,
    newStatus: EnrollmentRequestStatues,
  ) => {
    const oldRecord = { ...rowsData[recordId] };

    setRowsData({
      ...rowsData,
      [recordId]: {
        ...oldRecord,
        status: newStatus,
      },
    });
  };
  const enrollmantRequestNameMenuOptions = (
    record: EnrollmentRequest,
  ): MenuOption[] => {
    return [
      {
        content: (
          <>
            <CheckCircleIcon style={{ color: green[500] }} />
            <span>Approve</span>
          </>
        ),
        onClick: () => {
          updateEnrollmentRequestStatus(record.id, 'APPROVED');
        },
        disabled: record.status !== 'WAITING',
      },
      {
        content: (
          <>
            <HighlightOffIcon style={{ color: red[500] }} />
            <span>Reject</span>
          </>
        ),
        onClick: () => {
          updateEnrollmentRequestStatus(record.id, 'REJECTED');
        },
        disabled: record.status !== 'WAITING',
      },
    ];
  };
  const tableColumnSettings: TableColumnSetting[] = [
    {
      field: 'name',
      title: 'Name',
      customRender: (record: EnrollmentRequest): JSX.Element => {
        return (
          <div className={classes.nameCell}>
            <span>{record.name}</span>
            <HelperPopover
              menuOptions={enrollmantRequestNameMenuOptions(record)}
            >
              <IconButton size='small'>
                <MoreVertIcon />
              </IconButton>
            </HelperPopover>
          </div>
        );
      },
    },
    {
      field: 'type',
      title: 'Type',
    },
    {
      field: 'status',
      title: 'Status',
    },
    {
      field: 'email',
      title: 'Email',
    },
    {
      field: 'class',
      title: 'Class',
    },
    {
      field: 'centre',
      title: 'Centre',
    },
    {
      field: 'phoneNo',
      title: 'Phone number',
    },
    {
      field: 'createdAt',
      title: 'CA',
      sortable: true,
      columnTooltipTitle: 'Created at',
      customRender: (record: EnrollmentRequest) => {
        return <>{dayjs(record.createdAt).format('DD/MM/YYYY')}</>;
      },
    },
  ];
  const handleSort = (fieldName: string, sort: SortBy) => {
    setRowsData(_.orderBy(rowsData, [fieldName], [sort]));
  };

  return (
    <div>
      <h3 className={classes.header}>EnrollmentRequest List</h3>
      <Table
        columnsSettings={tableColumnSettings}
        rowsData={rowsData}
        onSort={handleSort}
      />
    </div>
  );
};
