import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";  // <-- Import useNavigate

const API_BASE = "http://localhost:5000/api";

const WeeklyChart = ({ userId }) => {
  const canvasRef = useRef(null);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // <-- Initialize navigate hook

  useEffect(() => {
    const fetchWeeklyMoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/moods?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch moods");
        const data = await response.json();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentMoods = data.filter(
          (mood) => new Date(mood.date) >= sevenDaysAgo && !mood.deleted
        );
        setMoods(recentMoods);
      } catch (err) {
        setError(err.message || "Error fetching moods");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWeeklyMoods();
  }, [userId]);

  useEffect(() => {
    if (loading || error) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Mood counts
    const moodCounts = {};
    moods.forEach((mood) => {
      moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
    });

    const moodTypes = Object.keys(moodCounts);
    const maxCount = Math.max(...Object.values(moodCounts), 1);

    if (moodTypes.length === 0) {
      ctx.fillStyle = "#6B7280";
      ctx.font = "18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("No mood data this week", width / 2, height / 2);
      return;
    }

    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = (chartWidth / moodTypes.length) * 0.7;
    const barSpacing = (chartWidth / moodTypes.length) * 0.3;

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

    // Draw grid lines and labels for y axis (count)
    ctx.strokeStyle = "#E5E7EB"; // Tailwind gray-200
    ctx.lineWidth = 1;
    ctx.font = "12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.fillStyle = "#6B7280"; // gray-500
    ctx.textAlign = "right";

    for (let i = 0; i <= maxCount; i++) {
      const y = height - padding - (i / maxCount) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding + 10, y);
      ctx.stroke();
      ctx.fillText(i.toString(), padding - 10, y + 4);
    }

    // Draw bars
    moodTypes.forEach((mood, i) => {
      const count = moodCounts[mood];
      const barHeight = (count / maxCount) * chartHeight;
      const x = padding + i * (barWidth + barSpacing);
      const y = height - padding - barHeight;

      // Bar shadow for depth
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 3;

      ctx.fillStyle = colors[mood] || "#9CA3AF";
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.shadowColor = "transparent"; // reset shadow

      // Count label above bar
      ctx.fillStyle = "#111827"; // gray-900
      ctx.font = "bold 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(count.toString(), x + barWidth / 2, y - 8);

      // Mood label below bar
      ctx.fillStyle = "#6B7280"; // gray-500
      ctx.font = "14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      ctx.fillText(mood, x + barWidth / 2, height - padding + 28);
    });

    // Chart title
    ctx.fillStyle = "#374151"; // gray-700
    ctx.font = "bold 18px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Weekly Mood Distribution", width / 2, 30);
  }, [moods, loading, error]);

  if (loading) return <div className="p-4 text-center text-gray-600">Loading chart data...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Go Home
      </button>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: "300px" }}
      />
    </div>
  );
};

export default WeeklyChart;
