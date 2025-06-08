import React, { useCallback } from 'react'; // Import React and the useCallback hook
import { useDropzone } from 'react-dropzone'; // Import the useDropzone hook for drag-and-drop file handling function
import { Upload } from 'lucide-react'; // Import the Upload icon from the lucide-react library

// Define the type for the props of the FileUpload component
interface FileUploadProps {
  onFileSelect: (file: File) => void; // Function to handle the selected file
}

// Create the FileUpload component
const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  //Defines the FileUpload component as a React Functional Component (React.FC).
  // Define the function to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // If there is at least one file dropped
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]); // Pass the first file to the onFileSelect function
    }
  }, [onFileSelect]); // Recreate this function only when onFileSelect changes

  // Set up the dropzone using the useDropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Call the onDrop function when files are dropped
    accept: {
      // Accept only certain file types
      'image/*': ['.png', '.jpg', '.jpeg', '.dcm'], // Images and DICOM files
    },
    multiple: false, // Allow only one file to be selected at a time
  });

  // Return the file upload UI
  return (
    <div
      // Spread the root props to the container div
      {...getRootProps()}
      // Apply styling based on drag state
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      {/* Spread the input props to the hidden file input element */}
      <input {...getInputProps()} />
      {/* Display the upload icon */}
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      {/* Display the message based on drag state */}
      <p className="text-lg text-gray-600">
        {isDragActive ? (
          'Drop the file here' // Message when dragging over the dropzone
        ) : (
          'Drag & drop a medical image here, or click to select' // Default message
        )}
      </p>
      {/* Display the supported file formats */}
      <p className="text-sm text-gray-500 mt-2">
        Supports PNG, JPEG, and DICOM formats
      </p>
    </div>
  );
};

// Export the FileUpload component for use in other parts of the app
export default FileUpload;
