import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} from "../services/progressService";

export default function Progress() {
  const [progressList, setProgressList] = useState([]);

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    goalWeight: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await getProgress();
      setProgressList(response.progress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      weight: "",
      height: "",
      goalWeight: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await updateProgress(editingId, formData);
      } else {
        response = await createProgress(formData);
      }

      setMessage(response.message);
      resetForm();
      loadProgress();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      weight: item.weight,
      height: item.height,
      goalWeight: item.goalWeight,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this progress record?")) return;

    try {
      const response = await deleteProgress(id);
      setMessage(response.message);
      loadProgress();
    } catch (error) {
      console.log(error);
    }
  };

  // Chart Data
  const chartData = [...progressList]
    .reverse()
    .map((item) => ({
      date: new Date(item.recordedAt).toLocaleDateString(),
      weight: item.weight,
      bmi: item.bmi,
    }));

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Progress Tracker
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-5">
            {message}
          </div>
        )}

        {/* Form */}

        <div className="bg-white shadow rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Update Progress" : "Add Progress"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-4"
          >

            <input
              type="number"
              name="weight"
              placeholder="Current Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="goalWeight"
              placeholder="Goal Weight (kg)"
              value={formData.goalWeight}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white rounded p-3"
            >
              {editingId ? "Update Progress" : "Save Progress"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white rounded p-3"
              >
                Cancel
              </button>
            )}

          </form>

        </div>

        {/* Progress Table */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Progress History
          </h2>

          <table className="w-full border">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Height</th>
                <th className="p-3">BMI</th>
                <th className="p-3">Goal Weight</th>
                <th className="p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

              {progressList.map((item) => (

                <tr
                  key={item._id}
                  className="border-b text-center"
                >

                  <td className="p-3">
                    {new Date(item.recordedAt).toLocaleDateString()}
                  </td>

                  <td>{item.weight} kg</td>

                  <td>{item.height} cm</td>

                  <td>{item.bmi}</td>

                  <td>{item.goalWeight} kg</td>

                  <td className="space-x-2">

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Weight Progress Chart */}

        <div className="bg-white shadow rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-5">
            Weight Progress Chart
          </h2>

          <ResponsiveContainer width="100%" height={350}>

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

        </div>

      </div>
    </div>
  );
}