import { useState } from "react";
import MoodEntry from "./MoodEntry";

const API_BASE = "http://localhost:5000/api";

async function updateMood(id, moodData) {
  const res = await fetch(`${API_BASE}/moods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(moodData),
  });
  if (!res.ok) throw new Error("Failed to update mood");
  return res.json();
}

const MoodManager = ({ fetchMoods, initialMood }) => {
  const [showModal, setShowModal] = useState(!!initialMood);
  const [editingMood, setEditingMood] = useState(initialMood || null);

  const handleSave = async (moodData) => {
    try {
      if (!editingMood?.id) throw new Error("No mood ID to update");

      await updateMood(editingMood.id, moodData);
      console.log("Mood updated:", moodData);

      if (fetchMoods) {
        fetchMoods();
      }

      setShowModal(false);
      setEditingMood(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    }
  };


  if (!editingMood) return null; 

  return (
    <>
      {showModal && (
        <MoodEntry
          moodData={editingMood}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingMood(null);
          }}
        />
      )}
    </>
  );
};

export default MoodManager;
