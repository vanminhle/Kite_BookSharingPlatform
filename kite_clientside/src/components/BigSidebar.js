import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container">
        <div className="content">
          <header>
            <Logo className="logo-sidebar" />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
