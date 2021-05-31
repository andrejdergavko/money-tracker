import React from 'react';
import { Block } from 'baseui/block';
import { format } from 'date-fns';

export function Tooltip({ barData }) {
  const keys = Object.keys(barData).filter((d) => d !== 'date');

  const sortKeys = keys.sort((a, b) => barData[a] - barData[b]);

  return (
    <Block padding="5px" font="font200">
      <Block display="flex" justifyContent="space-between">
        <Block marginRight="10px">Date</Block>
        <Block>{format(new Date(barData.date), 'dd-MM-yyyy')}</Block>
      </Block>

      {sortKeys.map((key) => {
        if (barData[key]) {
          return (
            <Block key={key} display="flex" justifyContent="space-between">
              <Block>{key}</Block>
              <Block>{barData[key].toFixed(1)}</Block>
            </Block>
          );
        }
      })}
    </Block>
  );
}
