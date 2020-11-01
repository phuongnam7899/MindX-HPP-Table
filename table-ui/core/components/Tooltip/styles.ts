import makeStyles from '@material-ui/core/styles/makeStyles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  tooltipContent: {},
  tooltipTitle: {
    width: 'max-content',
    display: 'none',
    borderRadius: '2px',
    fontSize: '12px',
    position: 'absolute',
    fontWeight: 400,
    padding: `0 ${theme.spacing(1)}px`,
    background: grey[900],
    color: '#fff',
  },
}));
