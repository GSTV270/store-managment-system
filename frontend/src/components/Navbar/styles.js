import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    color: '#3f51b5',
  },
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#3f51b5',
  },
}));
