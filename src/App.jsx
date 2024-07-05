import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Todo from "./todo";
import { AuthProvider, useAuth } from "./Context";
import "./layouts.css";
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/To-do-app" />;

}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/To-do-app/register" element={<Register />} />
          <Route
            path="/To-do-app/todo"
            element={
              <PrivateRoute>
                <Todo />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
