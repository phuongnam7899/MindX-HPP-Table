import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  nameCell: {
    display: 'flex',
    minWidth: '150px',
    justifyContent: 'space-between',
    '& .MuiIconButton-root': {
      display: 'none',
    },
    'tr:hover & .MuiIconButton-root': {
      display: 'inline-block',
    },
  },
}));
