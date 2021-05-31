import { isEmpty } from 'lodash';

export const getCategoriesOptions = (categories) => {
  return categories.reduce((acc, item) => {
    return [...acc, { label: item, id: item }];
  }, []);
};

const filterTransactionsByCategory = (transactions, categories) => {
  return transactions.filter((item) => {
    if (categories.includes(item.category)) {
      return true;
    }
    return false;
  });
};

const filterTransactionsByDateRange = (transactions, { from, to }) => {
  return transactions.filter((item) => {
    if (item.date <= to && item.date >= from) {
      return true;
    }
    return false;
  });
};

const getChartDataLoyaut = (categories) => {
  return categories.reduce((acc, item) => {
    return {
      ...acc,
      [item]: 0,
    };
  }, {});
};

export const aggregateDataToChart = (
  transactions,
  summarizeBy,
  categories,
  dateRange
) => {
  if (isEmpty(categories) || dateRange?.from == null || dateRange?.to == null) {
    return [];
  }
  let filteredTransactions = [...transactions];
  const latestDate = transactions[transactions.length - 1].date;

  filteredTransactions = filterTransactionsByCategory(
    filteredTransactions,
    categories
  );

  filteredTransactions = filterTransactionsByDateRange(
    filteredTransactions,
    dateRange
  );

  const chartData = [];
  const currentDate = new Date();
  const timestampCurentDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDay() - 1
  ).getTime();
  const chartDataLoyaut = getChartDataLoyaut(categories);

  for (
    let timePeriod = dateRange.to;
    timePeriod > dateRange.from;
    timePeriod -= summarizeBy
  ) {
    const summarizedData = filteredTransactions.reduce(
      (acc, item) => {
        if (item.date <= timePeriod && item.date > timePeriod - summarizeBy) {
          const sum = acc[item.category]
            ? acc[item.category] + item.flow
            : item.flow;

          return {
            ...acc,
            [item.category]: sum,
          };
        }
        return acc;
      },
      { date: timePeriod, ...chartDataLoyaut }
    );
    chartData.push(summarizedData);
  }

  return chartData;
};
