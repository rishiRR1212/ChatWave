import React, { useContext } from 'react'
import  {UserRecipient}  from '../../hooks/UserRecipient'
import { Stack } from 'react-bootstrap';
import avatar from '../../assets/avatar.svg';
import { ChatContext } from '../../Context/ChatContext';

export const UserChat = ({chat , user}) => {
  if (!chat) {
    return null;
  }
  const { recipientUser, error } = UserRecipient({ chat, user });
  const {onlineUsers} = useContext(ChatContext);
  //  console.log(id);

  return (
    <div>
      <Stack direction='horizontal' gap = {3} className='user-card align-items-center p-2 justify-content-center'
       role = "button"
      >
         <div className="d-flex">
          <div className="me-2">
            <img src={avatar}  height = "35px"alt="user" className="user-image" />
          </div>
          <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="text">Hello</div>
          </div>
          <div className='d-flex flex-column align-items-end'> 
          <div className="date">22/02/2023</div>
          <div className="this-user-notifications">2</div>
          <div className={onlineUsers?.some((local) => {
                           return local.userId === recipientUser._id
                        }) ? "user-online" : ""}></div>
          </div>
         </div>
      </Stack>
    </div>
  )
}

export default UserChat
