import React from 'react'
import { useContext } from 'react'
import { Alert , Form , Row , Col , Stack, FormControl , Button } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'

const Register = () => {
  const {registerInfo, updateRegister , RegisterUser , RegisterLoading , RegisterError} = useContext(AuthContext);
  return (
    <div>
      <Form onSubmit={RegisterUser}>
        <Row  style={{
            height : "100vh",
            justifyContent : "center",
            marginTop : "10%"
        }}>
            <Col xs = {3}>
               <Stack gap={3}>
                  <h3>Register</h3>
                  <FormControl type='text' placeholder='Name' onChange={(e)=>{
                    updateRegister({...registerInfo,name : e.target.value})
                  }}/>
                  <FormControl type='email' placeholder='Email' onChange={(e)=>{
                    updateRegister({...registerInfo,email : e.target.value})
                  }}/>
                  <FormControl type='password' placeholder='Password'onChange={(e)=>{
                    updateRegister({...registerInfo,password : e.target.value})
                  }}/>
                  <Button variant = "primary" type='submit'>
                    {RegisterLoading ? "Registering" : "Register"}
                  </Button>
                  {RegisterError?.error && (
                    <Alert variant='danger'>
                    <p>
                      {RegisterError.message}
                    </p>
                  </Alert>
                  )}
               </Stack>
            </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Register
