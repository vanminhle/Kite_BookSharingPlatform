import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #d8dbdf;

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  background: var(--grey-30);
  .btn-container {
    position: relative;
  }
  .avatar-circle {
    width: 50px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 60px;
    left: -115%;
    width: 320%;
    background: var(--grey-30);
    box-shadow: var(--shadow-2);
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
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
  .logo-text {
    display: none;
    margin: 0;
    font-size: 1.5rem;
    color: var(--grey-800);
  }
  .nav-center {
    width: 90%;
  }
  .logo {
    display: none;
  }
  .logo-text {
    display: block;
  }
`;
export default Wrapper;
