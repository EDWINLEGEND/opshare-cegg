import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  isSuccess = false,
  isError = false,
  successMessage = "Successfully deleted!",
  errorMessage = "An error occurred."
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="flex items-center mb-6 bg-green-50 p-4 rounded-lg text-green-700">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{successMessage}</p>
            </div>
          ) : isError ? (
            <div className="flex items-center mb-6 bg-red-50 p-4 rounded-lg text-red-700">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          ) : (
            <p className="text-gray-700 mb-6">{message}</p>
          )}
          
          <div className="flex justify-end gap-3">
            {!isSuccess && (
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                {cancelLabel}
              </button>
            )}
            
            <button
              onClick={isSuccess ? onCancel : onConfirm}
              className={`px-4 py-2 ${
                isSuccess 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-red-600 hover:bg-red-700"
              } text-white rounded-lg font-medium flex items-center justify-center min-w-[80px]`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isSuccess ? (
                "Close"
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
