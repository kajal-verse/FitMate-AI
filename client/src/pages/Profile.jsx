import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/authService";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    fitnessLevel: "",
    workoutLocation: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load profile when page opens
  useEffect(() => {
    loadProfile();
  }, []);

 const loadProfile = async () => {
  try {
    const response = await getProfile();

    console.log("Response:", response);
    console.log("User:", response.user);

    setFormData({
      name: response.user?.name || "",
      age: response.user?.age || "",
      gender: response.user?.gender || "",
      height: response.user?.height || "",
      weight: response.user?.weight || "",
      fitnessGoal: response.user?.fitnessGoal || "",
      fitnessLevel: response.user?.fitnessLevel || "",
      workoutLocation: response.user?.workoutLocation || "",
      profileImage: response.user?.profileImage || "",
    });
  } catch (error) {
    console.error(error);
  }
};

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //setMessage("");
    //setError("");

    try {

       const data = new FormData();

    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("height", formData.height);
    data.append("weight", formData.weight);
    data.append("fitnessGoal", formData.fitnessGoal);
    data.append("firnessLevel", formData.fitnessLevel);
    data.append("workoutLocation",formData.workoutLocation);

    if (image) {
      data.append("profileImage", image);
    }
      const response = await updateProfile(data);

      setMessage(response.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Profile update failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center py-10">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          My Profile
        </h1>

        {message && (
          <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </p>
        )}

{!isEditing ? (
  <div>
<div className="text-center">

  <img
    src={
      formData.profileImage ||
      "https://via.placeholder.com/150"
    }
    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500"
  />

  <h2 className="text-2xl font-bold mt-4">
    {formData.name}
  </h2>

</div>

<div className="grid grid-cols-2 gap-4 mt-8">

  <div className="bg-gray-100 p-4 rounded">
    <p className="text-gray-500">Age</p>
    <h3 className="font-bold">
      {formData.age} years
    </h3>
  </div>

  <div className="bg-gray-100 p-4 rounded">
    <p className="text-gray-500">Gender</p>
    <h3 className="font-bold">
      {formData.gender}
    </h3>
  </div>

  <div className="bg-gray-100 p-4 rounded">
    <p className="text-gray-500">Height</p>
    <h3 className="font-bold">
      {formData.height} cm
    </h3>
  </div>

  <div className="bg-gray-100 p-4 rounded">
    <p className="text-gray-500">Weight</p>
    <h3 className="font-bold">
      {formData.weight} kg
    </h3>
  </div>

</div>


<button
  onClick={() => setIsEditing(true)}
  className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg"
>
  ✏ Edit Profile
</button>
</div>
):(
    <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Fitness Goal</option>
            <option>Lose Weight</option>
            <option>Gain Muscle</option>
            <option>Stay Fit</option>
          </select>

          <select
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Fitness Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            name="workoutLocation"
            value={formData.workoutLocation}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Workout Location</option>
            <option>Home</option>
            <option>Gym</option>
          </select>

          <input
            type="file"
            name="profileImage"
           accept="image/*"
           onChange={handleImageChange}
           className="border p-2 rounded w-full"
          />

          <div className="space-y-3">

  <button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
  >
    Update Profile
  </button>


  <button
    type="button"
    onClick={() => setIsEditing(false)}
    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
  >
    Cancel
  </button>

</div>

        </form>
)}
          </div>

    </div>
  );
}