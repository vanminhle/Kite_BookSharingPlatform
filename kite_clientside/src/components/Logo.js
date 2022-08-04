import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to="/landing">
      <img src={logo} alt="Kite Logo" className="logo" />
    </Link>
  );
};

export default Logo;
