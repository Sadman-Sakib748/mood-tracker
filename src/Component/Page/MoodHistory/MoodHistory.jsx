import { useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const MoodHistory = ({ moods, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMoodId, setSelectedMoodId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedMoodId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedMoodId(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (selectedMoodId) {
      onDelete(selectedMoodId);
      closeDeleteModal();
    }
  };

  if (!moods.length)
    return (
      <p className="text-center text-gray-500 mt-8">
        <LoadingSpinner />
      </p>
    );

  return (
    <>
      <section className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b pb-2">
          Mood History
        </h2>
        <ul className="divide-y divide-gray-200">
          {moods.map((mood) => (
            <li
              key={mood._id}
              className="flex justify-between items-center py-4 hover:bg-indigo-50 rounded px-2 transition"
            >
              <div>
                <p className="text-lg font-semibold text-indigo-900">
                  {mood.mood}{" "}
                  <span className="text-gray-500 text-sm font-normal">
                    on {new Date(mood.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-700 mt-1">{mood.note || "No note"}</p>
                {mood.deleted && (
                  <p className="text-red-500 text-sm italic mt-1">
                    Marked as deleted
                  </p>
                )}
              </div>

              <div className="space-x-4 flex items-center">
                <Link to={`/update/${mood._id}`}>
                  <button
                    onClick={() => onEdit(mood)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                  >
                    Edit
                  </button>
                </Link>

                {!mood.deleted && (
                  <button
                    onClick={() => openDeleteModal(mood._id)}
                    className="text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this mood entry? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodHistory;
