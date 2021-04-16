import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screen/home'
import Signup from './components/screen/signup'
import Signin from './components/screen/Signin'
import Profile from './components/screen/Profile'
import CreatePost from "./components/screen/CreatePost"
import {reducer,initialState}  from './reducers/userReducers'
import  UserProfile from './components/screen/UserProfile'
import SubscribedUserPost from './components/screen/SubscribedUserPost'
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
    return(
      <Switch>
<Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <CreatePost/>
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route exact path ="/myfollowingpost">
        <SubscribedUserPost/>
      </Route>
              </Switch>
    )
  }
  


function App() {
  
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className = "some-class "style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1617541391321-ac6294b999f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60")` ,
      backgroundRepeat: 'no-repeat',
  width:'100%'
    }}>
        
   
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
  

}
    

export default App;
