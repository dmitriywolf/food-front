// slice
export { default as chatsSlice } from './chatsSlice';

// components
export { MakeChatButton } from './components/MakeChatButton';
export { ChatList } from './components/ChatList';
export { Chat } from './components/Chat';

// service
export { getMyChats, createChat, getChat, sendMessage } from './services';

// selectors
export { selectChats, selectCurrentChat } from './chatsSlice';
