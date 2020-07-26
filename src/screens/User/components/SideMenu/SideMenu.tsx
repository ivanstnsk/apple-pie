import * as React from 'react';
import * as Router from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { useStyles } from './styles';

const getUserAvatarSymbols = (name: string): string => {
  const n = name.split(' ');
  return n.reduce((acc, value) => acc += value.substring(0, 1).toUpperCase(), '');
}

const renderItems = (getNavigateClickHandler: (path: string) => () => void): JSX.Element => (
  <>
    <ListItem button onClick={getNavigateClickHandler('/planning')}>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Планування" />
    </ListItem>
    <ListItem button onClick={getNavigateClickHandler('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Дашборд" />
    </ListItem>
  </>
);

interface Props {
  drawerOpen: boolean;
  userName: string;
  onDrawerToggleClick: () => void;
}

export const SideMenu: React.FC<Props> = ({
  drawerOpen,
  userName,
  onDrawerToggleClick,
}) => {
  const classes = useStyles();
  const history = Router.useHistory();

  const drawerClasses = {
    paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
  };
  const userNameClasses = clsx(classes.userName, !drawerOpen && classes.userNameHidden);
  const dateClasses = clsx(classes.date, !drawerOpen && classes.dateHidden);

  const getNavigateClickHandler = React.useCallback((path: string) => () => {
    history.push(path);
  }, [history]);

  return (
    <Drawer
      variant="permanent"
      classes={drawerClasses}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onDrawerToggleClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.userContainer}>
        <Avatar>{getUserAvatarSymbols(userName)}</Avatar>
        <div className={userNameClasses}>
          <Typography variant="h6">{userName}</Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.dateContainer}>
        <div className={dateClasses}>
          <Typography variant="body2">Липень 2020</Typography>
        </div>
      </div>
      <Divider />
      <List>
        {renderItems(getNavigateClickHandler)}
      </List>
    </Drawer>
  );
}