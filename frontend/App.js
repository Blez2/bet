import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BetsPage from './src/BetsPage';
import UserProfilePage from './src/UserProfilePage';
import CollectiblesPage from './src/CollectiblesPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bets" component={BetsPage} />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/collectibles" component={CollectiblesPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;