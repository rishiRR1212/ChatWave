import React, { useContext, useEffect } from 'react'
import { Alert , Form , Row , Col , Stack, FormControl , Button } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {
  const {LoginInfo , LoginUser, LoginLoading , LoginError , LoginPerson ,LoginUpdate} = useContext(AuthContext);
    return (
        <div>
          <Form onSubmit={LoginUser}> 
            <Row  style={{
                height : "100vh",
                justifyContent : "center",
                marginTop : "10%"
            }}>
                <Col xs = {3}>
                   <Stack gap={3}>
                      <h3>Login</h3>
                      <FormControl type='email' placeholder='Email'  onChange={(e) =>{
                          LoginUpdate({...LoginInfo,email:e.target.value})
                      }}/>
                      <FormControl type='password' placeholder='Password' onChange={(e)=>{
                        LoginUpdate({...LoginInfo,password : e.target.value})
                      }}/>
                      <Button variant = "success" type='submit'>
                        {
                            LoginLoading ? "Logging In" : "Login"
                        }
                      </Button>
                      {
                          LoginError?.error && (
                              <Alert variant='danger'>
                              <p>
                                {LoginError.message}
                              </p>
                            </Alert>
                          )
                      }
                   </Stack>
                </Col>
            </Row>
          </Form>
        </div>
      )
}

export default Login
