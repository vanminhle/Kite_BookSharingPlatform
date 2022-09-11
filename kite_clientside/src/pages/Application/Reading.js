import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, BookNotFound } from '../../components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button, Input } from 'reactstrap';
import { useEffect } from 'react';

const Reading = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);

  let { bookId } = useParams();

  useEffect(() => {
    setFile({
      url: `${API_ENDPOINT}http/api/books/reading/${bookId}`,
      withCredentials: true,
    });
  }, []);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offSet) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  };

  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(+1);
  };

  return (
    <div>
      {numPages !== null && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '13.4rem',
          }}
        >
          <Button
            color="primary"
            onClick={changePageBack}
            disabled={pageNumber < 2}
          >
            Prev
          </Button>

          <p style={{ margin: '0', display: 'flex', gap: '0.4rem' }}>
            Page
            <Input
              style={{ width: '4rem' }}
              bsSize="sm"
              type="number"
              value={pageNumber}
              min={1}
              max={numPages}
              onInput={(e) =>
                (e.target.value =
                  e.target.value > numPages || e.target.value < 1
                    ? numPages
                    : e.target.value)
              }
              onChange={(e) => setPageNumber(e.target.valueAsNumber)}
            />
            of {numPages}
          </p>

          <Button
            color="primary"
            onClick={changePageNext}
            disabled={pageNumber === numPages}
          >
            Next
          </Button>
        </div>
      )}

      <center>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          error={<BookNotFound />}
          loading={<Loading center />}
        >
          <Page height={1000} pageNumber={pageNumber} />
        </Document>
      </center>
    </div>
  );
};

export default Reading;
