import * as React from 'react';
import { Navigation } from 'baseui/side-navigation';
import { useLocation, useHistory } from 'react-router';

export function SideBar() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Navigation
      items={[
        {
          title: 'Operations',
          itemId: '/',
        },
        {
          title: 'Statistic',
          itemId: '/Statistic',
        },
      ]}
      activeItemId={location.pathname}
      onChange={({ event, item }) => {
        event.preventDefault();
        history.push(item.itemId);
      }}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.primary50,
          }),
        },
      }}
    />
  );
}
