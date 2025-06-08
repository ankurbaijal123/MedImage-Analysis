import React from "react";
import { FileText} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gray-900 h-screen flex flex-col items-center py-6">
      <div className="flex-1 flex flex-col space-y-4">
        <button className="p-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
          <FileText className="w-6 h-6" />
        </button>
      
      </div>
      
    </div>
  );
};

export default Sidebar;
