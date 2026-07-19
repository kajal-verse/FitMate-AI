import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRunning,
  FaAppleAlt,
  FaHeartbeat,
  FaRobot,
  FaUser,
  FaSignOutAlt,
   FaComments,
  FaDumbbell,
  FaWeight,
  FaBullseye,
  FaChartLine,
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

      <div className="max-w-screen-xl mx-auto px-8 py-10">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>


{/* Statistics */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">

  {/* Workouts */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-green-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Total Workouts</p>
        <h2 className="text-2xl font-bold mt-1">{stats.totalWorkouts}</h2>
        <p className="text-green-600 text-sm">Completed</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <FaDumbbell className="text-green-600 text-xl" />
      </div>
    </div>
  </div>

  {/* Meals */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-orange-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Total Meals</p>
        <h2 className="text-2xl font-bold mt-1">{stats.totalMeals}</h2>
        <p className="text-orange-600 text-sm">Meals Logged</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
        <FaAppleAlt className="text-orange-500 text-xl" />
      </div>
    </div>
  </div>

  {/* BMI */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-red-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Latest BMI</p>
        <h2 className="text-2xl font-bold mt-1">{stats.latestBMI || "--"}</h2>
        <p className="text-red-600 text-sm">Body Mass Index</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <FaHeartbeat className="text-red-500 text-xl" />
      </div>
    </div>
  </div>

  {/* Current Weight */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-blue-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Current Weight</p>
        <h2 className="text-2xl font-bold mt-1">{stats.latestWeight || "--"} kg</h2>
        <p className="text-blue-600 text-sm">Current</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <FaWeight className="text-blue-500 text-xl" />
      </div>
    </div>
  </div>

  {/* Goal Weight */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-purple-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Goal Weight</p>
        <h2 className="text-2xl font-bold mt-1">{stats.goalWeight || "--"} kg</h2>
        <p className="text-purple-600 text-sm">Target</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
        <FaBullseye className="text-purple-500 text-xl" />
      </div>
    </div>
  </div>

  {/* Difference */}
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 border-l-4 border-yellow-500">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">Difference</p>
        <h2 className="text-2xl font-bold mt-1">{stats.weightDifference ?? "--"} kg</h2>
        <p className="text-yellow-600 text-sm">To Goal</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
        <FaChartLine className="text-yellow-600 text-xl" />
      </div>
    </div>
  </div>

</div>
        <h3 className="text-2xl font-bold mb-5">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

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
  to="/fitness-coach"
  className="bg-white rounded-xl shadow p-6 hover:shadow-lg text-center"
>
  <FaRobot className="mx-auto text-4xl text-blue-500 mb-3" />
  AI Coach
</Link>
<Link
  to="/ai-chat"
  className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition text-center"
>
  <FaComments className="mx-auto text-4xl text-purple-500 mb-3" />
  <h3 className="font-bold">AI Chat</h3>
  <p className="text-sm text-gray-500">
    Ask fitness questions
  </p>
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