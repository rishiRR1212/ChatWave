import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import { AuthContext } from '../../Context/AuthContext';

const PotentialChats = () => {
    const{user} = useContext(AuthContext);
   const {PotentialChatUsers , CrateChat , onlineUsers} = useContext(ChatContext);
  return (
    <div>
      <div className="all-users">
        {
            PotentialChatUsers && PotentialChatUsers.map((person , index) => {
              console.log(person._id)
                return (
                    <div className="single-user" key = {index} onClick={() => CrateChat(user._id , person._id )}>
                        {person.name}
                        <span className={onlineUsers?.some((local) => {
                           return local.userId === person._id
                        }) ? "user-online" : ""}></span>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default PotentialChats
