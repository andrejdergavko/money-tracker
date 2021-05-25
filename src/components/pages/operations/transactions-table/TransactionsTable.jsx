import React from 'react';
import { useSelector } from 'react-redux';
import { transactionsSelector } from '../../../../domain/transactions/transactionsSlice';
import { BrowseTable } from '../../../browse-table';
import { transactionsTableDataAgregstor } from './utils';

export function TransactionsTable() {
  const transactions = useSelector(transactionsSelector);

  const rows = transactionsTableDataAgregstor(transactions);

  return <BrowseTable rows={rows} />;
}
