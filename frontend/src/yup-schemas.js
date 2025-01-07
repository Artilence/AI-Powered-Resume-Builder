import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    )
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(
      /[!@#$%^&*()_+{}[\]|:;"'<>,.?~\\-]/,
      'Must contain at least one special character'
    )
    .required('Password is required'),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    )
    .required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(
      /[!@#$%^&*()_+{}[\]|:;"'<>,.?~\\-]/,
      'Must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const profileSchema = yup.object().shape({
  profile_name: yup.string().required('Profile Name is required'),

  name: yup.string().required('Full Name is required'),
  position: yup.string().required('Position is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  summary: yup
    .string()
    .max(500, 'Summary cannot exceed 500 characters')
    .required('Summary is required'),

  experiences: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Title is required'),
      company: yup.string().required('Company is required'),
      startDate: yup
        .date()
        .typeError('Start date is required')
        .required('Start date is required'),
      endDate: yup
        .date()
        .typeError('End date must be a valid date')
        .nullable()
        .min(yup.ref('startDate'), 'End date cannot be before start date'),
      description: yup.string().required('Description is required'),
    })
  ),

  education: yup.array().of(
    yup.object().shape({
      degree: yup.string().required('Degree is required'),
      institution: yup.string().required('Institution is required'),
      startDate: yup
        .date()
        .typeError('Start date is required')
        .required('Start date is required'),
      endDate: yup
        .date()
        .typeError('End date must be a valid date')
        .nullable()
        .min(yup.ref('startDate'), 'End date cannot be before start date'),
      description: yup.string().required('Description is required'),
    })
  ),

  projects: yup.array().of(
    yup.object().shape({
      projectName: yup.string().required('Project name is required'),
      description: yup.string().required('Description is required'),
      technologies: yup
        .array()
        .of(yup.string().required('Technology cannot be empty'))
        .min(1, 'At least one technology is required'),
      link: yup.string().url('Must be a valid URL').nullable(),
    })
  ),

  certifications: yup.array().of(
    yup.object().shape({
      certificationName: yup
        .string()
        .required('Certification name is required'),
      issuingOrganization: yup
        .string()
        .required('Issuing organization is required'),
      date: yup
        .date()
        .typeError('Date is required')
        .required('Date is required'),
      credentialID: yup.string().nullable(),
      credentialURL: yup.string().url('Must be a valid URL').nullable(),
    })
  ),

  languages: yup.array().of(
    yup.object().shape({
      language: yup.string().required('Language is required'),
      proficiency: yup
        .string()
        .oneOf(
          ['Basic', 'Intermediate', 'Advanced', 'Fluent', 'Native'],
          'Select a valid proficiency level'
        )
        .required('Proficiency level is required'),
    })
  ),

  hobbies: yup.array().of(yup.string().required('Hobby cannot be empty')),

  social_links: yup.array().of(
    yup.object().shape({
      platform: yup
        .string()
        .oneOf(
          ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Other'],
          'Select a valid platform'
        )
        .required('Platform is required'),
      url: yup.string().url('Must be a valid URL').required('URL is required'),
    })
  ),
});
