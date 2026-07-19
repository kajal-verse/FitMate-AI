import { useEffect, useState } from "react";
import { getFitnessAnalysis } from "../services/aiService";

export default function FitnessCoach() {

  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      const response = await getFitnessAnalysis();
      setAnalysis(response.analysis);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        🤖 Analyzing your fitness...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
          🤖 AI Fitness Coach
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-green-50 rounded-xl p-5">
            <h2 className="font-bold text-xl mb-3">
              📊 BMI
            </h2>

            <p className="text-3xl font-bold">
              {analysis.bmi}
            </p>

            <p className="text-green-700">
              {analysis.bmiStatus}
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <h2 className="font-bold text-xl mb-3">
              🔥 Daily Calories
            </h2>

            <p className="text-3xl font-bold">
              {analysis.dailyCalories}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5">
            <h2 className="font-bold text-xl mb-3">
              💪 Protein
            </h2>

            <p className="text-3xl font-bold">
              {analysis.protein}
            </p>
          </div>

          <div className="bg-cyan-50 rounded-xl p-5">
            <h2 className="font-bold text-xl mb-3">
              💧 Water Intake
            </h2>

            <p className="text-3xl font-bold">
              {analysis.water}
            </p>
          </div>

        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            🏋 Workout Plan
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            {analysis.workout.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            🥗 Nutrition Tips
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            {analysis.nutrition.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="mt-8 bg-green-100 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            💬 Motivation
          </h2>

          <p className="italic text-lg">
            "{analysis.motivation}"
          </p>

        </div>

        <button
          onClick={loadAnalysis}
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          🔄 Analyze Again
        </button>

      </div>

    </div>
  );
}