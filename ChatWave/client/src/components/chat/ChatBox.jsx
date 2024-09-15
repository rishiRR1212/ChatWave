import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext';
import  {UserRecipient} from '../../hooks/UserRecipient';
import { Stack } from 'react-bootstrap';
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const {CurrentChat , isFriendsChatsLoading , FriendsChat , sendTextMessage} = useContext(ChatContext);
    const { recipientUser, error } = UserRecipient({ chat: CurrentChat, user });
    const [TextMessage , setTextMessage] = useState("");
    if( !CurrentChat){
        return(
            <p style={{text : "bold" , textAlign : "center" , paddingTop : "30vh"}}>
            Select a Chat to Explore...
            </p>
        )
    }
    if(isFriendsChatsLoading){
        return(
            <p style={{text : "bold" , textAlign : "center" , paddingTop : "30vh"}}>
             Chats Loading...
            </p>
        )
    }
    else{
        return (
            <Stack gap={4} className='chat-box'>
                <div className="chat-header">
                    <strong>{recipientUser?.name}</strong>
                </div>
                <Stack gap={3} className='messages'>
                    {
                        FriendsChat?.map((message , index) => {
                            return (
                                <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : 
                                "message align-self-start flex-grow-0"}`}>
                                    <span style={{textAlign : "center"}}>{moment(message.createdAt).calendar()}</span>
                                    <span>{message.text}</span>
                                </Stack>
                            )
                        })
                    }
                </Stack>
                <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
                    <InputEmoji value={TextMessage} onChange={setTextMessage} fontFamily='nunito' borderColor='rgba(72 , 112 , 223 , 0.2)'/>
                    <button className='send-btn' onClick={() => sendTextMessage(TextMessage , user , CurrentChat._id , setTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16" height="16" 
                         fill="currentColor" 
                         className="bi bi-send-fill" 
                         viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                    </button>
                </Stack>
            </Stack>
          )
    }
}

export default ChatBox
