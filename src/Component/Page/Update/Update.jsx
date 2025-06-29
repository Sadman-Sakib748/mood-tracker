import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router"; 
import { toast } from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const moodOptions = [
  "Happy", "Sad", "Angry", "Excited", "Anxious", "Tired", "Thoughtful", "Calm",
];

const Update = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || id.length !== 24) {
      navigate("/");
      return;
    }

    const fetchMood = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/moods/${id}`);
        setMood(res.data.mood);
        setNote(res.data.note || "");
      } catch (err) {
        toast.error(err.response?.data?.error || "Error loading mood");
        navigate("/");
      }
    };

    fetchMood();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood) {
      toast.error("Please select a mood.");
      return;
    }

    const updatedMood = {
      mood,
      note,
      date: new Date().toISOString().slice(0, 10),
      deleted: false,
    };

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/moods/${id}`, updatedMood);
      toast.success("Mood updated!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-md mx-auto p-6 rounded-lg shadow space-y-4 mt-8"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">Edit Mood</h2>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
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
        className="w-full border border-gray-300 rounded px-3 py-2"
        disabled={loading}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Updating..." : "Update Mood"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Update;
