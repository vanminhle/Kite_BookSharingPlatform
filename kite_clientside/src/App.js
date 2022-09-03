import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import {
  AccountManagement,
  SharedLayout,
  Stats,
  UserAccount,
  MyBooks,
  ManageBooks,
  TagsManagement,
  Book,
  Reading,
} from './pages/Application';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* private routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout allowed={['admin', 'manager', 'customer']} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="/my-account" element={<UserAccount />} />
            <Route path="/book/:bookId" element={<Book />} />
            <Route path="/book/reading/:bookId" element={<Reading />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout allowed={['admin']} />
              </ProtectedRoute>
            }
          >
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/books-management" element={<ManageBooks />} />
            <Route path="/tags-management" element={<TagsManagement />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout allowed={['manager']} />
              </ProtectedRoute>
            }
          >
            <Route path="/manager/manage-books" element={<ManageBooks />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout allowed={['customer']} />
              </ProtectedRoute>
            }
          >
            <Route path="/my-books" element={<MyBooks />} />
          </Route>

          {/* public routes */}
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
