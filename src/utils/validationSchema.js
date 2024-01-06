import * as Yup from 'yup';

const validator = {
  email: Yup.string().email().required('Please Enter Your email'),
  password: Yup.string()
    .required('Please Enter Your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase,One Number and one special case',
    ),
  confirm_password: Yup.string()
    .required('Confirm Password')
    .oneOf([Yup.ref('password'), null], 'Password did not match'),
  otp: Yup.number().positive().integer().required('Please Enter otp'),
  name: Yup.string().required('Please Enter Name'),
  first_name: Yup.string().required('Please Enter Your First Name'),
  last_name: Yup.string().required('Please Enter Your Last Name'),
  phone_number: Yup.number().required('Please Enter Your Phone Number'),
  address: Yup.string().max(500).required('Please Enter Your Address'),
  gender: Yup.string().required('Please Select Your Gender'),
  country: Yup.number().required('Please Select Your Country'),
  city: Yup.string().required('Please Select Your City'),
  profile_image: Yup.mixed()
    .required('Please upload a profile image')
    .test('fileType', 'Only image files are allowed', value => {
      if (!value) {
        return true; // No file is fine, since it's marked as required separately
      }
      return (
        value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
      );
    })
    .test('fileSize', 'File size must be less than 5MB', value => {
      if (!value) {
        return true; // No file is fine, since it's marked as required separately
      }
      return value.size <= 5 * 1024 * 1024; // 5MB
    }),
  manager: Yup.number().required('Please Select Your manager'),
  department: Yup.number().required('Please Select Your department'),
  designation: Yup.number().required('Please Select Your designation'),
  user_type: Yup.string().required('Please Select Your user_type'),
  branch: Yup.number().required('Please Select Your branch'),
};

export const loginSchema = Yup.object({
  email: validator.email,
  password: validator.password,
});
export const forgetPasswordSchema = Yup.object({
  email: validator.email,
});
export const OTPSchema = Yup.object({
  otp: validator.otp,
});
export const changePasswordSchema = Yup.object({
  password: validator.password,
  confirm_password: validator.confirm_password,
});
export const addUserSchema = Yup.object({
  email: validator.email,
  first_name: validator.first_name,
  last_name: validator.last_name,
  phone_number: validator.phone_number,
  address: validator.address,
  gender: validator.gender,
  profile_image: validator.profile_image,
  manager: validator.manager,
  department: validator.department,
  designation: validator.designation,
  user_type: validator.user_type,
  branch: validator.branch,
  password: validator.password,
  confirm_password: validator.confirm_password,
});

export const addBranch = Yup.object({
  country: validator.country,
  name: validator.name,
  city: validator.city,
  address: validator.address,
  // image: validator.profile_image,
});
