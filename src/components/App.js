import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/Authcontext";
import Signup from "./Signup";
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";


function App() {
  
  return (
  
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight:"100vh"}}
  
  >
    <div className="w-100" style={{maxWidth:"100vh"}}> 
    <Router>

    <AuthProvider>
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard}/>
      
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>

      
    </Switch>
    </AuthProvider>

    </Router>
    
    </div>
    

  </Container>
 
  
  
  
  


  )
}

export default App;
