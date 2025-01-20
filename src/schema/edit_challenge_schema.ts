import * as yup from 'yup';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/json',
  'text/javascript',
  'text/typescript',
];

export const editChallengeSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  challengeType: yup
    .string()
    .oneOf(['task', 'prize', 'blog'])
    .required('Please select a challenge type'),
  isTimeLimited: yup.boolean(),
  duration_value: yup.number().when('isTimeLimited', {
    is: true,
    then: (schema) =>
      schema
        .required('Duration is required when time limit is enabled')
        .positive('Duration must be positive')
        .integer('Duration must be a whole number'),
  }),
  duration_unit: yup.string().when('isTimeLimited', {
    is: true,
    then: (schema) =>
      schema
        .oneOf(['minutes', 'hours', 'days', 'weeks'])
        .required('Please select a duration unit'),
  }),
  reward: yup
    .number()
    .typeError('you must specify a number')
    .min(1, 'Min amount is  1$')
    .required('Reward is required')
    // .min(0, 'Reward cannot be negative')
    .integer('Reward must be a whole number'),
  isPrivate: yup.boolean(),
  isScheduled: yup.boolean(),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().when('isScheduled', {
    is: true,
    then: (schema) =>
      schema
        .required('End date is required when scheduling')
        .test('min-time-difference', 
          'End date must be at least 24 hours after start date',
          function(value) {
            if (!value) return false;
            const startDate = this.parent.startDate;
            const minEndTime = new Date(startDate.getTime() + (24 * 60 * 60 * 1000)); 
            return value >= minEndTime;
          }
        ),
  }),
  attachments: yup
      .array()
      .of(
        yup.mixed()
          .test('fileSize', 'File is too large (max 50MB)', (value:any) => {
            if (!value) return true;
            return value.size <= MAX_FILE_SIZE;
          })
          // .test('fileType', 'Unsupported file format', (value) => {
          //   if (!value) return true;
          //   return SUPPORTED_FORMATS.includes(value.type);
          // })
      )
      .nullable(),
  participants: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      name: yup.string(),
    })
  ),
  judges: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      name: yup.string(),
    })
  ),
});

export type EditChallengeFormData = yup.InferType<typeof editChallengeSchema>;