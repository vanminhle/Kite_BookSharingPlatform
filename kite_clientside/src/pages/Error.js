import { Link } from 'react-router-dom';
import img from '../assets/images/404.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Button } from 'reactstrap';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to="/">
          <Button>Back Home</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
