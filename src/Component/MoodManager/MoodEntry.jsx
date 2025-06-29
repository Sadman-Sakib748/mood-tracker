import React, { useState } from "react";
import { toast } from "react-hot-toast";
import * as api from "../Page/Api/Api"; // ✅ ADD THIS LINE

const moodOptions = [
  "Happy", "Sad", "Angry", "Excited",
  "Anxious", "Tired", "Thoughtful", "Calm"
];

const MoodEntryForm = ({ user, onMoodAdded }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) {
      toast.error("Please select a mood.");
      return;
    }

    setLoading(true);

    try {
      const moodData = {
        userId: user.id,
        mood,
        note,
        date: new Date().toISOString().slice(0, 10), // yyyy-MM-dd
        deleted: false,
      };
      await api.addMood(moodData);
      toast.success("Mood added successfully!");
      setMood("");
      setNote("");
      onMoodAdded(); // trigger parent update
    } catch (err) {
      toast.error(err.message || "Failed to add mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-2">Add Today's Mood</h2>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full border rounded px-3 py-2"
        disabled={loading}
      >
        <option value="">Select a mood</option>
        {moodOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        rows={3}
        className="w-full border rounded px-3 py-2"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Mood"}
      </button>
    </form>
  );
};

export default MoodEntryForm;
