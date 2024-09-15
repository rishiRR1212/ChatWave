import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest,baseUrl, PostRequest } from "../utilities/source";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({children,user}) => {
    const [userChats,setUserChats] = useState(null);
    const [isUserChatsLoading,setisUserChatsLoading] = useState(false);
    const [isUserChatsError,setisUserChatsError] = useState(null);
    const [PotentialChatUsers , setPotentialChatUsers] = useState([]);
    const [CurrentChat , setCurrentChat] = useState(null);
    const [FriendsChat , setFriendsChat] = useState([]);
    const [isFriendsChatsLoading,setisFriendsChatsLoading] = useState(false);
    const [isFriendsChatsError,setisFriendsChatsError] = useState(null);
    const [MessageSendingError , setMessageSendingError] = useState(null);
    const [newMessage , setnewMessage] = useState("");
    const [socket , setsocket] = useState(null);
    const[onlineUsers , setonlineUsers] = useState([]);

    //intializing server

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setsocket(newSocket);
        return () => newSocket.disconnect();
    } , [user] );

    useEffect(() => {
        if(socket){
            socket.emit("addNewUser" , user?._id)
        }
    } , [socket]);
    //getting online users
    useEffect(() => {
        if(!socket) return;

        socket.on("getOnlineUsers" , (Ousers) => {
            setonlineUsers(Ousers);
        })

        return () => {
            socket.off("getOnlineUsers");
        }
    } , [socket , user])

    // real time chatting

    useEffect(() => {
        if(!socket) return;
            const recepientId = CurrentChat?.members?.find((id) => id !== user._id);
            socket.emit("sendMessage" , {...newMessage , recepientId});
    } , [newMessage])

    useEffect(() => {
        if(!socket) return;
        socket.on("getMessage" , (message) => {
            if(CurrentChat?._id !== message.chatId) return;
            setFriendsChat((prev) => [...prev , message]);
        })

        return () => {
            socket.off("getMessage");
        }
    } , [socket , CurrentChat])

    useEffect(() =>{
       const getUserChats = async() => {
           if(user?._id){
                setisUserChatsLoading(true);
                setisUserChatsError(null);
                const response = await getRequest(`${baseUrl}/chat/${user?._id}`);
                setisUserChatsLoading(false);
                if(response.error){
                    setisUserChatsError(response);
                }
                else setUserChats(response);
           }
       }
       getUserChats();
    },[user])

   useEffect(() => {
        const GetFriendsChats = async () => {
            if(CurrentChat){
                setisFriendsChatsLoading(true);
                setisFriendsChatsError(null);
                const response = await getRequest(`${baseUrl}/message/${CurrentChat?._id}`);
                setisFriendsChatsLoading(false);
                if(response.error){
                    setisFriendsChatsError(response);
                    return;
                }
                setFriendsChat(response);
            }
        }
        GetFriendsChats();
   } , [CurrentChat , user])

   useEffect(() => {
       const GetPotentailusers = async() => {
         if(user){
            const response = await getRequest(`${baseUrl}/users`);
            if(response.error){
                console.log(response.error);
                return;
            }

            const AllUsers = response.filter((person) => {
                let MutualUser = false;
                if(person._id === user._id) return false;

                if(userChats){
                    MutualUser = userChats?.some((chat) => {
                        return chat.members[0] === person._id || chat.members[1] === person._id;
                    })
                }
                    
                return !MutualUser;
            })
            setPotentialChatUsers(AllUsers);
         }
       }
       GetPotentailusers();
   } , [userChats] );

   const InvokeChat = useCallback((chat) => {
        setCurrentChat(chat);
   } , [] )

   const CrateChat = useCallback(async ( firstId , secondId ) => {
        const response = await PostRequest(`${baseUrl}/chat` , JSON.stringify({firstId , secondId}));

        if(response.error){
            console.log(response.error);
            return;
        }
        setUserChats((prev) => {
            return [...prev , response];
        })
   } , [])

   const sendTextMessage = useCallback( async(TextMessage , sender ,  CurrentChat , setTextMessage) => {
        if(!TextMessage){
            return console.log("Empty Message");
        }

        const response = await PostRequest(`${baseUrl}/message` , JSON.stringify(
            {chatId : CurrentChat ,
             senderId : sender?._id, 
             text : TextMessage
            }
        ));

        if(response.error){
            setMessageSendingError(response.error);
            return;
        }

        setnewMessage(response);
        setFriendsChat((prev) =>  [...prev , response])
        setTextMessage("");

   } , []);

    return(
        <ChatContext.Provider 
            value = {
                {
                    userChats,
                    isUserChatsLoading,
                    isUserChatsError,
                    PotentialChatUsers,
                    CrateChat,
                    InvokeChat,
                    CurrentChat,
                    FriendsChat,
                    isFriendsChatsLoading,
                    isFriendsChatsError,
                    sendTextMessage,
                    onlineUsers
                }
            }
        >
          {children}
        </ChatContext.Provider>
    )
}

