import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const FETCH_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const TOGGLE_TASK = gql`
  mutation ToggleTask($id: ID!) {
    toggleTask(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!, $description: String!) {
    updateTask(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { data, loading, error, refetch } = useQuery(FETCH_TASKS);
  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [toggleTaskMutation] = useMutation(TOGGLE_TASK);
  const [updateTaskMutation] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (data) {
      setTasks(data.tasks);
    }
  }, [data]);

  const addTask = async (title: string, description: string) => {
    try {
      const response = await createTaskMutation({ variables: { title, description } });
      console.log('==========RESPONSE', response);
      
      setTasks([...tasks, response.data.createTask]);
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskMutation({ variables: { id } });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const response = await toggleTaskMutation({ variables: { id } });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: response.data.toggleTask.completed } : task
      ));
    } catch (err) {
      console.error("Error toggling task", err);
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    try {
      const response = await updateTaskMutation({ variables: { id, title, description } });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, title: response.data.updateTask.title, description: response.data.updateTask.description } : task
      ));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
