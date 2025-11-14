import React, { useState, ChangeEvent, forwardRef, useImperativeHandle } from "react";
import { Upload as UploadIcon, FileText } from "lucide-react";
import axios from "axios";

type UploadedFile = {
  name: string;
  size: string;
  status: "Ready" | "Processing" | "Uploaded" | "Failed";
};

export type UploadRef = {
  handleUpload: () => Promise<void>;
};

const Upload = forwardRef<UploadRef>((_, ref) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Unsupported file type. Only PDF, JPG, PNG are allowed.");
        return;
      }

      setSelectedFile(file);
      setUploadedFiles([
        {
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          status: "Ready",
        },
      ]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index));
    if (selectedFile && uploadedFiles[index].name === selectedFile.name) {
      setSelectedFile(null);
    }
  };

  const getStatusBadge = (status: UploadedFile["status"]) => {
    const statusStyles: Record<UploadedFile["status"], string> = {
      Ready: "bg-green-100 text-green-800",
      Processing: "bg-blue-100 text-blue-800",
      Uploaded: "bg-purple-100 text-purple-800",
      Failed: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.name === selectedFile.name ? { ...f, status: "Processing" } : f
      )
    );

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://65.1.184.12:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server Response:", res.data);

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === selectedFile.name ? { ...f, status: "Uploaded" } : f
        )
      );
      alert("✅ File uploaded successfully!");
    } catch (err: any) {
      console.error("❌ Upload error:", err.response?.data || err.message);

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === selectedFile.name ? { ...f, status: "Failed" } : f
        )
      );
      alert(`❌ Upload failed: ${err.response?.data?.error || err.message}`);
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  return (
    <div className="min-h-screen p-4 bg-gray-50 space-y-6">
      

      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Upload Area */}
        <div className="lg:flex-2 w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex flex-col items-center lg:items-start space-y-4 flex-1">
                <UploadIcon className="w-16 h-16 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 text-center lg:text-left">
                  Drag & drop your bank statements here
                </h3>
                <p className="text-gray-600 text-center lg:text-left">
                  Supported: PDF, Excel (.xlsx), Images (.jpg, .png)
                </p>
              </div>

              {/* Buttons on right */}
              <div className="flex flex-col space-y-2">
                <div className="relative w-full">
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileUpload"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium block text-center"
                  >
                    Choose File
                  </label>
                </div>
                <button
                  onClick={handleUpload}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium block"
                >
                  Upload File
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              All files are encrypted and deleted after 24 hours.
            </div>

            {/* File List */}
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">• {file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(file.status)}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Upload;
