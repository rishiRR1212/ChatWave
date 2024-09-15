import React, { useContext, useEffect} from 'react'
import { Navbar, Nav , Container , Stack  } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const NavBar = () => {
   const {user,logout} = useContext(AuthContext);
   //let user = JSON.parse(localStorage.getItem("User"));
  return (
    <div>
        <Navbar bg = "dark" className = "mb - 4" style = {{height : "3rem"}} >
           <Container>
            <h2>
            <Link to = '/' className='text-light text-decoration-none' >ChatWave</Link>
            </h2>
            {
               user && (
                  <span className='text-warning'>User Logged In {user.name}</span>
               )
            }
             <Nav>
                <Stack gap={3} direction='horizontal'>
                  {
                     user && (
                        <Link to = '/login' onClick={() =>{
                           logout();
                           // window.location.reload();
                        }}  className='text-light text-decoration-none' >LogOut</Link>
                     )
                  }
                  {
                     !user && (
                        <>
                          <Link to = '/login' className='text-light text-decoration-none' >Login</Link>
                           <Link to = '/register' className='text-light text-decoration-none' >Register</Link>
                        </>
                     )
                  }
                </Stack>
             </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar
