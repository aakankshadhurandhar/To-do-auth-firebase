
import React,{ useState } from 'react'
import { Form,Card,Button,Alert } from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext'
export default function Login() {
    
        // eslint-disable-next-line 
        const [email, setEmail] = useState()
        // eslint-disable-next-line 
     const [password, setPassword] = useState()
        const {login} = useAuth()
        const [error,setError]=useState('')
        const [loading,setLoading]=useState(false)
        const history=useHistory()


   async function handlesubmit(e){
        e.preventDefault()
        //check if both the password same or not
        
        try{
            setError('')
            setLoading(true)
           await login(email,password)
           history.push('/')
        }catch{
            setError('failed to signin')
        }
        
        
    

    }

    return (
        <>
            <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            SignIn
                        </h2>
                       
                       
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlesubmit}>
                            <Form.Group>
                                <Form.Label for="email">Email</Form.Label>
                                <Form.Control type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}required/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label for="password">Password</Form.Label>
                                <Form.Control id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                            </Form.Group>
                            
                            <Button disabled={loading}  className="w-100" type="submit">Signin</Button>
                        </Form>
                    </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need  an account?<Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
