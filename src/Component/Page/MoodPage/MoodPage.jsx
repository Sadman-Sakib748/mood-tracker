import { useState, useEffect, useCallback } from "react";
import { format, subDays, isSameDay, isAfter } from "date-fns";
import * as api from "../Api/Api";
import Dashboard from "../Dashboard/Dashboard";
import MoodHistory from "../MoodHistory/MoodHistory";
import PostMoodForm from "../PostMoodForm/PostMoodForm";
import { toast } from "react-hot-toast";
import DebugPanel from "../DebugPanel/DebugPanel";
import TestPanel from "../TestPanel/TestPanel";
import { Link } from "react-router"; 
import AuthForm from "../../Authentication/AuthForm/AuthForm";
import Update from "../Update/Update";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const MoodPage = () => {
  const [user, setUser] = useState(null);
  const [moods, setMoods] = useState([]);
  const [editingMood, setEditingMood] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("mood-tracker-loggedin-user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchMoods = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await api.fetchMoods(user.id);
      setMoods(data);
      setError(null);
    } catch (err) {
      setError("Failed to load moods. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const handleDeleteMood = async (_id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/moods/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete mood");
      toast.success("Mood deleted!");
      await fetchMoods();
    } catch (error) {
      toast.error(error.message || "Failed to delete mood");
    }
  };

  const handleRestoreMood = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/moods/${id}/restore`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to restore mood");
      toast.success("Mood restored!");
      await fetchMoods();
    } catch (error) {
      toast.error(error.message || "Failed to restore mood");
    }
  };

  const calculateMonthMood = (moods) => {
    const last30Days = subDays(new Date(), 30);
    const recentMoods = moods.filter((m) => !m.deleted && new Date(m.date) >= last30Days);
    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No data";
  };

  const calculateCurrentStreak = (moods) => {
    const sortedMoods = moods.filter((m) => !m.deleted).sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!sortedMoods.length) return 0;
    let streak = 0;
    let currentDate = new Date();

    if (isSameDay(new Date(sortedMoods[0].date), currentDate)) {
      streak = 1;
      currentDate = subDays(currentDate, 1);
    }

    for (let i = 1; i < sortedMoods.length; i++) {
      if (isSameDay(new Date(sortedMoods[i].date), currentDate)) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else break;
    }

    return streak;
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const todayMood = moods.find((m) => m.date === today && !m.deleted);
  const weeklyMoods = moods.filter((m) => !m.deleted && isAfter(new Date(m.date), subDays(new Date(), 7)));
  const monthMood = calculateMonthMood(moods);
  const currentStreak = calculateCurrentStreak(moods);

  if (!user) {
    return (
      <AuthForm
        onLogin={(user) => {
          localStorage.setItem("mood-tracker-loggedin-user", JSON.stringify(user));
          setUser(user);
        }}
      />
    );
  }

  if (loading) return <div className="p-8 text-center text-indigo-600"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center gap-4 flex-wrap">
          <h1 className="text-3xl font-bold text-indigo-700">Mood Tracker</h1>

          <div className="flex gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("mood-tracker-loggedin-user");
                setUser(null);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <PostMoodForm userId={user.id} onMoodAdded={fetchMoods} />

        {editingMood && (
          <Update
            editingMood={editingMood}
            onUpdateSuccess={() => {
              setEditingMood(null);
              fetchMoods();
            }}
            onCancel={() => setEditingMood(null)}
          />
        )}

        <Dashboard
          moods={moods}
          todayMood={todayMood}
          weeklyMoods={weeklyMoods}
          monthMood={monthMood}
          currentStreak={currentStreak}
        />

        <MoodHistory
          moods={moods}
          onDelete={handleDeleteMood}
          onRestore={handleRestoreMood}
          onEdit={(mood) => setEditingMood(mood)} 
        />
      </div>

      <DebugPanel moods={moods} user={user} onClear={(cleared) => setMoods(cleared)} />
      <TestPanel moods={moods} user={user} onAdd={fetchMoods} onClear={fetchMoods} />
    </div>
  );
};

export default MoodPage;
