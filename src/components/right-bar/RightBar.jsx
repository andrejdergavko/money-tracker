import React from 'react';
import { Block } from 'baseui/block';
import { Card, StyledBody } from 'baseui/card';
import { useStyletron } from 'baseui';

import { PrintButtonBlock } from './print-button-block';

export function RightBar() {
  const [css, theme] = useStyletron();
  return (
    <Block
      className={css({
        backgroundColor: theme.colors.primary50,
        padding: '15px',
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <Card>
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl.
        </StyledBody>
      </Card>
      <PrintButtonBlock />
    </Block>
  );
}
