
import React,{ useRef, useState } from 'react'
import { Form,Card,Button,Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext'
export default function Signup() {
        const emailRef=useRef();
        const passwordRef=useRef();
        const passwordconfirmationRef=useRef();
        const { signup} = useAuth()
        const [error,setError]=useState('')
        const [loading,setLoading]=useState(false)
        const history=useHistory()

   async function handlesubmit(e){
        e.preventDefault()
        //check if both the password same or not
        if(passwordRef.current.value !== passwordconfirmationRef.current.value)
        {
                return setError('paasword do not match')
        }
        try{
            setError('')
            setLoading(true)
           await signup(emailRef.current.value,passwordRef.current.value)
           history.push('/')
        }catch{
            setError('failed to create a account')
        }
        
        setLoading(false)
    

    }

    return (
        <>
            <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            SignUp
                        </h2>
                       
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlesubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Form.Group id="passsword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required/>
                            </Form.Group>
                            <Form.Group id="passsword-confirm">
                                <Form.Label>Password-Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordconfirmationRef} required/>
                            </Form.Group>
                            <Button disabled={loading}  className="w-100" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login">SignIn</Link>
            </div>
        </>
    )
}
