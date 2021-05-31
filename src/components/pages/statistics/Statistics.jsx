import * as React from 'react';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker } from 'baseui/datepicker';
import { Select } from 'baseui/select';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Checkbox, LABEL_PLACEMENT, STYLE_TYPE } from 'baseui/checkbox';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { categoriesSelector } from '../../../domain/categories/categoriesSlice';
import { transactionsSelector } from '../../../domain/transactions/transactionsSlice';
import { BarGroupChart } from '../../bar-group-chart';
import { getCategoriesOptions, aggregateDataToChart } from './utils';
import { summarizeByOptions, MONTH_IN_MILLISECONDS } from './constants';

export const Statistics = () => {
  const allCategories = useSelector(categoriesSelector);
  const categoriesOptions = getCategoriesOptions(allCategories);

  const transactions = useSelector(transactionsSelector);

  const [dateRange, setDateRange] = React.useState({
    from: new Date(new Date().getTime() - MONTH_IN_MILLISECONDS),
    to: new Date(),
  });
  const [categories, setCategories] = React.useState([]);
  const [summarizeBy, setSummarizeBy] = React.useState([summarizeByOptions[0]]);
  const [isBarTypeStack, setIsBarTypeStack] = React.useState(false);

  const setAllCategories = () => {
    setCategories([...categoriesOptions]);
  };

  const chartData = aggregateDataToChart(
    transactions,
    summarizeBy[0].id,
    categories.map((i) => i.label),
    {
      from: dateRange.from.getTime(),
      to: dateRange.to.getTime(),
    }
  );

  return (
    <Block
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="120px 1fr"
      width="100%"
      height="100%"
    >
      <Block margin="10px" display="flex">
        <Block width="130px" marginRight="10px">
          <FormControl label={() => 'From'}>
            <DatePicker
              value={dateRange.from}
              onChange={({ date }) =>
                setDateRange({
                  ...dateRange,
                  from: date,
                })
              }
              quickSelect
              formatString="dd-MM-yyyy"
            />
          </FormControl>
        </Block>
        <Block width="130px" marginRight="10px">
          <FormControl label={() => 'To'}>
            <DatePicker
              value={dateRange.to}
              onChange={({ date }) =>
                setDateRange({
                  ...dateRange,
                  to: date,
                })
              }
              quickSelect
              formatString="dd-MM-yyyy"
            />
          </FormControl>
        </Block>
        <Block maxWidth="800px" minWidth="400px" marginRight="10px">
          <FormControl label={() => 'Categories'}>
            <Block display="flex">
              <Select
                options={categoriesOptions}
                value={categories}
                placeholder="Category"
                onChange={(params) => setCategories(params.value)}
                multi
                filterOutSelected={false}
                closeOnSelect={false}
                searchable={false}
              />
              <Block width="100px">
                <Button onClick={setAllCategories}>Set all</Button>
              </Block>
            </Block>
          </FormControl>
        </Block>
        <Block width="150px" marginRight="10px">
          <FormControl label={() => 'Summarize by'}>
            <Select
              options={summarizeByOptions}
              value={summarizeBy}
              placeholder="Summarize by"
              onChange={(params) => setSummarizeBy(params.value)}
              clearable={false}
            />
          </FormControl>
        </Block>
        <Block width="100px" marginRight="10px">
          <FormControl label={() => 'Bar type'}>
            <Checkbox
              checked={isBarTypeStack}
              onChange={() => setIsBarTypeStack(!isBarTypeStack)}
              labelPlacement={LABEL_PLACEMENT.right}
              checkmarkType={STYLE_TYPE.toggle_round}
            >
              Stack
            </Checkbox>
          </FormControl>
        </Block>
      </Block>
      <Block
        display="flex"
        alignItems="center"
        margin="10px"
        padding="20px"
        paddingRight="35px"
        backgroundColor="primary50"
      >
        {!isEmpty(chartData) && (
          <ParentSize>
            {({ width, height }) => (
              <BarGroupChart
                data={chartData}
                width={width}
                height={height - 10}
                isBarTypeStack={isBarTypeStack}
              />
            )}
          </ParentSize>
        )}
      </Block>
    </Block>
  );
};
