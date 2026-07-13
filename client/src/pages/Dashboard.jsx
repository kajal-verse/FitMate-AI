import { Link } from "react-router-dom";
import { FaRunning, FaAppleAlt, FaRobot, FaHeartbeat } from "react-icons/fa";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-green-600 text-white p-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          FitMate AI
        </h1>

        <div>
          Welcome, <b>{user?.name}</b>
        </div>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link
            to="/workouts"
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg"
          >
            <FaRunning className="text-4xl text-green-600 mb-3" />
            <h3 className="font-bold text-xl">Workouts</h3>
          </Link>

          <Link
            to="/meals"
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg"
          >
            <FaAppleAlt className="text-4xl text-orange-500 mb-3" />
            <h3 className="font-bold text-xl">Meals</h3>
          </Link>

          <Link
            to="/bmi"
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg"
          >
            <FaHeartbeat className="text-4xl text-red-500 mb-3" />
            <h3 className="font-bold text-xl">BMI</h3>
          </Link>

          <Link
            to="/ai-chat"
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg"
          >
            <FaRobot className="text-4xl text-blue-500 mb-3" />
            <h3 className="font-bold text-xl">AI Assistant</h3>
          </Link>

        </div>

      </div>

    </div>
  );
}