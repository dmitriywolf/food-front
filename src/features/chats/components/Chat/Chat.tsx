import { useState } from 'react';
import { Card, Text, Flex } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import InputEmoji from 'react-input-emoji';
import { selectCurrentChat } from '../../chatsSlice';

export default function Chat() {
  const [text, setText] = useState('');

  const chat = useAppSelector(selectCurrentChat);

  const handleOnEnter = (value: string) => {
    console.log('enter', value);
  };

  return (
    <Card padding='md' radius='md' h='700px' withBorder>
      <Flex direction='column' justify='space-between' h='100%'>
        <Text>ЧАТ {chat._id}</Text>

        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder='Type a message'
        />
      </Flex>
    </Card>
  );
}
