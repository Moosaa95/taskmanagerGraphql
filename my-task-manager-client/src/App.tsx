import { Route, Routes } from "react-router-dom";
import LoginPage from "./auth/Login";
import TaskUI from "./pages/tasks/TaskUI";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskUI />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
