import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Checkbox,
  NumberInput,
  Textarea,
  Group,
  Badge,
  Radio,
  Slider,
  Text,
  Select,
  MultiSelect,
  rem,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconFiles } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import {
  ENGLISH_LEVELS,
  CATEGORIES,
  EXPERIENCE_YEARS,
  EXPERIENCE_LEVELS,
  COUNTRIES,
  SKILLS,
  NOT_CONSIDER_DOMAINS,
  EMPLOYMENT,
} from 'shared/constants';

import {
  selectCurrentDoc,
  selectIsLoading,
  resetCurrentDoc,
} from '../../docsSlice';
import { createDoc, editDoc } from '../../services';

import type { DocFormValues } from './types';
// import { resumeSchema } from './schema';

export default function Doc() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    owner,
    size,
    title,
    type,
    updatedAt,
    url,
  } = useAppSelector(selectCurrentDoc);

  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit, values, setFieldValue } =
    useForm<DocFormValues>({
      initialValues: {
        title,
        docUrl: url,
        file: undefined,
      },
      // validate: zodResolver(resumeSchema),
    });

  const submitHandler = async (data: DocFormValues) => {
    try {
      if (_id) {
        // EDIT

        // await dispatch(editResume({ id: _id, ...data })).unwrap();
        notifications.show({
          color: 'green',
          title: 'Document created',
          message: 'The documentwas successfully created',
        });
      } else {
        // CREATE

        await dispatch(createDoc(data)).unwrap();
        dispatch(resetCurrentDoc());
        notifications.show({
          color: 'green',
          title: 'Document edited',
          message: 'The document was successfully updated',
        });
      }
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Edit resume',
        message: error as string,
      });
    }
  };

  const onDropFile = (doc: File) => {
    setFile(doc);
    setFieldValue('file', doc);
  };

  console.log(file);

  return (
    <Stack gap={24}>
      <Group justify='end'>
        {updatedAt && (
          <Badge color='tomato'>Updated: {formatDT(updatedAt)}</Badge>
        )}
      </Group>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={20}>
            <Stack gap={8}>
              <Text size='sm'>
                You can upload any file or just add ulr(Goggle Docs or anothe)
              </Text>
              <Dropzone
                onDrop={(files) => onDropFile(files[0])}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                multiple={false}
                accept={[
                  MIME_TYPES.csv,
                  MIME_TYPES.pdf,
                  MIME_TYPES.doc,
                  MIME_TYPES.docx,
                  MIME_TYPES.xls,
                  MIME_TYPES.xlsx,
                  MIME_TYPES.pptx,
                  MIME_TYPES.ppt,
                ]}
                // {...props}
              >
                <Group
                  justify='center'
                  gap='md'
                  mih={120}
                  style={{ pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-green-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-red-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconFiles
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-dimmed)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size='xl' inline>
                      Drag file here or click to select
                    </Text>
                    <Text size='sm' c='dimmed' inline mt={7}>
                      PDF, CSV, Microsoft Word/Excel/PowerPoint
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              {file && (
                <Text size='sm'>
                  File accepted:{' '}
                  <Text span c='red'>
                    {file.name}
                  </Text>
                </Text>
              )}
            </Stack>

            <TextInput
              label='Document name'
              placeholder='Terms...'
              {...getInputProps('title')}
            />

            <TextInput
              label='Document url'
              placeholder='https://www.google.com/docs/'
              {...getInputProps('docUrl')}
            />

            <Button type='submit' disabled={isLoading}>
              {_id ? 'Update document' : 'Create document'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}
