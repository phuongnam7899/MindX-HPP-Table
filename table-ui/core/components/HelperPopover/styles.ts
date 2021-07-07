import makeStyles from '@material-ui/core/styles/makeStyles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  popoverContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  popoverContent: {},
  popoverTitle: {},
  menuContainer: {
    position: 'absolute',
    display: 'none',
    flexDirection: 'column',
    width: 'max-content',
    backgroundColor: '#fff',
    boxShadow: `0 0 8px ${grey[400]}`,
    borderRadius: '1px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: grey[200],
    },
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
  },
  disabled: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
}));
