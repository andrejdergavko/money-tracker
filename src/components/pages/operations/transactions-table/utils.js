export const transactionsTableDataAgregstor = (transactions) => {
  return transactions.reduce((acc, item) => {
    acc.push({
      id: item.id,
      data: [
        item.date || 1,
        item.name,
        item.category || '',
        item.sum || 0,
        item.currency,
        item.flow || 0,
      ],
    });

    return acc;
  }, []);
};
