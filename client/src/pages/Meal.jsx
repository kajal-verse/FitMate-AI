import { useEffect, useState } from "react";
import {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  analyzeNutrition,
} from "../services/mealService";

export default function Meal() {
  const [meals, setMeals] = useState([]);

  const [formData, setFormData] = useState({
    mealType: "",
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const response = await getMeals();
      setMeals(response.meals);
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

  const handleAnalyze = async () => {
    if (!formData.foodName) {
      alert("Please enter a food name first.");
      return;
    }

    try {
      const response = await analyzeNutrition(formData.foodName);

      setFormData((prev) => ({
        ...prev,
        calories: response.nutrition.calories,
        protein: response.nutrition.protein,
        carbs: response.nutrition.carbs,
        fat: response.nutrition.fat,
      }));
    } catch (error) {
      console.log(error);
      alert("Unable to analyze nutrition.");
    }
  };

  const resetForm = () => {
    setFormData({
      mealType: "",
      foodName: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await updateMeal(editingId, formData);
        setMessage(res.message);
      } else {
        const res = await createMeal(formData);
        setMessage(res.message);
      }

      resetForm();
      loadMeals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (meal) => {
    setEditingId(meal._id);

    setFormData({
      mealType: meal.mealType,
      foodName: meal.foodName,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meal?")) return;

    try {
      const res = await deleteMeal(id);
      setMessage(res.message);
      loadMeals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Meal Management
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-5">
            {message}
          </div>
        )}

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? "Update Meal" : "Add Meal"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            >
              <option value="">Meal Type</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>

            <div className="flex gap-2">
              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                value={formData.foodName}
                onChange={handleChange}
                className="border p-3 rounded flex-1"
                required
              />

              <button
                type="button"
                onClick={handleAnalyze}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
              >
                🤖 Analyze
              </button>
            </div>

            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={formData.calories}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="protein"
              placeholder="Protein (g)"
              value={formData.protein}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="number"
              name="carbs"
              placeholder="Carbs (g)"
              value={formData.carbs}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="number"
              name="fat"
              placeholder="Fat (g)"
              value={formData.fat}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white rounded p-3"
            >
              {editingId ? "Update Meal" : "Add Meal"}
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

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-5">My Meals</h2>

          <table className="w-full border">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Food</th>
                <th className="p-3">Calories</th>
                <th className="p-3">Protein</th>
                <th className="p-3">Carbs</th>
                <th className="p-3">Fat</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {meals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    No meals added yet.
                  </td>
                </tr>
              ) : (
                meals.map((meal) => (
                  <tr
                    key={meal._id}
                    className="border-b text-center"
                  >
                    <td className="p-3">{meal.mealType}</td>
                    <td className="p-3">{meal.foodName}</td>
                    <td className="p-3">{meal.calories}</td>
                    <td className="p-3">{meal.protein}</td>
                    <td className="p-3">{meal.carbs}</td>
                    <td className="p-3">{meal.fat}</td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(meal)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(meal._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}