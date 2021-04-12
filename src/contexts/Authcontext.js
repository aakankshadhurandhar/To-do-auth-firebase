import React,{ useContext,useState,useEffect } from 'react'
import { auth } from '../firebase'


const AuthContext=React.createContext();


//function to use this context
export function useAuth(){
    return useContext(AuthContext)
    

}


export function AuthProvider({ children }) {
const [currentUser,setCurrentUser]=useState();
const [loading,setLoading]=useState(true)

//auth to login the user
function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
}
function login(email,password){
    return auth.signInWithEmailAndPassword(email,password)
}
function logout(){
    return auth.signOut();
}
//useeffect because run only when mpunting the component
useEffect(()=>{
  const unsubscribe=  auth.onAuthStateChanged(user=>{
        setCurrentUser(user)
        setLoading(false);
       
        
        
        })
        


return unsubscribe
},[])

    const value={
        currentUser,
        signup,
        login,
        logout
    }




    return (
        <AuthContext.Provider value={value}>
            {!loading &&  children}
        </AuthContext.Provider>
    )
}
