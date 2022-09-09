import Wrapper from '../../../assets/wrappers/MyBooks';
import {
  BrowseBooksContainer,
  QueryBrowseBooksContainer,
} from '../../../components';

const Browse = () => {
  return (
    <Wrapper>
      <QueryBrowseBooksContainer />
      <BrowseBooksContainer />
    </Wrapper>
  );
};

export default Browse;
