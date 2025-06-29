import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = "http://localhost:5000/api"; // Update if needed

const DebugPanel = ({ moods = [], user, onClear }) => {
  const [showDebug, setShowDebug] = useState(false);

  const logDebugInfo = () => {
    console.log("🔍 Debug Info:");
    console.log("User:", user);
    console.log("Moods:", moods);
  };

  const clearFromUI = async () => {
    if (!user?.id) {
      toast.error("User not logged in.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete all moods?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${API_BASE}/moods/${user.id}`);
      if (res.status === 200) {
        toast.success("All moods cleared.");
        // Immediately clear from UI without page reload
        if (onClear) onClear([]); // pass empty array to parent
      } else {
        toast.error("Failed to clear moods.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting moods.");
    }
  };

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebug(true)}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Debug
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-96 overflow-auto z-50">
      <div className="bg-white rounded-lg shadow-lg border">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-sm font-medium">Debug Panel</h3>
          <button
            onClick={() => setShowDebug(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
            aria-label="Close Debug Panel"
          >
            ×
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs">
          <div><strong>User:</strong> {user?.name || "Not logged in"}</div>
          <div><strong>User ID:</strong> {user?.id || "N/A"}</div>
          <div><strong>Moods Count:</strong> {moods.length}</div>
          <div><strong>Active Moods:</strong> {moods.filter((m) => !m.deleted).length}</div>
          <div><strong>Deleted Moods:</strong> {moods.filter((m) => m.deleted).length}</div>

          {moods.length > 0 && (
            <div>
              <strong>Recent Moods:</strong>
              <div className="space-y-1 mt-1 max-h-32 overflow-auto border border-gray-200 rounded p-2 bg-gray-50">
                {moods.slice(0, 3).map((mood) => (
                  <div key={mood._id || mood.id} className="flex justify-between items-center">
                    <span>{mood.date}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {mood.mood}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <button
              onClick={logDebugInfo}
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Log Debug Info
            </button>
            <button
              onClick={clearFromUI}
              className="w-full px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
