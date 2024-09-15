import {Routes,Route,Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from "react-bootstrap"
import NavBar from "./components/NavBar";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import { ChatContextProvider } from "./Context/ChatContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <NavBar/>
     <Container> 
       <Routes>
        <Route  path = "/" element = {user ? <Chat/> : <Login/>}/>
        <Route  path = "/login" element = {user ? <Chat/> : <Login/>}/>
        <Route  path = "/register" element = {user ? <Chat/> :<Register/>}/>
        <Route  path = "*" element = {<Navigate to = "/"/>}/>
        </Routes>
    </Container>
    </ChatContextProvider>
  )
}

export default App
