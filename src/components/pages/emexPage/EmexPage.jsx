import React from 'react';
import { Block } from 'baseui/block';
import { QueryBuilder } from '../../query-builder';
import { RightBar } from '../../right-bar';
import { BrowseTable } from '../../browse-table';

export function EmexPage() {
  return (
    <Block
      display="grid"
      height="100%"
      gridTemplateColumns="1fr 300px"
      gridTemplateRows="115px 1fr"
    >
      <Block>
        <QueryBuilder />
      </Block>
      <Block gridColumn="2/3" gridRow="1/3">
        <RightBar />
      </Block>
      <Block>
        <BrowseTable />
      </Block>
    </Block>
  );
}
