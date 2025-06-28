import React from 'react';

const SubmitButton = ({ isLoading, text, loadingText }) => {
    return (
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none"
                disabled={isLoading}
            >
                {isLoading ? loadingText : text}
            </button>
        </div>
    );
};

export default SubmitButton;