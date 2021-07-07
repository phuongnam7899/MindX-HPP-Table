import makeStyles from '@material-ui/core/styles/makeStyles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  table: {
    padding: theme.spacing(1),
    width: '100%',
    borderSpacing: 0,
    fontSize: '14px',
    '& tr td, & tr th': {
      textAlign: 'start',
      borderBottom: `1px solid ${grey[300]}`,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      lineHeight: '36px',
    },
    '& tr:hover > td': {
      background: grey[100],
    },
  },
  cell: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      display: 'none',
      cursor: 'pointer',
    },
    '&:hover .MuiSvgIcon-root': {
      display: 'inline',
    },
  },
}));
