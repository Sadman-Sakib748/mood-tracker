import { useState, useEffect, useCallback } from "react";
import { format, subDays, isSameDay, isAfter } from "date-fns";
import * as api from "../API/Api";
import Dashboard from "../Dashboard/Dashboard";
import MoodHistory from "../MoodHistory/MoodHistory";
import {  toast } from "react-hot-toast";
import DebugPanel from "../DebugPanel/DebugPanel";
import TestPanel from "../TestPanel/TestPanel";
import { Link } from "react-router"; // or 'react-router-dom' if using react-router-dom

const user = {
  id: "01703174167",
  name: "Sadman Sakib",
};

const MoodPage = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoods = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const today = format(new Date(), "yyyy-MM-dd");
  const todayMood = moods.find((m) => m.date === today && !m.deleted);
  const weeklyMoods = moods.filter(
    (m) => !m.deleted && isAfter(new Date(m.date), subDays(new Date(), 7))
  );
  const monthMood = calculateMonthMood(moods);
  const currentStreak = calculateCurrentStreak(moods);

  const handleDeleteMood = async (id) => {
    try {
      await api.deleteMood(id);
      toast.success("Mood deleted!");
      await fetchMoods();
    } catch (err) {
      toast.error("Failed to delete mood.");
    }
  };

  const handleRestoreMood = async (id) => {
    try {
      await api.restoreMood(id);
      toast.success("Mood restored!");
      await fetchMoods();
    } catch (err) {
      toast.error("Failed to restore mood.");
    }
  };

  function calculateMonthMood(moods) {
    const last30Days = subDays(new Date(), 30);
    const recentMoods = moods.filter(
      (m) => !m.deleted && new Date(m.date) >= last30Days
    );

    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No data";
  }

  function calculateCurrentStreak(moods) {
    const sortedMoods = moods
      .filter((m) => !m.deleted)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedMoods.length === 0) return 0;

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
      } else {
        break;
      }
    }

    return streak;
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Mood Tracker</h1>
          <Link to={`/chart`}>
            <button
              onClick={() => toast("Navigating to Dashboard...")}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
            >
              Dashboard
            </button>
          </Link>
        </header>

        <Dashboard
          moods={moods}
          todayMood={todayMood}
          weeklyMoods={weeklyMoods}
          monthMood={monthMood}
          currentStreak={currentStreak}
        />

        <MoodHistory
          moods={moods}
          onUpdate={() => {}}
          onDelete={handleDeleteMood}
          onRestore={handleRestoreMood}
        />
      </div>

      {/* DebugPanel will clear mood state via setMoods */}
      <DebugPanel
        moods={moods}
        user={user}
        onClear={(cleared) => setMoods(cleared)}
      />

      {/* TestPanel will refresh moods after add/clear */}
      <TestPanel
        moods={moods}
        user={user}
        onAdd={fetchMoods}
        onClear={fetchMoods}
      />
    </div>
  );
};

export default MoodPage;
