import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js registration
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({
  moods = [],
  todayMood = null,
  weeklyMoods = [],
  monthMood = "No data available",
  currentStreak = 0,
}) => {
  // Count moods for the week
  const moodCounts = weeklyMoods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  const moodTypes = Object.keys(moodCounts);
  const counts = Object.values(moodCounts);

  const colors = {
    Happy: "#FACC15",
    Sad: "#60A5FA",
    Angry: "#F87171",
    Excited: "#A78BFA",
    Anxious: "#FB923C",
    Tired: "#9CA3AF",
    Thoughtful: "#34D399",
    Calm: "#14B8A6",
  };

  const chartData = {
    labels: moodTypes,
    datasets: [
      {
        label: "Mood Count",
        data: counts,
        backgroundColor: moodTypes.map((mood) => colors[mood] || "#9CA3AF"),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <section className="space-y-6" aria-label="Mood dashboard summary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-semibold text-lg mb-1">Today's Mood</h3>
          <p>{todayMood ? todayMood.mood : "No mood recorded today"}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-semibold text-lg mb-1">Current Streak</h3>
          <p>
            {currentStreak > 0
              ? `${currentStreak} day${currentStreak > 1 ? "s" : ""}`
              : "No streak yet"}
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded md:col-span-2">
          <h3 className="font-semibold text-lg mb-1">Most Frequent Mood (Last 30 Days)</h3>
          <p>{monthMood || "No data available"}</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="p-4 bg-white shadow rounded">
        <h3 className="font-semibold text-lg mb-4 text-center">
          Weekly Mood Summary (Mon–Sun)
        </h3>
        {moodTypes.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-400">No mood data this week.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
