const Dashboard = ({
  moods = [],
  todayMood = null,
  weeklyMoods = [],
  monthMood = "No data available",
  currentStreak = 0,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Mood dashboard summary">
      <div className="p-4 bg-white shadow rounded">
        <h3 className="font-semibold text-lg mb-1">Today's Mood</h3>
        <p>{todayMood ? todayMood.mood : "No mood recorded today"}</p>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="font-semibold text-lg mb-1">Weekly Moods</h3>
        <p>
          {Array.isArray(weeklyMoods) && weeklyMoods.length > 0
            ? `${weeklyMoods.length} entr${weeklyMoods.length === 1 ? "y" : "ies"}`
            : "No entries this week"}
        </p>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="font-semibold text-lg mb-1">Most Frequent Mood (Last 30 Days)</h3>
        <p>{monthMood || "No data available"}</p>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="font-semibold text-lg mb-1">Current Streak</h3>
        <p>{currentStreak > 0 ? `${currentStreak} day${currentStreak > 1 ? "s" : ""}` : "No streak yet"}</p>
      </div>
    </section>
  );
};

export default Dashboard;  