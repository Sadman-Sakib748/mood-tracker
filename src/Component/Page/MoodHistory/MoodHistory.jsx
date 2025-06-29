const MoodHistory = ({ moods, onUpdate, onDelete, onRestore }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Mood History</h2>
      <ul className="space-y-2">
        {moods.map((mood) => (
          <li
            key={mood._id} // Use _id as key, typical for MongoDB
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <div>
                <strong>{new Date(mood.date).toLocaleDateString()}</strong> - {mood.mood}
              </div>
              <div className="text-sm text-gray-500">{mood.note}</div>
            </div>
            <div className="flex gap-2">
              {!mood.deleted ? (
                <>
                  <button
                    onClick={() => onUpdate(mood)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mood._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onRestore(mood._id)}
                  className="text-green-600 hover:underline"
                >
                  Restore
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodHistory;
