import { useState } from 'react';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import ImageViewer from './components/ImageViewer';
import { Stethoscope } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(imageUrl);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* up the remaining space after the sidebar. */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Stethoscope className="h-8 w-8 text-blue-500" />
                <h1 className="ml-3 text-2xl font-bold text-gray-900">MedImage Analysis</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Save Analysis
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {!selectedFile ? (
            <div className="max-w-3xl mx-auto mt-20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Welcome to MedImage Analysis</h2>
                <p className="mt-2 text-gray-600">
                  Upload your medical images to begin analysis and annotation
                </p>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          ) : (
            <div className="h-[calc(100vh-12rem)]">
              <ImageViewer imageUrl={selectedFile} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;