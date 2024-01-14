import {
  useContext,
  useState,
  createContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';
import { API_SERVER } from 'shared/constants';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';

const socketIO = io(API_SERVER!);

const defaultState = {
  socket: socketIO,
};

const SocketContext = createContext(defaultState);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function SocketProvider({ children }: Props) {
  const [socket] = useState(socketIO);

  const user = useAppSelector(selectUser);

  const setIoUser = useCallback(() => {
    socket.emit('newUser', {
      user: `${user?.firstName} ${user?.lastName}`,
      socketID: socket.id,
    });
  }, [socket, user]);

  useEffect(() => {
    if (user) {
      setIoUser();
    }
  }, [user, setIoUser]);

  const value = useMemo(
    () => ({
      socket,
    }),
    [socket],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
