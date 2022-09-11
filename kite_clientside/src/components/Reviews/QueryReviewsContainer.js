import Wrapper from '../../assets/wrappers/SearchContainer';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { handleChange } from '../../features/reviews/reviewsSlice';

const QueryTransactionsContainer = () => {
  const { isLoading, searchValue, search, searchOptions, sort, sortOptions } =
    useSelector((store) => store.reviews);

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
      <Form className="form">
        {/* <h5>search form</h5> */}
        <div className="form-center">
          {/* Search container */}
          <FormGroup>
            <Label for="searchString">Search</Label>
            <Controller
              id="searchString"
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
          {/* Search with */}
          <FormGroup>
            <Label for="searchOptions">Options</Label>
            <Controller
              id="searchOptions"
              name="searchValue"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={searchValue}
                >
                  {searchOptions.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue}>
                        {itemValue}
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
                        {itemValue}
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

export default QueryTransactionsContainer;
