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
      display: 'inline-block',
      visibility: 'hidden',
    },
    'tr:hover & .MuiIconButton-root': {
      visibility: 'visible',
    },
  },
}));
