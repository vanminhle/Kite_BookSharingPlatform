import * as yup from 'yup';

const REGEX_PASSWORD = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
const REGEX_FULLNAME = /^([ \u00c0-\u01ffa-zA-Z'])+$/;
const REGEX_PHONE_NUMBER =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/g;

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

yup.addMethod(yup.string, 'phoneNumber', function (message) {
  return this.matches(REGEX_PHONE_NUMBER, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, 'bookTitle', function (message) {
  return this.matches(REGEX_FULLNAME, {
    message,
    excludeEmptyString: true,
  });
});

export default yup;
