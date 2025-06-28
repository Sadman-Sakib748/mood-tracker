import React, { useState } from 'react';

const TestPanel = ({ moods, user }) => {
    const [showTest, setShowTest] = useState(false);

    if (!showTest) {
        return (
            <div className="fixed bottom-4 left-4">
                <button
                    onClick={() => setShowTest(true)}
                    className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Test Panel
                </button>
            </div>
        );
    }

    const addTestMood = () => {
        const testMoods = ["Happy", "Sad", "Excited", "Calm"];
        const randomMood = testMoods[Math.floor(Math.random() * testMoods.length)];

        const testMoodData = {
            mood: randomMood,
            note: `Test mood added at ${new Date().toLocaleTimeString()}`,
            date: new Date().toISOString().split("T")[0],
            deleted: false,
        };

        // Simulate the same process as the real form
        if (!user) {
            alert("Please log in first");
            return;
        }

        const newMood = {
            ...testMoodData,
            id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        const existingMoods = JSON.parse(localStorage.getItem(`mood-tracker-moods-${user.id}`) || "[]");
        const updatedMoods = [...existingMoods, newMood];

        localStorage.setItem(`mood-tracker-moods-${user.id}`, JSON.stringify(updatedMoods));

        alert(`Test mood "${randomMood}" added successfully!`);
        window.location.reload(); // Force refresh to see changes
    };

    return (
        <div className="fixed bottom-4 left-4 w-64">
            <div className="bg-green-50 rounded-lg shadow-lg border border-green-100">
                <div className="p-4 border-b border-green-100">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Test Panel</h3>
                        <button
                            onClick={() => setShowTest(false)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div className="p-4 space-y-3">
                    <div className="text-xs">
                        <strong>Current Moods:</strong> {moods.length}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={addTestMood}
                            className="w-full px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Add Test Mood
                        </button>

                        <button
                            onClick={() => {
                                if (user) {
                                    localStorage.removeItem(`mood-tracker-moods-${user.id}`);
                                    window.location.reload();
                                }
                            }}
                            className="w-full px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Clear My Moods
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPanel;