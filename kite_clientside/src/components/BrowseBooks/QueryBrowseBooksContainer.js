import { Form, FormGroup, Input, FormText } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { handleChange } from '../../features/browseBooks/browseBooksSlice';
import { BiSearch } from 'react-icons/bi';

const QueryBrowseBooksContainer = () => {
  const { isLoading, search } = useSelector((store) => store.browseBooks);

  const dispatch = useDispatch();

  const { control } = useForm({
    mode: 'onChange',
  });

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Form>
      {/* <h5>search form</h5> */}
      <div>
        {/* Search container */}
        <FormGroup>
          <Controller
            id="search"
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                onChange={handleSearch}
                value={search}
                placeholder="Search with Book Title or Author"
                style={{
                  textAlign: 'center',
                  placeholder: 'center',
                  height: '3rem',
                  fontSize: '1.005rem',
                }}
              />
            )}
          />
          <BiSearch
            style={{
              width: '2%',
              height: '2%',
              position: 'absolute',
              right: '0.7rem',
              top: '-0.1rem',
            }}
          />
        </FormGroup>
      </div>
    </Form>
  );
};

export default QueryBrowseBooksContainer;
