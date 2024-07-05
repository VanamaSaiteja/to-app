// // src/Todo.js
// import React, { useState, useEffect } from 'react';
// import { fs } from './firebase-config';
// import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp, serverTimestamp } from 'firebase/firestore';

// const Todo = () => {
//   const [todo, setTodo] = useState('');
//   const [todos, setTodos] = useState([]);

//   const todoCollectionRef = collection(fs, 'todos');


//   // Fetch todos from Firestore
//   const fetchTodos = async () => {
//     const data = await getDocs(todoCollectionRef);
//     setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   // Add a new todo
//   const addTodo = async () => {
//     if (todo.trim()) {
//       await addDoc(todoCollectionRef, { text: todo,createdat:new Date() });
//       setTodo('');
//       fetchTodos();
//     }
//   };

//   // Delete a todo
//   const deleteTodo = async (id) => {
//     const todoDoc = doc(fs, 'todos', id);
//     await deleteDoc(todoDoc);
//     fetchTodos();
//   };

//   return (
//     <div>
//       <h2>To-Do List</h2>
//       <input
//         type="text"
//         value={todo}
//         onChange={(e) => setTodo(e.target.value)}
//         placeholder="Add a new task"
//       />
//       <button onClick={addTodo}>Add</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {todo.text}{todo.createdat}
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Todo;



// src/Todo.js
// import React, { useState, useEffect } from "react";
// import { db } from "./firebase-config";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   serverTimestamp,
//   query,
//   where,
// } from "firebase/firestore";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./Context";



// const Todo = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const todoCollectionRef = collection(db, "todos");

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/");
//       return;
//     }
  
//     const fetchTodos = async () => {
//       const q = query(todoCollectionRef, where("userId", "==", currentUser.uid));
//       const data = await getDocs(q);
//       setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
  
//     fetchTodos();
//   }, [currentUser, navigate, todoCollectionRef]);
  

//   const addTodo = async () => {
//     if (todo.trim()) {
//       await addDoc(todoCollectionRef, {
//         text: todo,
//         createdat: serverTimestamp(),
//         userId: currentUser.uid,
//       });
//       setTodo("");
//       fetchTodos();
//     }
//   };

//   const deleteTodo = async (id) => {
//     const todoDoc = doc(db, "todos", id);
//     await deleteDoc(todoDoc);
//     fetchTodos();
//   };

//   return (
//     <div>
//       <h2>To-Do List</h2>
//       <button onClick={() => logout()}>Logout</button>
//       <input
//         type="text"
//         value={todo}
//         onChange={(e) => setTodo(e.target.value)}
//         placeholder="Add a new task"
//       />
//       <button onClick={addTodo}>Add</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <p>{todo.text}</p>
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Todo;


import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./Context";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the styles

const Todo = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const todoCollectionRef = collection(db, "todos");

  // Fetch todos from Firestore
  const fetchTodos = async () => {
    if (currentUser) {
      const q = query(todoCollectionRef, where("userId", "==", currentUser.uid),orderBy("createdat"));
      
      const data = await getDocs(q);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/To-do-app");
      return;
    }

    fetchTodos();
  }, [currentUser, navigate, todoCollectionRef]);

  const addTodo = async () => {
    if (todo.trim()) {
      await addDoc(todoCollectionRef, {
        text: todo,
        createdat: serverTimestamp(),
        userId: currentUser.uid,
      });
      setTodo("");
      fetchTodos(); // Ensure fetchTodos is defined and called here
    }
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    fetchTodos(); // Ensure fetchTodos is called here as well
  };

  // Function to delete all todos with confirmation
  const deleteAllTodos = async () => {
    if (todos.length === 0) return; // No todos to delete

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmDelete) {
      for (const todo of todos) {
        const todoDoc = doc(db, "todos", todo.id);
        await deleteDoc(todoDoc);
      }
      fetchTodos(); // Refresh the todo list
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No timestamp";
    const date = timestamp.toDate();
    return date.toLocaleString(); // Example format: "6/29/2024, 10:30:23 AM"
  };

  return (
    <div className="container">
      <div className="head">
        <h2>To-Do List</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <h4>Tasks: <span>{todos.length}</span></h4>

      <div className="form-group">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
        <button className="delete-all-btn" onClick={deleteAllTodos}>
          Delete All
        </button> {/* New Delete All button */}
      </div>
      <ol className="todo-list">
        {todos.map((todo, idx) => (
          <li key={todo.id}>
            <p> {todo.text} - Created at: {formatTimestamp(todo.createdat)}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;













