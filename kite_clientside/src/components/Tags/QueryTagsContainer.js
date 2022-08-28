import Wrapper from '../../assets/wrappers/SearchContainer';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { handleChange } from '../../features/tags/tagsSlice';

const QueryTagsContainer = () => {
  const { isLoading, search, group, groupOptions, sort, sortOptions } =
    useSelector((store) => store.tags);

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
          {/* Group with */}
          <FormGroup>
            <Label for="group">Group</Label>
            <Controller
              id="group"
              name="group"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={group}
                >
                  {groupOptions.map((itemValue, index) => {
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

export default QueryTagsContainer;
