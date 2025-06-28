import React, { useState } from 'react';

const DebugPanel = ({ moods, user }) => {
     const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowDebug(true)}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Debug
        </button>
      </div>
    );
  }

  const clearAllData = () => {
    if (confirm("Clear all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-96 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Debug Panel</h3>
            <button
              onClick={() => setShowDebug(false)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3 text-xs">
          <div>
            <strong>User:</strong> {user ? user.name : "Not logged in"}
          </div>
          <div>
            <strong>User ID:</strong> {user ? user.id : "N/A"}
          </div>
          <div>
            <strong>Moods Count:</strong> {moods.length}
          </div>
          <div>
            <strong>Active Moods:</strong> {moods.filter((m) => !m.deleted).length}
          </div>
          <div>
            <strong>Deleted Moods:</strong> {moods.filter((m) => m.deleted).length}
          </div>

          {moods.length > 0 && (
            <div>
              <strong>Recent Moods:</strong>
              <div className="space-y-1 mt-1">
                {moods.slice(0, 3).map((mood) => (
                  <div key={mood.id} className="flex justify-between items-center">
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
              onClick={() => {
                console.log("All localStorage data:", {
                  user: localStorage.getItem("mood-tracker-user"),
                  users: localStorage.getItem("mood-tracker-users"),
                  moods: user ? localStorage.getItem(`mood-tracker-moods-${user.id}`) : "No user",
                });
              }}
              className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Data to Console
            </button>
            <button
              onClick={clearAllData}
              className="w-full px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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