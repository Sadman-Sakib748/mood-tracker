import { Calendar, TrendingUp, Award, Plus } from "lucide-react";
import QuickMoodSelector from "../QuickMoodSelector/QuickMoodSelector";
import WeeklyChart from "../WeeklyChart/WeeklyChart";

const Dashboard = ({
  moods,
  todayMood,
  weeklyMoods,
  monthMood,
  currentStreak,
  setShowMoodEntry,
  refreshData,
}) => {
  const quickAddMood = (selectedMood) => {
    // Check if mood already exists for today
    const today = new Date().toISOString().split("T")[0];
    const existingMood = moods.find((m) => m.date === today && !m.deleted);

    if (existingMood) {
      alert("You've already logged a mood for today!");
      return;
    }

    const newMood = {
      id: `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mood: selectedMood,
      note: "Quick mood entry",
      date: today,
      deleted: false,
    };

    const updatedMoods = [...moods, newMood];
    localStorage.setItem("mood-tracker-moods", JSON.stringify(updatedMoods));

    // Show success message with animation
    const successMsg = document.createElement("div");
    successMsg.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: #10B981; 
        color: white; 
        padding: 12px 20px; 
        border-radius: 8px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
      ">
        ✅ Mood "${selectedMood}" logged successfully!
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      document.body.removeChild(successMsg);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Today's Mood</h3>
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
              className="text-gray-400"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="text-2xl font-bold">{todayMood ? todayMood.mood : "Not logged"}</div>
          {todayMood && <p className="text-sm text-gray-600 mt-1">{todayMood.note}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
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
              className="text-gray-400"
            >
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <div className="text-2xl font-bold">{currentStreak} days</div>
          {currentStreak >= 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
              🔥 Streak Badge!
            </span>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Month's Top Mood</h3>
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
              className="text-gray-400"
            >
              <path d="M18 21l-8-8-8 8"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold">{monthMood || "No data"}</div>
          <p className="text-xs text-gray-500">Past 30 days</p>
        </div>
      </div>

      {/* Quick Mood Selector - Only show if no mood logged today */}
      {!todayMood && <QuickMoodSelector onMoodSelect={quickAddMood} />}

      {/* Weekly Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="pb-4">
          <h3 className="text-lg font-medium">Weekly Mood Summary</h3>
          <p className="text-sm text-gray-500">Your mood patterns for this week</p>
        </div>
        <div>
          <WeeklyChart moods={weeklyMoods} />
        </div>
      </div>

      {/* Additional Options */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowMoodEntry(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2"
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
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Detailed Mood Entry
        </button>
        <button
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
