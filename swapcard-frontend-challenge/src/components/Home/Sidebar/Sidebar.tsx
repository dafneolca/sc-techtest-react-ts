import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import FullArtistProfile from '../FullArtistProfile/FullArtistProfile'
import './Sidebar.css';
import { render } from '@testing-library/react';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



const Sidebar = (props: any) => {
  // export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  type DrawerSide = 'left';
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const favorites = localStorage.getItem('favorites');
  const favoritesArray = favorites !== null ? JSON.parse(favorites) : null

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {favoritesArray?.map((artist: any) => (
          <Link to={
            { pathname: artist.id, state: { name: artist.name, id: artist.id } }}
            key={artist.id}>
            <Route
              exact
              path=':/id'
              component={FullArtistProfile}
            />
            <ListItem button key={artist.id}>
              <ListItemText primary={artist.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div >
  );

  return (
    <div>
      <div className='favoritesButton'>
        <Button variant="outlined" onClick={toggleDrawer('left', true)}>Favorites</Button>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      {/* <Switch> */}
      {/* <Route exact path="/:id" component={FullArtistProfile} /> */}
      {/* </Switch> */}
    </div>
  );
}

export default Sidebar;