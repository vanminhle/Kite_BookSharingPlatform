import * as yup from 'yup';

const REGEX_PASSWORD = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
const REGEX_FULLNAME = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

yup.addMethod(yup.string, 'password', function (message) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, 'fullName', function (message) {
  return this.matches(REGEX_FULLNAME, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, 'email', function (message) {
  return this.matches(REGEX_EMAIL, {
    message,
    excludeEmptyString: true,
  });
});

export default yup;
