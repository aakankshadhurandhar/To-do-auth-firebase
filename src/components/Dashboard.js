import React,{useState} from 'react'
import {Card,Button,Alert} from 'react-bootstrap'
import { useHistory } from 'react-router';
import {useAuth} from '../contexts/Authcontext'

export default function Dashboard() {

    const [error,setError]=useState("");
    const { currentUser,logout }=useAuth();
    const history=useHistory();

    async function handleLogout(){
            setError('');
            try{
                    await logout();
                    history.push('/login')
            }catch{
                setError('failed to logout');
            }
    }
    return (
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">
                            profile
                        </h2>
                       
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:{currentUser.email}</strong>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>

            
            Dashboard
        </>
    )
}
