import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { EmexPage } from '../pages/emexPage';

export function Main() {
  return (
    <Switch>
      <Route path="/armtek">Armtek</Route>
      <Route path="/">
        <EmexPage />
      </Route>
    </Switch>
  );
}
