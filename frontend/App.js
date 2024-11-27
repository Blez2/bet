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
        <Route path="/" exact render={() => <h1>Welcome to the React Betting App</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
