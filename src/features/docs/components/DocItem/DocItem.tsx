import {
  Card,
  Stack,
  Group,
  Flex,
  Text,
  Anchor,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconEdit,
  IconTrash,
  IconArrowBack,
  IconScript,
} from '@tabler/icons-react';
import { formatDT, formatBytes, getDocType } from 'shared/utils';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { API_SERVER } from 'shared/constants';
import { deleteDoc } from '../../services';
import {
  setCurrentDoc,
  selectDocument,
  resetCurrentDoc,
} from '../../docsSlice';
import { IDoc } from '../../../types';
import classes from './DocIte.module.scss';

type DocItemProps = {
  document: IDoc;
  showControls?: boolean;
};

export default function DocItem({
  document,
  showControls = false,
}: DocItemProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, size, title, type, updatedAt, url, filename } = document;

  const currentDoc = useAppSelector(selectDocument);

  const dispatch = useAppDispatch();

  const link = url.startsWith('uploads') ? `${API_SERVER}/${url}` : url;
  const isCurrentDoc = _id === currentDoc._id;

  const deleteDocHandler = async () => {
    try {
      await dispatch(deleteDoc(_id)).unwrap();
      if (isCurrentDoc) {
        dispatch(resetCurrentDoc());
      }
      notifications.show({
        color: 'green',
        title: 'Delete document',
        message: 'Document was successful deleted',
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Delete document',
        message: error as string,
      });
    }
  };

  const editDocHandler = () => {
    dispatch(setCurrentDoc(_id));
  };

  const resetEditDoc = () => {
    dispatch(resetCurrentDoc());
  };

  return (
    <Card
      shadow='sm'
      padding='md'
      radius='md'
      withBorder
      className={isCurrentDoc ? classes.activeCard : ''}
    >
      <Flex gap={12}>
        <IconScript style={{ width: '40px', height: '40px' }} />

        <Stack gap={2} w='100%'>
          <Group align='center' gap={2}>
            <Anchor href={link} target='_blank' size='lg'>
              {title} {filename}
            </Anchor>
          </Group>

          <Flex gap={8}>
            <Text size='sm'>
              <Text span>Updated: </Text>
              <Text span c='blue'>
                {formatDT(updatedAt)}
              </Text>
            </Text>

            {type && (
              <Text size='sm'>
                <Text span>Type: </Text>
                <Text span c='blue'>
                  {getDocType(type)}
                </Text>
              </Text>
            )}

            {size && (
              <Text size='sm'>
                <Text span>Size: </Text>
                <Text span c='blue'>
                  {formatBytes(Number(size))}
                </Text>
              </Text>
            )}
          </Flex>
        </Stack>
        {showControls && (
          <Flex direction='column'>
            {!isCurrentDoc && (
              <ActionIcon
                variant='subtle'
                color='blue'
                size='md'
                onClick={editDocHandler}
              >
                <IconEdit style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            )}

            {isCurrentDoc && (
              <ActionIcon
                variant='subtle'
                color='blue'
                size='md'
                onClick={resetEditDoc}
              >
                <IconArrowBack style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            )}
            <ActionIcon
              variant='subtle'
              color='blue'
              size='md'
              onClick={deleteDocHandler}
            >
              <IconTrash style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
