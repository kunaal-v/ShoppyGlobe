
import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './Components/Header';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Register from './Components/Register';
import { useState } from 'react';



function App() {
const [isSignedIn,setIsSignedIn]=useState(false);
function handleSignedInUser(){
  setIsSignedIn(true);
}
if(isSignedIn)
{
  return (
    <>
      <Provider store={appStore}>
        <Header/>
        <Outlet/>
      </Provider>
    </>
  )
}
else{
 
 return(<>
 <Register signedInfunction={handleSignedInUser}/>
 </>) 
}

  

}

export default App
