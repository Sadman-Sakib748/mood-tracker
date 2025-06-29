const API_BASE_URL = "http://localhost:5000/api";

export const fetchMoods = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/moods?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch moods");
  return res.json();
};

export const addMood = async (moodData) => {
  const res = await fetch(`${API_BASE_URL}/moods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(moodData),
  });
  if (!res.ok) throw new Error("Failed to add mood");
  return res.json();
};

export const updateMood = async (id, updates) => {
  const res = await fetch(`${API_BASE_URL}/moods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update mood");
  return res.json();
};

export const deleteMood = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/moods/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete mood");
  return res.json();
};



export const restoreMood = async (id) => {
  const res = await fetch(`${API_BASE_URL}/moods/${id}/restore`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to restore mood");
  return res.json();
};