import { z } from 'zod';

export const resumeSchema = z.object({
  position: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  category: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  skills: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  workExperience: z.number(),
  salaryExpectations: z.number(),
  country: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  city: z.string().min(3, {
    message: 'At least 3 letters',
  }),
  relocation: z.boolean(),
  englishLevel: z.string().min(2, {
    message: 'At least 2 letters',
  }),
  summary: z.string().min(8, {
    message: 'At least 8 letters',
  }),
  remoteWork: z.boolean(),
  office: z.boolean(),
  partTime: z.boolean(),
  freelance: z.boolean(),
  isPublished: z.boolean(),
});
