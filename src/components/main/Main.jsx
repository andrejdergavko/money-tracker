import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Operations } from '../pages/operations';
import { Statistics } from '../pages/statistics';

export function Main() {
  return (
    <Switch>
      <Route path="/statistic">
        <Statistics />
      </Route>
      <Route path="/">
        <Operations />
      </Route>
    </Switch>
  );
}
