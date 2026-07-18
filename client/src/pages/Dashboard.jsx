import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRunning,
  FaAppleAlt,
  FaHeartbeat,
  FaRobot,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getDashboardStats } from "../services/dashboardService";
import { logoutUser } from "../services/authService";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMeals: 0,
    latestBMI: "--",
    latestWeight: "--",
    goalWeight: "--",
    weightDifference: "--",
  });

  const [recentWorkout, setRecentWorkout] = useState(null);
  const [recentMeal, setRecentMeal] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.stats);
      setRecentWorkout(response.recentWorkout);
      setRecentMeal(response.recentMeal);
      setProgressHistory(response.progressHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/");
  };

  const chartData = progressHistory.map((item) => ({
    date: new Date(item.recordedAt).toLocaleDateString(),
    weight: item.weight,
  }));

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <div className="bg-green-600 text-white px-8 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          FitMate AI
        </h1>

        <div className="flex items-center gap-6">

          <span>
            Welcome, <b>{user?.name}</b>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">🏋 Total Workouts</h3>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {stats.totalWorkouts}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              🥗 Total Meals
            </h3>

            <p className="text-4xl font-bold text-orange-500 mt-3">
              {stats.totalMeals}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              ❤️ Latest BMI
            </h3>

            <p className="text-4xl font-bold text-red-500 mt-3">
              {stats.latestBMI || "--"}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              ⚖ Current Weight
            </h3>

            <p className="text-4xl font-bold">
              {stats.latestWeight || "--"} kg
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              🎯 Goal Weight
            </h3>

            <p className="text-4xl font-bold">
              {stats.goalWeight || "--"} kg
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              📉 Difference
            </h3>

            <p className="text-4xl font-bold text-blue-600">
              {stats.weightDifference ?? "--"} kg
            </p>

          </div>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          Quick Actions
        </h3>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">

          <Link
            to="/workouts"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
          >
            <FaRunning className="mx-auto text-4xl text-green-600 mb-3" />
            Workouts
          </Link>

          <Link
            to="/meals"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
          >
            <FaAppleAlt className="mx-auto text-4xl text-orange-500 mb-3" />
            Meals
          </Link>

          <Link
            to="/progress"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
          >
            <FaHeartbeat className="mx-auto text-4xl text-red-500 mb-3" />
            Progress
          </Link>

          <Link
            to="/ai-chat"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
          >
            <FaRobot className="mx-auto text-4xl text-blue-500 mb-3" />
            AI Chat
          </Link>

          <Link
            to="/profile"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
          >
            <FaUser className="mx-auto text-4xl text-purple-500 mb-3" />
            Profile
          </Link>

        </div>

          {/* Dashboard Details */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Weight Chart */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              📈 Weight Progress
            </h2>

            {chartData.length > 0 ? (

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={chartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#16a34a"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-[300px] flex items-center justify-center text-gray-500">

                No progress history yet.

              </div>

            )}

          </div>

          {/* Right Side */}

          <div className="space-y-6">

            {/* Recent Workout */}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">

                🏋 Recent Workout

              </h2>

              {recentWorkout ? (

                <>

                  <p className="text-xl font-semibold">

                    {recentWorkout.title}

                  </p>

                  <p className="text-gray-600 mt-2">

                    Duration : {recentWorkout.duration} mins

                  </p>

                  <p className="text-gray-600">

                    Category : {recentWorkout.category}

                  </p>

                  <p className="text-gray-600">

                    Calories : {recentWorkout.caloriesBurned}

                  </p>

                </>

              ) : (

                <p className="text-gray-500">

                  No workout available.

                </p>

              )}

            </div>

            {/* Recent Meal */}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-bold mb-4">

                🥗 Latest Meal

              </h2>

              {recentMeal ? (

                <>

                  <p className="text-xl font-semibold">

                    {recentMeal.foodName}

                  </p>

                  <p className="text-gray-600 mt-2">

                    Meal : {recentMeal.mealType}

                  </p>

                  <p className="text-gray-600">

                    Calories : {recentMeal.calories}

                  </p>

                  <p className="text-gray-600">

                    Protein : {recentMeal.protein} g

                  </p>

                  <p className="text-gray-600">

                    Carbs : {recentMeal.carbs} g

                  </p>

                  <p className="text-gray-600">

                    Fat : {recentMeal.fat} g

                  </p>

                </>

              ) : (

                <p className="text-gray-500">

                  No meals available.

                </p>

              )}

            </div>

            {/* AI Tip */}

            <div className="bg-green-50 border-l-4 border-green-600 rounded-xl shadow p-6">

              <h2 className="text-xl font-bold text-green-700 mb-3">

                🤖 AI Fitness Tip

              </h2>

              <p className="text-gray-700 leading-7">

                Stay hydrated 💧, eat enough protein 🥩, exercise at least
                30 minutes daily 🏃, and get 7–8 hours of quality sleep 😴.
                Consistency is the key to achieving your fitness goals.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}