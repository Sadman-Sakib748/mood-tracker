import { useState } from "react";
import { format } from "date-fns";

const MOOD_EMOJIS = {
  Happy: "😊",
  Sad: "😢",
  Angry: "😠",
  Excited: "🤩",
  Anxious: "😰",
  Tired: "😴",
  Thoughtful: "🤔",
  Calm: "😌",
};

const MOOD_COLORS = {
  Happy: "bg-yellow-100 text-yellow-800",
  Sad: "bg-blue-100 text-blue-800",
  Angry: "bg-red-100 text-red-800",
  Excited: "bg-purple-100 text-purple-800",
  Anxious: "bg-orange-100 text-orange-800",
  Tired: "bg-gray-100 text-gray-800",
  Thoughtful: "bg-green-100 text-green-800",
  Calm: "bg-teal-100 text-teal-800",
};


const MoodHistory = ({ moods, onUpdate, onDelete, onRestore }) => {
  const [showDeleted, setShowDeleted] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  const filteredMoods = moods
    .filter((mood) => (showDeleted ? mood.deleted : !mood.deleted))
    .filter((mood) => !dateFilter || mood.date.includes(dateFilter))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (mood) => {
    setEditingId(mood.id);
    setEditNote(mood.note);
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, { note: editNote });
    setEditingId(null);
    setEditNote("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditNote("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center gap-2 pb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h2 className="text-xl font-bold">Mood History</h2>
          </div>
          <p className="text-gray-600 pb-6">View and manage your mood entries</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="date"
                placeholder="Filter by date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium flex items-center gap-2 ${
                showDeleted
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              {showDeleted ? "Show Active" : "Show Deleted"}
            </button>
          </div>

          <div className="space-y-4">
            {filteredMoods.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-4 opacity-50"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p>No mood entries found</p>
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            ) : (
              filteredMoods.map((mood) => (
                <div
                  key={mood.id}
                  className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${
                    mood.deleted ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-3xl">{MOOD_EMOJIS[mood.mood] || "😐"}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              MOOD_COLORS[mood.mood] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {mood.mood}
                          </span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(mood.date), "MMMM d, yyyy")}
                          </span>
                          {mood.deleted && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Deleted
                            </span>
                          )}
                        </div>
                        {editingId === mood.id ? (
                          <div className="space-y-2">
                            <input
                              value={editNote}
                              onChange={(e) => setEditNote(e.target.value)}
                              placeholder="Edit note..."
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveEdit(mood.id)}
                                className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700">{mood.note || "No note added"}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!mood.deleted ? (
                        <>
                          <button
                            onClick={() => handleEdit(mood)}
                            disabled={editingId === mood.id}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => onDelete(mood.id)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onRestore(mood.id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2.5 2v6h6M21.5 22v-6h-6"></path>
                            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default MoodHistory;