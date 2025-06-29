import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:5000/api";

const TestPanel = ({ moods = [], user, onAdd, onClear }) => {
  const [showTest, setShowTest] = useState(false);

  const addTestMood = async () => {
    if (!user?.id) {
      toast.error("Please log in first.");
      return;
    }

    const testMoods = ["Happy", "Sad", "Excited", "Calm"];
    const randomMood = testMoods[Math.floor(Math.random() * testMoods.length)];

    const testMoodData = {
      mood: randomMood,
      note: `Test mood added at ${new Date().toLocaleTimeString()}`,
      date: new Date().toISOString().split("T")[0],
      deleted: false,
      userId: user.id,
    };

    try {
      const res = await axios.post(`${API_BASE}/moods`, testMoodData);
      if (res.status === 201) {
        toast.success(`Test mood \"${randomMood}\" added!`);
        if (onAdd) onAdd();
      } else {
        toast.error("Failed to add test mood.");
      }
    } catch (error) {
      console.error("Error adding test mood:", error);
      toast.error("Error adding test mood.");
    }
  };

  const clearMyMoods = async () => {
    if (!user?.id) {
      toast.error("Please log in first.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete all your moods?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${API_BASE}/moods/${user.id}`);
      if (res.status === 200) {
        toast.success("All your moods have been cleared.");
        if (onClear) onClear();
      } else {
        toast.error("Failed to delete moods.");
      }
    } catch (err) {
      console.error("Error clearing moods:", err);
      toast.error("Error clearing moods.");
    }
  };

  return (
    <div className="fixed bottom-4 left-4 w-64 z-50">
      {!showTest ? (
        <button
          onClick={() => setShowTest(true)}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-100 hover:bg-green-200"
        >
          Test Panel
        </button>
      ) : (
        <div className="bg-green-50 rounded-lg shadow-lg border border-green-100">
          <div className="p-4 border-b border-green-100 flex justify-between items-center">
            <h3 className="text-sm font-medium text-green-700">Test Panel</h3>
            <button
              onClick={() => setShowTest(false)}
              className="p-1 text-gray-500 hover:text-gray-700 text-lg"
              aria-label="Close Test Panel"
            >
              ×
            </button>
          </div>

          <div className="p-4 space-y-3 text-sm">
            <div>
              <strong>Current Moods:</strong> {moods.length}
            </div>

            <button
              onClick={addTestMood}
              className="w-full px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Add Test Mood
            </button>

            <button
              onClick={clearMyMoods}
              className="w-full px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Clear My Moods
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPanel;