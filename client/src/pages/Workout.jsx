import { useEffect, useState } from 'react';
import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
} from '../services/workoutService';

export default function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    caloriesBurned: '',
    difficulty: 'Beginner',
  });

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const response = await getWorkouts();
      setWorkouts(response.workouts || []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createWorkout(formData);

      setFormData({
        title: '',
        duration: '',
        caloriesBurned: '',
        difficulty: 'Beginner',
      });

      loadWorkouts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this workout?')) {
      await deleteWorkout(id);
      loadWorkouts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-green-600 mb-8">
          Workout Management
        </h1>

        {/* Add Workout Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add Workout</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="title"
              placeholder="Workout Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={formData.duration}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="caloriesBurned"
              placeholder="Calories Burned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="border p-3 rounded"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button
              type="submit"
              className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Add Workout
            </button>

          </form>
        </div>

        {/* Workout List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">My Workouts</h2>

          {workouts.length === 0 ? (
            <p className="text-gray-500">No workouts added yet.</p>
          ) : (
            <div className="space-y-4">
              {workouts.map((workout) => (
                <div
                  key={workout._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {workout.title}
                    </h3>
                    <p className="text-gray-600">
                      {workout.duration} min • {workout.caloriesBurned} kcal • {workout.difficulty}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}