import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
    font-weight: 400;
  }
  p {
    margin-top: 1.5rem;
    margin-bottom: 0;
    margin-left: 6px;
    padding: 0;
  }
  .btn {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .member-section {
    border-top: 1px solid var(--grey-200);
    text-align: center;
    margin-top: 1rem;
  }
  .help-quote {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 15px;
  }
  .validation-popup {
    margin-bottom: 1.3rem;
    margin-top: -0.5rem;
    opacity: 1;
    transition: opacity 0.15s linear;
    background-color: #d10000;
    color: white;
    font-size: 13px;
    padding: 0.3rem 0.75rem;
    border-radius: var(--borderRadius);
  }
  .social-login {
    margin-bottom: 2rem;
  }
  .divider {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  .divider:after,
  .divider:before {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }
  .text-divider {
    text-align: center;
    font-weight: 700;
    margin: 0 1rem 0 1rem;
    color: #6c757d;
  }
  .google-login,
  .microsoft-login {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    background-color: #db4a39;
  }
  .microsoft-login {
    background-color: #008fed;
  }
  .google-text,
  .microsoft-text {
    margin-top: 0;
    font-weight: 400;
  }
`;
export default Wrapper;
