import Landing from './Landing';
import Authentication from './Authentication';

//HELPER (FORGOT PASS, EMAIL VERIFIED)
import NeedHelp from './NeedHelp';
import Helper from './NeedHelp/Helper';
import ResetPassword from './NeedHelp/ResetPassword';

//NOTIFY PAGE (SUCCESS EMAIL VERIFY, ERROR, ETC)
import VerificationOK from './VerificationOK';
import Error from './Error';

//UTILITIES
import ProtectedRoute from './ProtectedRoute';
import CustomerSupportBox from './Support/CustomerSupportBox';
import ManagerSupportBox from './Support/ManagerSupportBox';

export {
  Landing,
  Authentication,
  NeedHelp,
  Helper,
  ResetPassword,
  VerificationOK,
  Error,
  ProtectedRoute,
  CustomerSupportBox,
  ManagerSupportBox,
};
