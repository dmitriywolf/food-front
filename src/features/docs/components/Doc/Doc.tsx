import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Group,
  Text,
  rem,
  ActionIcon,
  Flex,
} from '@mantine/core';
import { IconUpload, IconX, IconFiles } from '@tabler/icons-react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { notifications } from '@mantine/notifications';

import {
  resetCurrentDoc,
  selectCurrentDoc,
  selectIsLoading,
} from '../../docsSlice';
import { createDoc, editDoc } from '../../services';
import { documentSchema } from './schema';

import type { DocFormValues } from './types';

const INITIAL_VALUES = {
  title: '',
  docUrl: '',
  file: undefined,
};

export default function Doc() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    title,
    url,
    filename,
  } = useAppSelector(selectCurrentDoc);

  const isLoading = useAppSelector(selectIsLoading);

  const EDIT_VALUES = useMemo(
    () => ({
      title,
      docUrl: url.startsWith('uploads') ? '' : url,
      file: undefined,
    }),
    [title, url],
  );

  const { getInputProps, onSubmit, setFieldValue, reset, setValues } =
    useForm<DocFormValues>({
      initialValues: _id ? EDIT_VALUES : INITIAL_VALUES,
      validate: zodResolver(documentSchema),
    });

  const resetForm = () => {
    reset();
    setFile(null);
  };

  const clearFileHandler = () => {
    setFieldValue('file', undefined);
    setFile(null);
  };

  const onDropFileHandler = (doc: File) => {
    setFile(doc);
    setFieldValue('file', doc);
  };

  const submitHandler = async (data: DocFormValues) => {
    try {
      if (_id) {
        // EDIT
        await dispatch(editDoc({ _id, ...data })).unwrap();
        resetForm();
        dispatch(resetCurrentDoc());
        notifications.show({
          color: 'green',
          title: 'Document updated',
          message: 'The document was successfully updated',
        });
      } else {
        // CREATE
        await dispatch(createDoc(data)).unwrap();
        resetForm();
        notifications.show({
          color: 'green',
          title: 'Document created',
          message: 'The document was successfully created',
        });
      }
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Create/Update document',
        message: error as string,
      });
    }
  };

  useEffect(() => {
    setValues(_id ? EDIT_VALUES : INITIAL_VALUES);
    setFile(null);
  }, [_id, EDIT_VALUES, setValues]);

  return (
    <Card shadow='sm' padding='md' radius='md' withBorder>
      <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
        <Stack gap={10}>
          <Stack gap={8}>
            <Text size='sm'>
              You can upload any file or just add ulr to Google Docs or another
              service
            </Text>
            <Dropzone
              onDrop={(files) => onDropFileHandler(files[0])}
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
            >
              <Group
                justify='center'
                gap='md'
                mih={100}
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
                  <Text size='lg' inline>
                    Drag file here or click to select
                  </Text>
                  <Text size='sm' c='dimmed' inline mt={7}>
                    PDF, CSV, Microsoft Word/Excel/PowerPoint
                  </Text>
                </div>
              </Group>
            </Dropzone>
            {file && (
              <Flex align='center' gap={4}>
                <Text size='sm'>
                  File:{' '}
                  <Text span c='red'>
                    {file.name}
                  </Text>
                </Text>

                <ActionIcon
                  variant='subtle'
                  color='red'
                  size='sm'
                  onClick={clearFileHandler}
                >
                  <IconX style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
              </Flex>
            )}

            {filename && !file && (
              <Text size='sm'>
                File:{' '}
                <Text span c='red'>
                  {filename}
                </Text>
              </Text>
            )}
          </Stack>

          <TextInput
            label='Document url'
            placeholder='https://docs.google.com/document/'
            {...getInputProps('docUrl')}
          />

          <TextInput
            label='Document name'
            placeholder='Terms...'
            {...getInputProps('title')}
          />

          <Button type='submit' disabled={isLoading}>
            {_id ? 'Update document' : 'Add document'}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
