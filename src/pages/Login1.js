import { render } from "@testing-library/react";
import React,{ useState, useEffect } from "react";
import Header from '../../components/Header';
import fire from '../../components/fire';
import "firebase/auth";
import "./login.css";

const Login = () => {
  
  const [user,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [hasAccount,setHasAccount] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = (event) => {
    clearErrors();
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        
      }
    });
    event.preventDefault();
  }
  const handleRegister = () => {
    clearErrors();
    fire
    .auth()
    .CreateUSerWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        
      }
    });
  } 
  const handleLogout=()=> {
    fire.auth.signalOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        setUser(user);
        
      }
      else{
        setUser('');
      }
    })
  };

  useEffect(() => {
    authListener();
  }, []);

  console.log(user);

  return (
    <div>
      <Header user={user}/>
    
    <div className="login">
    
    {/* {user ? (
        <div>
       <Header user={user}/>
       </div>
    ):( */}
      
      <form className="loginForm">
      <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." onChange={(e)=>setUser(e.target.value)} value={user} />
        <label>Email</label>
        <input className="loginInput" type="email" placeholder="Enter your email..." autoFocus required onChange={(e)=>setEmail(e.target.value)} value={email} />
        <p className="errormsg">{emailError}</p>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." required onChange={(e)=>setPassword(e.target.value)} value={password} />
        <p className="errormsg">{passwordError}</p>
        <div className="logint">
          {!hasAccount ? (
              <>
              <button onClick={handleLogin} className="loginButton">Login</button>
              <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)} className="registerswitch">Register</span></p>
              </>
          ) : (
              <>
              <button onClick={handleRegister} className="registerButton">Register</button>
              <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)} className="loginswitch">Login</span></p>
              </>
          )}
        </div>
        
      </form>
      {/* )}; */}
      
      
    </div>
    </div>
    
    
  );
}


export default Login;