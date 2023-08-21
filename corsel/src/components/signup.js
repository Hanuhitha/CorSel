import React, { useRef } from "react"
import { Form, Button, Card } from "react-bootstrap"
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'

export default function Signup() {
    
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup}=useAuth



  async function handleSubmit(e) {
    e.preventDefault()

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    // try {
    //   setError("")
    //   setLoading(true)
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   history.push("/")
    // } catch {
    //   setError("Failed to create an account")
    // }

    // setLoading(false)
  }

  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={(e)=>handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {/* <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group> */}
            <br/>
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? 
        <br/>
        <br/>
        <Link to="/login">Log In</Link>
      </div>
    </>
  )
}