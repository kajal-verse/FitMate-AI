import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { registerUser } from "../services/authService";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser(formData);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);


    } catch (err) {

      setError(
        err.response?.data?.message || "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">


        {/* Header */}
        <div className="text-center mb-8">

          <FaDumbbell className="text-green-600 text-5xl mx-auto mb-3"/>

          <h1 className="text-4xl font-bold text-green-600">
            FitMate AI
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account 💪
          </p>

        </div>



        {/* Messages */}

        {
          message && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
              {message}
            </p>
          )
        }


        {
          error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </p>
          )
        }



        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">


          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>



          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>



          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition"
          >

            {
              loading 
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


        </form>



        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/"
            className="text-green-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>


      </div>

    </div>
  );
}