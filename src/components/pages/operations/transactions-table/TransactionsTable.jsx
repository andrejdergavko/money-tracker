import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { transactionsSelector } from '../../../../domain/transactions/transactionsSlice';
import { BrowseTable } from '../../../browse-table';
import { transactionsTableDataAgregstor } from './utils';
import { CategorySelectionModal } from '../../../category-selection-modal';

export function TransactionsTable() {
  const transactions = useSelector(transactionsSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);

  const rows = transactionsTableDataAgregstor(transactions);

  const onSetCategoryButtonClick = (rowsIds) => {
    setSelectedRowsIds(rowsIds);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedRowsIds([]);
  };

  return (
    <>
      <BrowseTable
        rows={rows}
        handleSetCategoryButtonClick={onSetCategoryButtonClick}
      />
      <CategorySelectionModal
        transactionsIds={selectedRowsIds}
        isOpen={isModalOpen}
        close={onModalClose}
      />
    </>
  );
}
