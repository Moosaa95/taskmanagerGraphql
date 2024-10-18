import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router} from "react-router-dom"
import ApolloProvider from './ApolloProvider';
import { TaskProvider } from './context/TaskContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider>
    <AuthProvider>
      <TaskProvider>
        <Router>
          <App />
        </Router>
      </TaskProvider>
    </AuthProvider>
  </ApolloProvider>
);
