// import { useEffect } from 'react';
// import { Box, Card, TextInput, Stack, Button, Checkbox } from '@mantine/core';
// import { useForm, zodResolver } from '@mantine/form';
// // import { useTranslation } from 'react-i18next';
// import { useAppDispatch, useAppSelector } from 'store/hooks';
// import { notifications } from '@mantine/notifications';
// import { selectIsLoading, selectResume, selectUser } from '../../../userSlice';
// import { getResume, editResume } from '../../../service';

// import type { EditSeekerResumeFormValues } from './types';
// import { seekerResumeSchema } from './schema';

// export default function EditSeekerResume() {
//   // const { t } = useTranslation();

//   const dispatch = useAppDispatch();

//   const profile = useAppSelector(selectUser);
//   const resume = useAppSelector(selectResume);

//   const isLoading = useAppSelector(selectIsLoading);

//   const form = useForm<EditSeekerResumeFormValues>({
//     initialValues: {
//       position: resume?.position || '',
//       category: resume?.category || '',
//       workExperience: resume?.workExperience || 0,
//       salaryExpectations: resume?.salaryExpectations || 0,
//       country: resume?.country || '',
//       city: resume?.city || '',
//       relocation: resume?.relocation || false,
//       englishLevel: resume?.englishLevel || '',
//       summary: resume?.summary || '',
//       employmentOptions: resume?.employmentOptions || '',
//     },
//     validate: zodResolver(seekerResumeSchema),
//   });

//   const onSubmit = async (values: EditSeekerResumeFormValues) => {
//     try {
//       await dispatch(editResume({ id: resume?._id || '', ...values })).unwrap();

//       notifications.show({
//         color: 'green',
//         title: 'Edit user resume',
//         message: 'User resume has updated successful',
//       });
//     } catch (error: unknown) {
//       notifications.show({
//         color: 'red',
//         title: 'Edit user resume',
//         message: error as string,
//       });
//     }
//   };

//   useEffect(() => {
//     if (!resume && profile) {
//       dispatch(getResume(profile?._id));
//     }
//   }, [resume, profile, dispatch]);

//   console.log('resume', resume);

//   return (
//     <Box component='section'>
//       <Card shadow='sm' padding='md' radius='md' withBorder>
//         <Box component='form' w='100%' onSubmit={form.onSubmit(onSubmit)}>
//           <Stack gap={12}>
//             <TextInput label='Position' {...form.getInputProps('position')} />
//             <TextInput label='Category' {...form.getInputProps('category')} />
//             <TextInput
//               label='Work experience'
//               {...form.getInputProps('workExperience')}
//             />
//             <TextInput
//               label='Salary expectations'
//               {...form.getInputProps('salaryExpectations')}
//             />

//             <TextInput
//               label='Country of residence'
//               {...form.getInputProps('country')}
//             />

//             <TextInput label='City' {...form.getInputProps('city')} />

//             <Checkbox
//               label='Relocation'
//               {...form.getInputProps('relocation', { type: 'checkbox' })}
//             />

//             <TextInput
//               label='English level'
//               {...form.getInputProps('englishLevel')}
//             />

//             <TextInput label='summary' {...form.getInputProps('summary')} />
//             <TextInput
//               label='Employment options'
//               {...form.getInputProps('employmentOptions')}
//             />

//             <Button type='submit' disabled={isLoading}>
//               Save changes
//             </Button>
//           </Stack>
//         </Box>
//       </Card>
//     </Box>
//   );
// }
