import Wrapper from '../../assets/wrappers/SearchContainer';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { handleChange } from '../../features/myBooks/myBooksSlice';

const QueryMyBooksContainer = () => {
  const {
    isLoading,
    search,
    bookApprovingStatus,
    bookApprovingStatusOptions,
    sort,
    sortOptions,
  } = useSelector((store) => store.myBooks);

  const dispatch = useDispatch();

  const { control } = useForm({
    mode: 'onChange',
  });

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Wrapper>
      <Form className="form" style={{ marginBottom: '-1rem' }}>
        {/* <h5>search form</h5> */}
        <div className="form-center">
          {/* Search container */}
          <FormGroup>
            <Label for="search">Search</Label>
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
                />
              )}
            />
          </FormGroup>
          {/* filter by status */}
          <FormGroup>
            <Label for="bookApprovingStatus">Approving Status</Label>
            <Controller
              id="bookApprovingStatus"
              name="bookApprovingStatus"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={bookApprovingStatus}
                >
                  {bookApprovingStatusOptions.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue}>
                        {itemValue.charAt(0).toUpperCase() + itemValue.slice(1)}
                      </option>
                    );
                  })}
                </Input>
              )}
            ></Controller>
          </FormGroup>
          {/* sort */}
          <FormGroup>
            <Label for="sort">Sort</Label>
            <Controller
              id="sort"
              name="sort"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={sort}
                >
                  {sortOptions.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue}>
                        {itemValue.charAt(0).toUpperCase() + itemValue.slice(1)}
                      </option>
                    );
                  })}
                </Input>
              )}
            ></Controller>
          </FormGroup>
        </div>
      </Form>
    </Wrapper>
  );
};

export default QueryMyBooksContainer;
