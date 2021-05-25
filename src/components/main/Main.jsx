import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Operations } from '../pages/operations';

export function Main() {
  return (
    <Switch>
      <Route path="/statistic">statistic</Route>
      <Route path="/">
        <Operations />
      </Route>
    </Switch>
  );
}
