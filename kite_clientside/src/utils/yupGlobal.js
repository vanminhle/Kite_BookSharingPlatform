import * as yup from 'yup';

const REGEX_PASSWORD = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
const REGEX_FULLNAME = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;

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

export default yup;
