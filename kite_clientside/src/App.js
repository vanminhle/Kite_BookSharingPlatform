import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import {
  Landing,
  Error,
  Authentication,
  VerificationOK,
  NeedHelp,
  Helper,
  ResetPassword,
  ProtectedRoute,
} from './pages';
import { SharedLayout, Stats, UserAccount } from './pages/Application';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="/my-account" element={<UserAccount />} />
          </Route>

          <Route path="/landing" element={<Landing />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/authentication/:data" element={<Authentication />} />

          <Route path="/need-help" element={<NeedHelp />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/email-verification/success"
            element={<VerificationOK />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} limit={1} />
      </BrowserRouter>
    </div>
  );
}

export default App;
