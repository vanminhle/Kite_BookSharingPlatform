import Wrapper from '../assets/wrappers/SearchContainer';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  handleChange,
  clearFilters,
} from '../features/allAccounts/allAccountsSlice';

const QueryAccountContainer = () => {
  const {
    isLoading,
    search,
    searchValue,
    searchOptions,
    accountStatus,
    accountStatusOptions,
    confirmedStatus,
    confirmedStatusOptions,
    role,
    roleOptions,
  } = useSelector((store) => store.allAccounts);

  const dispatch = useDispatch();

  const { control } = useForm({
    mode: 'onChange',
  });

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleClear = () => {
    dispatch(clearFilters());
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
            <Label for="searchValue">Search Options</Label>
            <Controller
              id="searchValue"
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
                        {itemValue.charAt(0).toUpperCase() + itemValue.slice(1)}
                      </option>
                    );
                  })}
                </Input>
              )}
            ></Controller>
          </FormGroup>
          {/* filter by account status */}
          <FormGroup>
            <Label for="confirmedStatus">Confirmed Status</Label>
            <Controller
              id="confirmedStatus"
              name="confirmedStatus"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={confirmedStatus}
                >
                  {confirmedStatusOptions.map((itemValue, index) => {
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
          {/* filter by confirmed options */}
          <FormGroup>
            <Label for="accountStatus">Accounts Status</Label>
            <Controller
              id="accountStatus"
              name="accountStatus"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={accountStatus}
                >
                  {accountStatusOptions.map((itemValue, index) => {
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
          {/* filter by role */}
          <FormGroup>
            <Label for="role">Role</Label>
            <Controller
              id="role"
              name="role"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  onChange={handleSearch}
                  value={role}
                >
                  {roleOptions.map((itemValue, index) => {
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
          {/* button */}
          <Button className="btn-block" color="danger" onClick={handleClear}>
            Clear Filters
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default QueryAccountContainer;
