import * as yup from "yup";

export const challengeSchema = yup.object({
 title: yup
   .string()
   .required("Please enter a challenge title")
   .min(3, "Title must be at least 3 characters"),
 description: yup
   .string()
   .required("Please enter a description for your challenge") 
   .min(10, "Description must be at least 100 characters"),
 challengeType: yup
   .string()
   .oneOf(["task", "prize", "blog"], "Invalid challenge type")
   .required("Challenge type is required"),
//  isTimeLimited: yup.boolean(),
 duration: yup.object({
   value: yup.number().when("isTimeLimited", {
     is: (value: boolean) => value === true,
     then: (schema) => schema.required("Duration value is required").positive("Duration must be positive")
   }),
   unit: yup.string().when("isTimeLimited", {
     is: (value: boolean) => value === true, 
     then: (schema) => schema.oneOf(["minutes", "hours", "days", "weeks"], "Invalid duration unit")
       .required("Duration unit is required")
   })
 }).optional(),
 reward: yup.number()
 .typeError('you must specify a number')
 .min(1, 'Min amount is  1.')
 .when("challengeType", {
   is: (value: string) => value !== "",
   then: (schema) => schema.required("Reward is required for challenges")
 }),
 isPrivate: yup.boolean(),
//  participants: yup.string().when("isPrivate", {
//    is: (value: boolean) => value === true,
//    then: (schema) => schema.required("Participants are required for private challenges")
//  }),
//  judges: yup.string().required("Judges are required"),
//  isScheduled: yup.boolean(),
 startTime: yup.string().when("isScheduled", {
   is: (value: boolean) => value === true,
   then: (schema) => schema.required("Start time is required")
 }),
 duration_value: yup.number().required("duration value is required"),
 duration_unit: yup.string().required("duration unit is required"),
 endTime: yup.string().when("isScheduled", {
   is: (value: boolean) => value === true,
   then: (schema) => schema.required("End time is required")
     .test(
       "is-after-start",
       "End time must be after start time",
       function(value) {
         const startTime = this.parent.startTime;
         if (!startTime || !value) return true;
         return new Date(value) > new Date(startTime);
       }
     )
 }),
 attachments: yup.array().of(
   yup.mixed().test("fileSize", "File too large", (value) => {
     if (!value) return true;
     return value.size <= 5000000;
   })
 )
}).required();