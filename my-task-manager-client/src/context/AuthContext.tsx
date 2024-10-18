// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginMutation] = useMutation(LOGIN_MUTATION)
    const [registerMutation] = useMutation(REGISTER_MUTATION);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {https://whatismyipaddress.com/
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
      try {
        const { data } = await loginMutation({
          variables: { username, password },
        });
    
        if (!data || !data.login) {
          throw new Error('Invalid login response'); 
        }
    
        const token = data.login;
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('token', token); 
      } catch (error) {
        console.log('Login error:', error);
        throw error; 
      }
    };

    const register = async (username: string, password: string): Promise<void> => {
      try {
        const { data } = await registerMutation({
          variables: { username, password },
        });
    
        if (!data || !data.register) {
          throw new Error('Invalid registration response'); 
        }
        
        // Optionally, you can auto-login after registration
        await login(username, password);
      } catch (error) {
        console.log('Registration error:', error);
        throw error;
      }
    };

    const logout = () => {https://whatismyipaddress.com/
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{login, token, logout, isAuthenticated, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
