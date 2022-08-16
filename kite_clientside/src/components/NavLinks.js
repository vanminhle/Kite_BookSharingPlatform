import { NavLink } from 'react-router-dom';
import { linksAdmin, linksManager, links } from '../utils/links';
import { useSelector } from 'react-redux';

const NavLinks = () => {
  let listLink;
  const { user } = useSelector((store) => store.user);

  if (user.role === 'admin') listLink = linksAdmin;
  if (user.role === 'manager') listLink = linksManager;
  if (user.role === 'customer') listLink = links;

  return (
    <div className="nav-links">
      {listLink.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
