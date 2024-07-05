// // src/Login.js
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebase-config';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const nav=useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password)
//       console.log('Logged in user:', userCredential.user);
//       alert(userCredential.user.email)
//       nav('/todo')

//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       console.log('Registered user:', userCredential.user);
//     } catch (error) {
//       console.error('Error registering:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>{isRegistering ? 'Register' : 'Login'}</h2>
//       <form onSubmit={isRegistering ? handleRegister : handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
//       </form>
//       <button onClick={() => setIsRegistering(!isRegistering)}>
//         {isRegistering ? 'Switch to Login' : 'Switch to Register'}
//       </button>
//     </div>
//   );
// };

// export default Login;



// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import "./layouts.css";  // Ensure this import is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/To-do-app/todo");
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  const reg=()=>{navigate('/To-do-app/register')};

  return (
    <div className="lay">

      <div className="outer">
        <h2>Welcome to Task Master</h2>
        <h4>Your Personalized To-Do List </h4>
        <form className="fg" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">Login</button>
          <br />
          {/* <button onClick={()=>reg()}>Register</button> */}
        <p>Dont have an account? <span  onClick={()=>reg()}>Register</span></p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
