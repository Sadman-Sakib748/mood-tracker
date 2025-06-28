const QUICK_MOODS = [
    { emoji: "😊", name: "Happy", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
    { emoji: "😢", name: "Sad", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
    { emoji: "😠", name: "Angry", color: "bg-red-100 hover:bg-red-200 border-red-300" },
    { emoji: "🤩", name: "Excited", color: "bg-purple-100 hover:bg-purple-200 border-purple-300" },
    { emoji: "😰", name: "Anxious", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
    { emoji: "😴", name: "Tired", color: "bg-gray-100 hover:bg-gray-200 border-gray-300" },
    { emoji: "🤔", name: "Thoughtful", color: "bg-green-100 hover:bg-green-200 border-green-300" },
    { emoji: "😌", name: "Calm", color: "bg-teal-100 hover:bg-teal-200 border-teal-300" },
];

const QuickMoodSelector = ({ onMoodSelect, disabled }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
                <div className="flex items-center gap-2 pb-4">
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
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <h2 className="text-xl font-bold">Quick Mood Log</h2>
                </div>
                <p className="text-gray-600 pb-6">Click any mood to log it instantly for today</p>

                <div className="grid grid-cols-4 gap-3">
                    {QUICK_MOODS.map((mood) => (
                        <button
                            key={mood.name}
                            onClick={() => onMoodSelect(mood.name)}
                            disabled={disabled}
                            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${mood.color}`}
                        >
                            <div className="text-2xl mb-1">{mood.emoji}</div>
                            <div className="text-xs font-medium">{mood.name}</div>
                        </button>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">One click = instant mood log!</p>
                </div>
            </div>
        </div>
    );
};

export default QuickMoodSelector;