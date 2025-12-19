import React from 'react';

// Props interface for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * Reusable Modal component for dialogs and forms
 * Provides overlay and centered content with close functionality
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
