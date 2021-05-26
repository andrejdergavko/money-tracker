import React from 'react';
import { Block } from 'baseui/block';
import { QueryBuilder } from '../../query-builder';
import { RightBar } from '../../right-bar';
import { TransactionsTable } from './transactions-table';

export function Operations() {
  return (
    <Block display="grid" height="100%" gridTemplateColumns="1fr 250px">
      <Block height="100%" gridColumn="2/3" gridRow="1/3">
        <RightBar />
      </Block>
      <Block height="100%">
        <TransactionsTable />
      </Block>
    </Block>
  );
}
