export const transactionsTableDataAgregstor = (transactions) => {
  return transactions.reduce((acc, item) => {
    acc.push({
      id: item.id,
      data: [item.date, item.name, item.category, item.sum, item.currency],
    });

    return acc;
  }, []);
};
