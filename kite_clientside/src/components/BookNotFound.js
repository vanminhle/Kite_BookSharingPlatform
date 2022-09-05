import img from '../assets/images/noData.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper style={{ marginTop: '8rem' }}>
      <div>
        <img
          src={img}
          alt="not found"
          style={{ maxWidth: '30%', display: 'inline' }}
        />
        <h3 style={{ marginTop: '2rem' }}>Book Not Exists</h3>
        <p style={{ display: 'inline', textAlign: 'center' }}>
          We can't seem to find the book you are looking for
        </p>
      </div>
    </Wrapper>
  );
};

export default Error;
