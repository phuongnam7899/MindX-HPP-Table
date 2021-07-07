import { useState } from 'react';
import { values, orderBy } from 'lodash';
import dayjs from 'dayjs';
import {
  Table,
  TableColumnSetting,
  HelperPopover,
  MenuOption,
  IconButton,
} from '@app/core/components';
import {
  MoreVertIcon,
  HighlightOffIcon,
  CheckCircleIcon,
} from '@app/core/icons';
import { green, red } from '@app/core/colors';
import { SortOrder } from '@app/core/interfaces';
import {
  EnrollmentRequest,
  EnrollmentRequestStatus,
} from '@app/modules/enrollment-requests/interfaces';
import { useStyles } from './styles';

const fakeRowData = {
  name: 'Nguyen Van A',
  type: 'ENROLLMENT',
  status: 'WAITING' as EnrollmentRequestStatus,
  email: 'phuongnam7899@gmail.com',
  course: 'Code for everyone',
  class: 'C4E-24',
  centre: '22C TC',
  phoneNo: '0981038589',
};

const fakeRowsData: Record<string, EnrollmentRequest> = {};

for (let i = 1; i < 21; i++) {
  fakeRowsData[`er${i}`] = {
    ...fakeRowData,
    id: `er${i}`,
    createdAt: dayjs().add(i, 'day').toISOString(),
  };
}

export const EnrollmentRequestsScreen = (): JSX.Element => {
  const classes = useStyles();

  const [rowsData, setRowsData] = useState(fakeRowsData);

  const updateEnrollmentRequestStatus = (
    recordId: string,
    newStatus: EnrollmentRequestStatus,
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
            <CheckCircleIcon
              style={{ color: green[500], marginRight: '0.5rem' }}
            />
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
            <HighlightOffIcon
              style={{ color: red[500], marginRight: '0.5rem' }}
            />
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

  const tableColumnSettings: TableColumnSetting<EnrollmentRequest>[] = [
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

  const handleSort = (fieldName: string, sort: SortOrder) => {
    setRowsData(orderBy(rowsData, [fieldName], [sort]));
  };

  return (
    <div>
      <h3 className={classes.header}>EnrollmentRequest List</h3>
      <Table
        columnsSettings={tableColumnSettings}
        rowsData={values(rowsData)}
        onSort={handleSort}
      />
    </div>
  );
};
