import React, { useState } from "react";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";

const moodOptions = [
  "Happy", "Sad", "Angry", "Excited", "Anxious", "Tired", "Thoughtful", "Calm",
];

const postMood = async (moodData) => {
  const response = await fetch(`${API_BASE_URL}/api/moods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(moodData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to post mood");
  }
  return response.json();
};

const PostMoodForm = ({ userId, onMoodAdded }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood) {
      toast.error("Please select a mood.");
      return;
    }

    const moodData = {
      userId,
      mood,
      note,
      date: new Date().toISOString().slice(0, 10),
      deleted: false,
    };

    try {
      setLoading(true);
      await postMood(moodData);
      toast.success("Mood added successfully!");
      setMood("");
      setNote("");
      if (typeof onMoodAdded === "function") {
        onMoodAdded();
      }
    } catch (error) {
      toast.error(error.message || "Failed to post mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-md mx-auto p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Post Your Mood
      </h2>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        disabled={loading}
      >
        <option value="">-- Select Mood --</option>
        {moodOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note (optional)"
        rows={3}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Mood"}
      </button>
    </form>
  );
};

export default PostMoodForm;
