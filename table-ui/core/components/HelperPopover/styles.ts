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
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    width: 'max-content',
    backgroundColor: '#fff',
    boxShadow: `0 0 8px ${grey[400]}`,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer',
    '&:hover span': {
      color: grey[700],
    },
  },
  disabled: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
}));
