import React, { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMyChats } from '../../services';
import { selectChats } from '../../chatsSlice';
import { ChatItem } from '../ChatItem';

export default function ChatList() {
  const dispatch = useAppDispatch();

  const myChats = useAppSelector(selectChats);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  return (
    <Stack gap={4}>
      {myChats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </Stack>
  );
}
