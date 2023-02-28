import React from "react";

function SongModal({ showModal, toggleModal, url }) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 opacity-20"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <h2 className="text-2xl font-bold mb-4">{url}</h2>
        <h2 className="text-2xl font-bold mb-4">{url}</h2>
        <h2 className="text-2xl font-bold mb-4">{url}</h2>
        <button
          onClick={() => toggleModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SongModal;
