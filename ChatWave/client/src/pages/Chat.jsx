import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';
import {UserChat} from '../components/chat/UserChat';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const {user} = useContext(AuthContext);
  const {userChats , isUserChatsLoading, InvokeChat} = useContext(ChatContext);
  return (
    <Container>
      <PotentialChats />
      {
        userChats?.length < 1 ? null : (
          <Stack direction='horizontal' gap={4} className='allign - items - start' >
             <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
                  {
                    isUserChatsLoading && <p>Chats Loading...</p>
                  }
                  {
                    userChats?.map( (chat , index) => {
                      return (
                         <div key={index} onClick={() => InvokeChat(chat)}>
                           <UserChat chat = {chat} user = {user}/>
                         </div>
                      );
                    })
                  }
            </Stack>
            <Stack>
              <ChatBox/>
            </Stack>
          </Stack>
        )
      }
    </Container>
  )
}

export default Chat
