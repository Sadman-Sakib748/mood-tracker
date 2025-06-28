import { useEffect, useRef } from "react"

const WeeklyChart = ({ moods }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = 300 * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const width = canvas.offsetWidth;
        const height = 300;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Count moods by type
        const moodCounts = {};
        moods.forEach((mood) => {
            moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
        });

        const moodTypes = Object.keys(moodCounts);
        const maxCount = Math.max(...Object.values(moodCounts), 1);

        if (moodTypes.length === 0) {
            // Draw "No data" message
            ctx.fillStyle = "#6B7280";
            ctx.font = "16px system-ui";
            ctx.textAlign = "center";
            ctx.fillText("No mood data for this week", width / 2, height / 2);
            return;
        }

        // Chart dimensions
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const barWidth = (chartWidth / moodTypes.length) * 0.8;
        const barSpacing = (chartWidth / moodTypes.length) * 0.2;

        // Colors for different moods
        const colors = {
            Happy: "#FCD34D",
            Sad: "#60A5FA",
            Angry: "#F87171",
            Excited: "#A78BFA",
            Anxious: "#FB923C",
            Tired: "#9CA3AF",
            Thoughtful: "#34D399",
            Calm: "#14B8A6",
        };

        // Draw bars
        moodTypes.forEach((mood, index) => {
            const count = moodCounts[mood];
            const barHeight = (count / maxCount) * chartHeight;
            const x = padding + index * (barWidth + barSpacing);
            const y = height - padding - barHeight;

            // Draw bar
            ctx.fillStyle = colors[mood] || "#9CA3AF";
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw count on top of bar
            ctx.fillStyle = "#374151";
            ctx.font = "14px system-ui";
            ctx.textAlign = "center";
            ctx.fillText(count.toString(), x + barWidth / 2, y - 5);

            // Draw mood name at bottom
            ctx.fillStyle = "#6B7280";
            ctx.font = "12px system-ui";
            ctx.textAlign = "center";
            ctx.fillText(mood, x + barWidth / 2, height - padding + 20);
        });

        // Draw y-axis labels
        ctx.fillStyle = "#6B7280";
        ctx.font = "12px system-ui";
        ctx.textAlign = "right";
        for (let i = 0; i <= maxCount; i++) {
            const y = height - padding - (i / maxCount) * chartHeight;
            ctx.fillText(i.toString(), padding - 10, y + 4);
        }
    }, [moods]);

    return (
        <div className="w-full">
            <canvas ref={canvasRef} className="w-full border rounded-lg bg-white" style={{ height: "300px" }} />
        </div>
    );
};

export default WeeklyChart;