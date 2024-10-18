
# Task Manager - Fullstack

This is a Task Manager application built using **Node.js**, **GraphQL**, and **React**. The backend handles the API, user authentication, and task management, while the frontend provides an intuitive user interface for managing tasks.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [GraphQL Endpoints](#graphql-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication with JWT
- GraphQL API for managing tasks
- Add, edit, delete, and toggle tasks
- Frontend with toast notifications for task actions
- Responsive UI with Tailwind CSS

## Project Structure

```
taskmanagerGraphql/
│
├── backend/       # Node.js with GraphQL server
│   ├── src/
│   ├── index.js   # Main entry point for backend
│   ├── package.json
│   └── ...
│
├── frontend/      # React frontend with TypeScript
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md      # Project documentation
```

## Installation

### Backend

1. **Navigate to the backend directory**:

   ```bash
   cd task-manager-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` directory with the following:

   ```bash
     DB_NAME=
    DB_USER=
    DB_PASSWORD=
    JWT_SECRET=
   ```

4. **Start the backend server**:

   ```bash
   node index.js
   ```

   The server will start on `http://localhost:4000/graphql`, where you can access the GraphQL Playground.

### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd my-task-manager-client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend development server**:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. Go to the **Frontend** at `http://localhost:3000`.
2. Log in or register to start managing tasks.
3. Add tasks by providing a title and description.
4. Edit or delete tasks using the corresponding buttons.
5. Use the **Logout** button to log out of the system.

## GraphQL Endpoints

- **Query**:
  - `tasks`: Fetches all tasks.
  
- **Mutations**:
  - `createTask(title, description)`: Creates a new task.
  - `updateTask(id, title, description)`: Updates an existing task.
  - `deleteTask(id)`: Deletes a task.
  - `toggleTask(id)`: Toggles the completion status of a task.

## Technologies Used

### Backend

- **Node.js**: Backend server
- **GraphQL**: API architecture
- **Apollo Server**: GraphQL implementation
- **Postgres**: Database
- **JWT**: Authentication

### Frontend

- **React**: User interface
- **TypeScript**: Static typing for the frontend
- **Tailwind CSS**: CSS framework for responsive design
- **React Toastify**: Toast notifications

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
