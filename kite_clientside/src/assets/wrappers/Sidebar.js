import styled from 'styled-components';

const Wrapper = styled.aside`
  position: relative;
  display: none;
  display: block;
  box-shadow: 3px 0px 30px -15px rgb(0 0 0 / 24%);

  .sidebar-container {
    background: var(--grey-10);
    min-height: 100vh;
    height: 100%;
    width: 260px;
    margin-left: -250px;
    transition: var(--transition);
    margin-left: 0;
  }
  .content {
    position: sticky;
    top: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }
  .logo {
    width: 80%;
    margin-top: 1.5rem;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    background: var(--grey-100);
    padding-left: 3rem;
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
  .btn-container {
    position: fixed;
    bottom: 2rem;
    margin-left: 2.2rem;
    padding: 0.5rem;
    padding-right: 0.7rem;
    width: 11.7%;
    background: var(--grey-70);
    border-radius: 5%;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .btn-container-text {
    margin-bottom: 0;
    font-weight: 400;
    font-size: 1.17rem;
    padding-top: 0.1rem;
    color: var(--grey-600);
  }
  .btn-container-text:hover {
    color: var(--grey-900);
    transition: var(--transition);
  }
  .avatar-circle {
    width: 50px;
    border-radius: 50%;
    border: 0.1px solid var(--grey-100);
  }
  .dropdown {
    position: absolute;
    left: 0rem;
    bottom: 5rem;
    background: var(--grey-5);
    box-shadow: var(--shadow-1);
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    width: 100%;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
    transition: none;
  }
  .dropdown:hover {
    box-shadow: var(--shadow-3);
    transition: var(--transition);
  }
  .show-dropdown {
    visibility: visible;
    transition: var(--transition);
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--grey-800);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .dropdown-btn:hover {
    color: var(--black);
    font-weight: 500;
  }
`;
export default Wrapper;
