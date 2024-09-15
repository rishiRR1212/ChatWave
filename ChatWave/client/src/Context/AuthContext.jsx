import { createContext, useCallback, useEffect, useState } from "react";
import { PostRequest, baseUrl } from "../utilities/source";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setuser] = useState(null);
    const[RegisterLoading , setRegisterLoading] = useState(false);
    const [RegisterError , setRegisterError] = useState(null);
    const [RegisterPerson , setRegisterPerson]  = useState(null);
    const[LoginLoading , setLoginLoading] = useState(false);
    const [LoginError , setLoginError] = useState(null);
    const [LoginPerson , setLoginPerson]  = useState(null);
    const [registerInfo,setregisterInfo] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [LoginInfo,setLoginInfo] = useState({
        email : "",
        password : ""
    })
    
    useEffect ( () =>{
        setuser(JSON.parse(localStorage.getItem("User")));
    },[])

    const updateRegister = useCallback((node) => {
           setregisterInfo(node)
    },[])

    const LoginUpdate = useCallback((node) => {
        setLoginInfo(node)
    },[])

    const logout = useCallback(() => {
        localStorage.removeItem("User");
        setuser(null);
    },[]);
    
    const LoginUser = useCallback(async(e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null);
        const response = await PostRequest(`${baseUrl}/users/login`,JSON.stringify(LoginInfo));
        setLoginLoading(false);
        if(response.error){
            return setLoginError(response);
        }
        localStorage.setItem("User" , JSON.stringify(response));
        setuser(JSON.parse(localStorage.getItem("User")));
        setLoginInfo(response);
        setLoginPerson(response);
        // window.location = '/';
    },[LoginInfo]);

    const RegisterUser = useCallback(async(e)=>{
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null);
        const response =  await PostRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setRegisterLoading(false);
        if(response.error){
            return setRegisterError(response);
        }
        
        localStorage.setItem("User" , JSON.stringify(response));
        setuser(JSON.parse(localStorage.getItem("User")));
        setRegisterPerson(response);
        // window.location = '/';
    },[registerInfo])

    return(
        <AuthContext.Provider
          value={
            {
                user,
                registerInfo,
                updateRegister,
                RegisterUser,
                RegisterLoading,
                RegisterError,
                RegisterPerson,
                logout,
                LoginInfo,
                LoginUser,
                LoginLoading,
                LoginError,
                LoginPerson,
                LoginUpdate
            }
          }
          >
            {children}
        </AuthContext.Provider>
    )
}