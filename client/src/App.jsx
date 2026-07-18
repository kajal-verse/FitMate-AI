import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Workout from './pages/Workout';
import Meal from "./pages/Meal";
import Progress from "./pages/Progress";
import AI from "./pages/AI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/workouts" element={<Workout />} />
      <Route path="/meals" element={<Meal />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/ai-chat" element={<AI />} />

    </Routes>
  );
}

export default App;