import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from './firebase';

const Signup = () => {
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use useLocation to get the pathname from the URL
  const location = useLocation();
  // Extract the role from the URL
  const role = location.pathname.split('/').pop();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      // Signup with Firebase authentication
      const { user } = await signup(emailRef.current.value, passwordRef.current.value);

      // Check if the role is defined, otherwise, set a default role
      const userRole = role || 'defaultRole';

      // Add user details to Firestore collection
      const userDocRef = db.collection('users').doc(user.uid);

      // Fetch the user's existing data
      const userDoc = await userDocRef.get();

      // Determine whether 'roles' is an array or a single value
      let updatedRoles;
      if (userDoc.exists && Array.isArray(userDoc.data().roles)) {
        // If 'roles' is already an array, append the new role
        updatedRoles = [...userDoc.data().roles, userRole];
      } else {
        // If 'roles' is not an array or doesn't exist, create a new array with the role
        updatedRoles = [userRole];
      }
      const finalizedSchedule = [];

      // Update the user document with the new 'roles' value
      await userDocRef.set(
        {
          email: emailRef.current.value,
          roles: updatedRoles,
          finalizedSchedule,
          // Add any additional user details you want to store
        },
        { merge: true } // Use merge option to update only specified fields without overwriting the entire document
      );

      navigate('/landingpage');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        console.error('Error during signup:', err);
        setError('Failed to create an account');
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up as {role}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" style={{ marginTop: '10px' }}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
