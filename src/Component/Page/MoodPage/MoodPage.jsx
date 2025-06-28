import { useState, useEffect } from "react";
import AuthForm from "../../Authentication/AuthForm/AuthForm";
import Dashboard from "../Dashboard/Dashboard";
import MoodEntry from "../MoodEntry/MoodEntry";
import DebugPanel from "../DebugPanel/DebugPanel";
import TestPanel from "../TestPanel/TestPanel";
import MoodHistory from "../MoodHistory/MoodHistory";


const MoodPage = () => {
  const [user, setUser] = useState(null);
  const [moods, setMoods] = useState([]);
  const [showMoodEntry, setShowMoodEntry] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("mood-tracker-user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);

      // Load moods for this specific user
      const savedMoods = localStorage.getItem(`mood-tracker-moods-${user.id}`);
      if (savedMoods) {
        setMoods(JSON.parse(savedMoods));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      calculateStreak();
    }
  }, [moods, user]);

  const calculateStreak = () => {
    const userMoods = moods
      .filter((m) => !m.deleted)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    const currentDate = new Date();

    for (let i = 0; i < userMoods.length; i++) {
      const moodDate = new Date(userMoods[i].date);
      const diffDays = Math.floor((currentDate.getTime() - moodDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }

    setCurrentStreak(streak);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("mood-tracker-user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setMoods([]);
    localStorage.removeItem("mood-tracker-user");
  };

  const addMood = (moodData) => {
    if (!user) {
      alert("Please log in first");
      return;
    }

    // Check if mood already exists for this date
    const existingMood = moods.find((m) => m.date === moodData.date && !m.deleted);
    if (existingMood) {
      alert("You've already logged a mood for this date!");
      return;
    }

    const newMood = {
      ...moodData,
      id: `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    const updatedMoods = [...moods, newMood];
    setMoods(updatedMoods);

    // Save to localStorage with user-specific key
    const storageKey = `mood-tracker-moods-${user.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedMoods));

    setShowMoodEntry(false);
  };

  const updateMood = (id, updates) => {
    if (!user) return;

    const updatedMoods = moods.map((mood) => (mood.id === id ? { ...mood, ...updates } : mood));
    setMoods(updatedMoods);
    localStorage.setItem(`mood-tracker-moods-${user.id}`, JSON.stringify(updatedMoods));
  };

  const deleteMood = (id) => {
    updateMood(id, { deleted: true });
  };

  const restoreMood = (id) => {
    updateMood(id, { deleted: false });
  };

  const getTodayMood = () => {
    const today = new Date().toISOString().split("T")[0];
    return moods.find((m) => m.date === today && !m.deleted);
  };

  const getWeeklyMoods = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

    return moods.filter((m) => {
      const moodDate = new Date(m.date);
      return moodDate >= startOfWeek && moodDate <= endOfWeek && !m.deleted;
    });
  };

  const getMostFrequentMood = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentMoods = moods.filter((m) => {
      const moodDate = new Date(m.date);
      return moodDate >= thirtyDaysAgo && !m.deleted;
    });

    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || null;
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                  className="text-white"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mood Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {["dashboard", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            moods={moods}
            todayMood={getTodayMood()}
            weeklyMoods={getWeeklyMoods()}
            monthMood={getMostFrequentMood()}
            currentStreak={currentStreak}
            setShowMoodEntry={setShowMoodEntry}
            refreshData={() => {
              if (!user) return;
              const storageKey = `mood-tracker-moods-${user.id}`;
              const savedMoods = localStorage.getItem(storageKey);
              if (savedMoods) {
                setMoods(JSON.parse(savedMoods));
              }
            }}
          />
        )}

        {activeTab === "history" && (
          <MoodHistory moods={moods} onUpdate={updateMood} onDelete={deleteMood} onRestore={restoreMood} />
        )}
      </main>

      {showMoodEntry && (
        <MoodEntry onSave={addMood} onClose={() => setShowMoodEntry(false)} existingDate={getTodayMood()?.date} />
      )}
      {user && <DebugPanel moods={moods} user={user} />}
      {user && <TestPanel moods={moods} user={user} />}
    </div>
  );
};

export default MoodPage;
