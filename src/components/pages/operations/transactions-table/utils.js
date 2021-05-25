export const transactionsTableDataAgregstor = (transactions) => {
  return transactions.reduce((acc, item) => {
    acc.push({
      id: item.name,
      data: [item.date, item.name, item.sum, item.currency],
    });

    return acc;
  }, []);
};
