import * as React from 'react';
import { useDispatch } from 'react-redux';
import { FileUploader } from 'baseui/file-uploader';
import { Button } from 'baseui/button';
import { setTransactions } from '../../../domain/transactions/transactionsSlice';

import { getTransactionsFromCsv } from './utils';

export function FileLoader() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [file, setFile] = React.useState();
  const dispatch = useDispatch();

  const handleFileLoad = async () => {
    if (!file[0].path) {
      return;
    }

    const parsedTransactions = await getTransactionsFromCsv(file[0].path);
    dispatch(setTransactions({ newTransactions: parsedTransactions }));
  };

  return (
    <div>
      <FileUploader
        errorMessage={errorMessage}
        onDrop={(acceptedFiles, rejectedFiles) => {
          if (acceptedFiles) {
            setFile(acceptedFiles);
          } else {
            setFile();
          }
        }}
      />
      <Button
        onClick={handleFileLoad}
        disabled={!file}
        overrides={{
          BaseButton: {
            style: {
              width: '100%',
              marginTop: '10px',
              marginBottom: '20px',
            },
          },
        }}
      >
        Load file
      </Button>
    </div>
  );
}
