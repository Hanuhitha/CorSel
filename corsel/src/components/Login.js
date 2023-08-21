import React, { useRef } from "react"
import { Form, Button, Card } from "react-bootstrap"
import {Link} from 'react-router-dom'


export default function Login() {
    
  const emailRef = useRef()
  const passwordRef = useRef()
  const  handleSubmit =(e)=>{
    e.preventDefault()
    console.log(e.target.emailRef.value)
  
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br/>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/">Sign Up</Link>
      </div>

    </>
  )
}