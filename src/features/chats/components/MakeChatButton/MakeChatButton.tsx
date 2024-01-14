import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import { useAppDispatch } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { createChat } from '../../services';

type MakeChatButtonProps = {
  id: string;
};

export default function MakeChatButton({ id }: MakeChatButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createChatHandler = async () => {
    try {
      const data = await dispatch(createChat(id)).unwrap();
      navigate(`${ROUTES.chats}/${data._id}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <Button
      leftSection={<IconBrandHipchat />}
      onClick={createChatHandler}
      variant='default'
    >
      Chat
    </Button>
  );
}
