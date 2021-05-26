import * as React from 'react';
import { Button } from 'baseui/button';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';

import { categoriesSelector } from '../../domain/categories/categoriesSlice';
import { setTransactionsCategory } from '../../domain/transactions/transactionsSlice';

// eslint-disable-next-line react/prop-types
export function CategorySelectionModal({ isOpen, close, transactionsIds }) {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);

  const [category, setCategory] = React.useState(categories[0]);

  const handleCategorySet = () => {
    dispatch(setTransactionsCategory({ category, transactionsIds }));
    close();
  };

  return (
    <>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>Set category</ModalHeader>
        <ModalBody>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            name="number"
            align={ALIGN.vertical}
          >
            {categories.map((item) => {
              return (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              );
            })}
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton onClick={handleCategorySet}>Set</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
