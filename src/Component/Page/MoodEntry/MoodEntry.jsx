import { useState } from "react";
import { format } from "date-fns";


const MOODS = [
  { emoji: "😊", name: "Happy", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { emoji: "😢", name: "Sad", color: "bg-blue-100 border-blue-300 text-blue-800" },
  { emoji: "😠", name: "Angry", color: "bg-red-100 border-red-300 text-red-800" },
  { emoji: "🤩", name: "Excited", color: "bg-purple-100 border-purple-300 text-purple-800" },
  { emoji: "😰", name: "Anxious", color: "bg-orange-100 border-orange-300 text-orange-800" },
  { emoji: "😴", name: "Tired", color: "bg-gray-100 border-gray-300 text-gray-800" },
  { emoji: "🤔", name: "Thoughtful", color: "bg-green-100 border-green-300 text-green-800" },
  { emoji: "😌", name: "Calm", color: "bg-teal-100 border-teal-300 text-teal-800" },
];
const MoodEntry = ({ onSave, onClose, existingDate }) => {
    const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(existingDate ? new Date(existingDate) : new Date());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedMood) {
      alert("Please select a mood");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const selectedDate = date.toISOString().split("T")[0];

    if (selectedDate > today) {
      alert("Cannot log mood for future dates");
      return;
    }

    setIsSaving(true);

    const moodData = {
      mood: selectedMood,
      note: note.trim(),
      date: selectedDate,
      deleted: false,
    };

    try {
      onSave(moodData);
      alert("Mood saved successfully!");
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("Failed to save mood. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-xl font-bold">Log Your Mood</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>
          <p className="text-gray-600 pb-4">How are you feeling today? Select your mood and add an optional note.</p>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Select Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={format(date, "yyyy-MM-dd")}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  max={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">How are you feeling?</label>
              <div className="grid grid-cols-2 gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedMood === mood.name
                        ? mood.color + " border-current"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-sm font-medium">{mood.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                Note (Optional)
              </label>
              <textarea
                id="note"
                placeholder="Add a note about your mood..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSaving ? "Saving..." : "Save Mood"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default MoodEntry;