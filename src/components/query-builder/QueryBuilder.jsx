import React from 'react';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import { DatePicker } from 'baseui/datepicker';
import { SIZE } from 'baseui/input';
import { ButtonGroup, MODE } from 'baseui/button-group';

import { Button } from 'baseui/button';

import { organizationsOptions, ALL_ORGANIZATIONS } from '../constants';

export function QueryBuilder() {
  const [organization, setOrganization] = React.useState(
    organizationsOptions.filter((item) => item.id === ALL_ORGANIZATIONS)
  );
  const [dateFrom, setDateFrom] = React.useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return [date];
  });
  const [dateTo, setDateTo] = React.useState([new Date()]);
  const [selected, setSelected] = React.useState();

  const changeDate = (from, to) => {
    setDateFrom([from]);
    setDateTo([to]);
  };

  return (
    <Block
      display="grid"
      gridTemplateColumns="minmax(100px, 200px) 110px 110px 3fr"
      gridColumnGap="10px"
      margin="15px"
      alignItems="end"
    >
      <Block>
        <FormControl label="Организация:">
          <Select
            id="organizationSelect"
            value={organization}
            onChange={({ value }) => setOrganization(value)}
            options={organizationsOptions}
            size={SIZE.compact}
            labelKey="label"
            valueKey="id"
            clearable={false}
            placeholder=""
          />
        </FormControl>
      </Block>
      <Block>
        <FormControl label="Период c:">
          <DatePicker
            value={dateFrom}
            onChange={({ date }) => {
              setDateFrom(Array.isArray(date) ? date : [date]);
              setSelected(null);
            }}
            size={SIZE.compact}
          />
        </FormControl>
      </Block>
      <Block>
        <FormControl label="Период по:">
          <DatePicker
            value={dateTo}
            onChange={({ date }) => {
              setDateTo(Array.isArray(date) ? date : [date]);
              setSelected(null);
            }}
            size={SIZE.compact}
          />
        </FormControl>
      </Block>
      <Block>
        <FormControl>
          <ButtonGroup
            size={SIZE.compact}
            mode={MODE.radio}
            selected={selected}
            onClick={(event, index) => {
              const date = new Date();
              date.setDate(date.getDate() - event.target.value);
              changeDate(date, new Date());
              setSelected(index);
            }}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(70px, 100px)) ',
                }),
              },
            }}
          >
            <Button value="1">за 1 день</Button>
            <Button value="7">за 7 день</Button>
            <Button value="30">за 30 день</Button>
            <Button value="365">за год</Button>
          </ButtonGroup>
        </FormControl>
      </Block>
    </Block>
  );
}
