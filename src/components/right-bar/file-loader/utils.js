import csv from 'csv-parser';
import fs from 'fs';

const formatSum = (numberInString) => {
  const stringWithoutSpase = numberInString.replace(/\s/g, '');
  return Number(stringWithoutSpase.replace(',', '.'));
};

const formatDate = (date) => {
  if (date == null) {
    return '';
  }
  const dateWithoutHours = date.split(' ')[0];
  const yesr = dateWithoutHours.split('.')[2];
  const month = dateWithoutHours.split('.')[1];
  const day = dateWithoutHours.split('.')[0];

  return new Date(yesr, month - 1, day).getTime();
};

export const getTransactionsFromCsv = async (path) => {
  const transactions = [];

  return new Promise((resolve) => {
    fs.createReadStream(path)
      .pipe(csv({ separator: ';', headers: false }))
      .on('data', (data) => {
        const transaction = {
          date: data?.[0] && formatDate(data?.[0]),
          name: data?.[1],
          sum: data?.[2] && formatSum(data?.[2]),
          currency: data?.[3],
          flow: data?.[6] && formatSum(data?.[6]),
        };
        transactions.push(transaction);
      })
      .on('end', () => {
        resolve(transactions);
      });
  });
};
