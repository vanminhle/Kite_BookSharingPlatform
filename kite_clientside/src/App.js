import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import {
  Landing,
  Error,
  Authentication,
  Home,
  VerificationOK,
  NeedHelp,
  Helper,
  ResetPassword,
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

          <Route path="/need-help" element={<NeedHelp />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/email-verification/success"
            element={<VerificationOK />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
