import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: flex;
  box-shadow: var(--shadow-1);
  position: relative;
  transition: var(--transition);

  :hover {
    box-shadow: var(--shadow-3);
  }

  .book-details {
    width: 100%;
  }

  .book-cover {
    width: 25%;
    height: 100%;
    object-fit: cover;
  }

  .header {
    padding: 0;
  }

  .info {
    margin-bottom: 0;
    letter-spacing: 0;
    padding: 1.5rem 1.5rem 0 1.5rem;

    h5 {
      margin-bottom: 2rem;
      font-weight: 500;
    }
  }

  .content {
    position: absolute;
    padding-left: 1.5rem;
    bottom: 4.2rem;
  }

  .content-center {
    display: flex;
    gap: 1rem;
  }

  .content-bottom {
    margin-bottom: 0.2rem;
  }

  .pending {
    background: #fcefc7;
    color: #ba943a;
  }
  .approved {
    background: #e0e8f9;
    color: #5a6db6;
  }
  .rejected {
    background: #ffeeee;
    color: #c05f5f;
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    padding: 4px;
  }

  footer {
    position: absolute;
    padding-left: 1.5rem;
    bottom: 1.25rem;
    display: flex;
    gap: 3.2rem;
  }

  .actions .btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
