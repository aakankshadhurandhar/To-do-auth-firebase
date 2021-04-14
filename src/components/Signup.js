
import React,{ useState } from 'react'
import { Form,Card,Button,Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext'
import { db } from "../firebase";

export default function Signup() {
   
    
    const [email, setEmail] = useState()
     const [password, setPassword] = useState()
     const {signup,currentUser} = useAuth()
    
        
        const [error,setError]=useState('')
        const [loading,setLoading]=useState(false)
        const history=useHistory()

   async function handlesubmit(e){
        e.preventDefault()
        
        
        
        try{
            setError('')
            setLoading(true)
           await signup(email,password)
       const userRef =  await db.collection('users').doc(currentUser.uid);


        await userRef.set({
        userID: currentUser.uid
      }, { merge: true });
      
           alert("signup successfull")
           history.push("/")
        }catch{
           
            setError('failed to create a account')
            setLoading(false)
        }
        
        
    

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
                                <Form.Control type="email" for="email" onChange={(e)=>{setEmail(e.target.value)} }required />
                            </Form.Group>
                            <Form.Group id="passsword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" for="password"  onChange={(e)=>{setPassword(e.target.value)}} required />
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
