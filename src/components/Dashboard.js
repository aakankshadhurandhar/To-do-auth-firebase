import React,{useState,useEffect} from 'react'
import {Alert} from 'react-bootstrap'
import { useHistory } from 'react-router';
import {useAuth} from '../contexts/Authcontext'
import {db} from "../firebase"
import { AddCircleOutlineRounded, DeleteOutlineRounded } from '@material-ui/icons';
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

export default function Dashboard() {
    const [error,setError]=useState("");
    const { currentUser,logout }=useAuth();
    const history=useHistory();
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    
    const notesRef= db.collection("users").doc(currentUser.uid);
//to maintain real-time snapshot of to-dos
    useEffect(() => {
        getTodos();
        // eslint-disable-next-line
    }, [])
    async function getTodos() {
        const notesRef =db.collection("users").doc(currentUser.uid);
        // console.log(await notesRef.get())
        notesRef.collection("todos").onSnapshot(function (querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          todo: doc.data().todo,
          
        }))
        )
      })
      
    }

//function for addition in to-dos list

function handleChange(e){
    setInput(e.target.value)
  }
//function for delete in to-do list
function deleteTodo (id) {
    notesRef.collection("todos").doc(id).delete();
}
async function handleSubmit(e) {
    e.preventDefault();

   
  await  notesRef.collection("todos").add({
     
      todo: input,
    });
    setInput(' ');
  
  }



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
        <Container maxWidth="sm">
      <h1>To-do app 🌻 </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <form noValidate onSubmit={handleSubmit}>

        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
      </Button>

      </form>
      <List dense={true}>
        {
          todos.map(todo => (

            <ListItem key={todo.id} >

              <ListItemText
                primary={todo.todo}
               
              />

              <ListItemSecondaryAction>
                
                <IconButton edge="end" aria-label="delete" onClick={()=>{deleteTodo(todo.id)}}>
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))
        }
      </List>
      

    </Container >

        <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>

            
            Dashboard
        </>
    )
}
