import React, { useEffect } from 'react';
import './app.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux';

import {login, logout, selectUser} from './features/userSlice'
import { auth } from './firebase';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        //The user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      }
      
    })
  }, [])

  return (
    <div className="App">
      {user ? (
          <>
            {/* Side Bar "Left"*/}
            <Sidebar />
            

            {/* Chat"*/}
            <Chat/>
          </>
        )
        :<Login/>
      }

    </div>
  );
}

export default App;
