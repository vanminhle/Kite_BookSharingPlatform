import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Landing,
  Error,
  Authentication,
  Home,
  VerificationOK,
  NeedHelp,
} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route
            path="/emailVerification/Success"
            element={<VerificationOK />}
          />
          <Route path="/needHelp" element={<NeedHelp />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
