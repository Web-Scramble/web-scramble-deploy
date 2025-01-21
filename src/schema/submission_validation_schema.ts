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

export const submissionSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  documents: yup
    .array()
    .of(
      yup.mixed()
        .test('fileSize', 'document is too large (max 50MB)', (value) => {
          if (!value) return true;
          return value.size <= MAX_FILE_SIZE;
        })
        .test('fileType', 'Unsupported document format', (value) => {
          if (!value) return true;
          return SUPPORTED_FORMATS.includes(value.type);
        })
    )
    .nullable(),
});

export type SubmissionFormData = yup.InferType<typeof submissionSchema>;