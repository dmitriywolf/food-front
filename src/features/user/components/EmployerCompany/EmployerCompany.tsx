import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Flex,
  Image,
  NumberInput,
  Textarea,
} from '@mantine/core';
import {
  IconWorldWww,
  IconBuilding,
  IconUsersGroup,
  IconMapPinFilled,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { selectUser, selectIsLoading } from '../../userSlice';
import { userEditCompany } from '../../service';

import type { IEmployerCompanyFormValues } from './types';
import { employerCompanySchema } from './schema';
import type { IEmployerAccount } from '../../../types';

export default function EmployerCompany() {
  const dispatch = useAppDispatch();

  const employer = useAppSelector(selectUser) as IEmployerAccount;

  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit } = useForm<IEmployerCompanyFormValues>({
    initialValues: {
      companyName: employer?.companyName || '',
      companyWebSite: employer?.companyWebSite || '',
      companyDouPage: employer?.companyDouPage || '',
      companyLogo: employer?.companyLogo || '',
      companyEmployeesCount: employer?.companyEmployeesCount || 0,
      companyDescription: employer?.companyDescription || '',
      companyOffices: employer?.companyOffices || '',
    },
    validate: zodResolver(employerCompanySchema),
  });

  const submitHandler = async (values: IEmployerCompanyFormValues) => {
    try {
      await dispatch(
        userEditCompany({ id: employer?._id, ...values }),
      ).unwrap();

      notifications.show({
        color: 'green',
        title: 'Edit user info',
        message: 'User data has updated successful',
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Edit user info',
        message: error as string,
      });
    }
  };

  return (
    <Card shadow='sm' padding='md' radius='md' withBorder>
      <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
        <Stack gap={12}>
          <Flex gap={24}>
            <Stack gap={8} w='100%'>
              <TextInput
                label='Company name'
                placeholder='Amazon'
                leftSection={<IconBuilding size={16} />}
                {...getInputProps('companyName')}
              />
              <TextInput
                leftSection={<IconWorldWww size={16} />}
                label='Company page'
                placeholder='https://'
                {...getInputProps('companyWebSite')}
              />

              <NumberInput
                label='Employees count'
                hideControls
                allowDecimal={false}
                leftSection={<IconUsersGroup size={16} />}
                {...getInputProps('companyEmployeesCount')}
              />
            </Stack>
            <Image radius='md' w={200} h={200} src={employer?.companyLogo} />
          </Flex>

          <TextInput
            leftSection={<IconMapPinFilled size={16} />}
            label='Offices'
            placeholder='Ukraine (Kiyv, Dnipro)'
            {...getInputProps('companyOffices')}
          />

          <TextInput
            leftSection={<IconWorldWww size={16} />}
            label='Company dou page'
            placeholder='https://jobs.dou.ua/companies/'
            {...getInputProps('companyDouPage')}
          />

          <Textarea
            label='Company description'
            placeholder='Description..'
            autosize
            minRows={5}
            {...getInputProps('companyDescription')}
          />

          <TextInput
            leftSection={<IconWorldWww size={16} />}
            label='Company logo'
            placeholder='https://'
            {...getInputProps('companyLogo')}
          />
          <Button type='submit' disabled={isLoading}>
            Update company
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
