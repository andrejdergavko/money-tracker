import React, { useState } from 'react';
import { Block } from 'baseui/block';
import { Button, SIZE } from 'baseui/button';
import { useStyletron } from 'baseui';
import { Input } from 'baseui/input';
import { LabelMedium } from 'baseui/typography';

export function PrintButtonBlock() {
  const [, theme] = useStyletron();
  const [subId, setSubId] = useState('');

  return (
    <Block>
      <Block
        marginTop="10px"
        marginBottom="10px"
        overrides={{
          Block: {
            style: { borderBottom: `2px solid ${theme.colors.primary200}` },
          },
        }}
      >
        <form
          onSubmit={() => {
            console.log(subId);
            setSubId('');
          }}
        >
          <LabelMedium marginTop="10px" marginBottom="10px">
            {' '}
            Печать по штрихкоду
          </LabelMedium>
          <Input
            value={subId}
            onChange={(e) => setSubId(e.target.value)}
            placeholder="SubID"
            clearOnEscape
          />
          <Button
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: {
                  width: '100%',
                  marginTop: '10px',
                  marginBottom: '20px',
                },
              },
            }}
          >
            Печать
          </Button>
        </form>
      </Block>
      <Block>
        <Button
          size={SIZE.compact}
          overrides={{
            BaseButton: {
              style: { width: '100%', marginTop: '10px', marginBottom: '10px' },
            },
          }}
        >
          Печать выбранных
        </Button>
      </Block>
      <Block>
        <Button
          size={SIZE.compact}
          overrides={{
            BaseButton: { style: { width: '100%' } },
          }}
        >
          Печать всех
        </Button>
      </Block>
    </Block>
  );
}
