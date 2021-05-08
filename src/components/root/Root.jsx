import * as React from 'react';
import { Block } from 'baseui/block';
import { Header } from '../header';
import { SideBar } from '../sideBar';
import { Main } from '../main';

const Root = () => {
  return (
    <Block
      display="grid"
      gridTemplateColumns="140px 1fr"
      gridTemplateRows="49px 1fr"
      height="100vh"
    >
      <Block gridColumn="1/3">
        <Header />
      </Block>
      <SideBar />
      <Main />
    </Block>
  );
};

export { Root };
