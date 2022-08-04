import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Button } from 'reactstrap';

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>Kite</h1>
            <h2>
              A <span>Book Sharing</span> Platform
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
              placeat officiis voluptate porro nesciunt maiores qui modi. Facere
              ex et temporibus nulla sit quisquam laborum vel, aut, illum
              facilis, modi expedita cupiditate magnam recusandae? Reiciendis?
            </p>
            <Link to="/authentication">
              <Button className="btn-hero">Get Started</Button>
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
