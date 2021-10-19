export const transactionsTableDataAgregstor = (
  transactions,
  colorsByCategory
) => {
  return transactions.reduce((acc, item) => {
    acc.push({
      id: item.id,
      // data: [
      //   item.date || 1,
      //   item.name,
      //   item.category || '',
      //   item.sum || 0,
      //   item.currency,
      //   item.flow || 0,
      // ],
      data: {
        date: item.date || 1,
        name: item.name,
        category: item.category || '',
        sum: item.sum || 0,
        currency: item.currency,
        flow: item.flow || 0,
        categoryColor: colorsByCategory?.[item.category] || '#999',
      },
    });

    return acc;
  }, []);
};
