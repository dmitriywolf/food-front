import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMyChats } from '../../services';
import { selectChats } from '../../chatsSlice';

export default function ChatList() {
  const dispatch = useAppDispatch();

  const myChats = useAppSelector(selectChats);

  console.log(myChats);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  return <p>Chats list</p>;
}
