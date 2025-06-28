"use client";

import { useState, useCallback, FC, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  File as FileIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Folder,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types & Constants ---
const FOLDER_CATEGORIES = ["animals", "lifestyle", "people", "landscapes"];

interface UploadedFile {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  errorMessage?: string;
  id: string;
}

// --- React Frontend Component ---

const FileStatus: FC<{
  uploadedFile: UploadedFile;
  onRemove: (id: string) => void;
}> = ({ uploadedFile, onRemove }) => {
  const isActionable =
    uploadedFile.status === "pending" || uploadedFile.status === "error";

  return (
    <li className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex-shrink-0">
        {uploadedFile.status === "success" ? (
          <CheckCircle2 className="h-6 w-6 text-green-400" />
        ) : uploadedFile.status === "error" ? (
          <AlertCircle className="h-6 w-6 text-red-400" />
        ) : (
          <FileIcon className="h-6 w-6 text-gray-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-200 truncate">
          {uploadedFile.file.name}
        </p>
        <div className="text-xs text-gray-400">
          {uploadedFile.status === "error" ? (
            <span className="text-red-400">{uploadedFile.errorMessage}</span>
          ) : (
            `${(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB`
          )}
        </div>
        {uploadedFile.status === "uploading" && (
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
            <div
              className="bg-teal-500 h-1.5 rounded-full"
              style={{ width: `${uploadedFile.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      {isActionable && (
        <button
          onClick={() => onRemove(uploadedFile.id)}
          className="p-1 rounded-full text-gray-500 hover:bg-gray-700 hover:text-gray-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </li>
  );
};

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); // Redirect to login page after logout
  };

  const removeFile = (id: string) => {
    if (isUploading) return;
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const uploadFile = async (fileToUpload: UploadedFile) => {
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileToUpload.id ? { ...f, status: "uploading" } : f
      )
    );
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: fileToUpload.file.name,
          fileType: fileToUpload.file.type,
          folderName: selectedFolder,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to get signed URL.");
      }
      const { url } = await res.json();
      if (!url)
        throw new Error("The signed URL was not returned from the API.");

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", fileToUpload.file.type);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === fileToUpload.id
                  ? { ...f, progress: percentComplete }
                  : f
              )
            );
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === fileToUpload.id
                  ? { ...f, status: "success", progress: 100 }
                  : f
              )
            );
            resolve();
          } else {
            reject(new Error(`Upload failed (Status: ${xhr.status})`));
          }
        };
        xhr.onerror = () =>
          reject(
            new Error("Network error. Check CORS settings on your bucket.")
          );
        xhr.send(fileToUpload.file);
      });
    } catch (error: any) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileToUpload.id
            ? { ...f, status: "error", errorMessage: error.message }
            : f
        )
      );
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const filesToUpload = uploadedFiles.filter((uf) => uf.status === "pending");
    const uploadPromises = filesToUpload.map((file) => uploadFile(file));
    await Promise.all(uploadPromises);
    setIsUploading(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      status: "pending",
      progress: 0,
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading || !selectedFolder,
    accept: { "image/*": [".jpeg", ".png", ".gif", ".webp", ".jpg"] },
  });

  const pendingFilesCount = uploadedFiles.filter(
    (f) => f.status === "pending"
  ).length;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="relative text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
          Upload Photos
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Add new images to the collection.
        </p>
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 flex items-center space-x-2 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <label
            htmlFor="folder-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            1. Choose a Destination Folder
          </label>
          <div className="relative">
            <Folder className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <select
              id="folder-select"
              value={selectedFolder}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedFolder(e.target.value)
              }
              disabled={isUploading}
              className="block w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-white transition"
            >
              <option value="" disabled>
                Select a category...
              </option>
              {FOLDER_CATEGORIES.map((folder) => (
                <option key={folder} value={folder} className="capitalize">
                  {folder.charAt(0).toUpperCase() + folder.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-300
                    ${!selectedFolder ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      isDragActive
                        ? "border-teal-500 bg-gray-800/60"
                        : "border-gray-600 hover:border-teal-600"
                    }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
            <UploadCloud className="w-16 h-16" />
            {!selectedFolder ? (
              <p className="text-lg font-semibold text-gray-500">
                Please select a folder first
              </p>
            ) : isDragActive ? (
              <p className="text-lg font-semibold text-teal-400">
                Drop the files here...
              </p>
            ) : (
              <div>
                <p className="text-lg font-semibold text-gray-300">
                  2. Drag & drop photos, or click to select
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports high-resolution JPEG, PNG, GIF, WEBP
                </p>
              </div>
            )}
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-10">
            <ul className="space-y-3">
              {uploadedFiles.map((uf) => (
                <FileStatus
                  key={uf.id}
                  uploadedFile={uf}
                  onRemove={removeFile}
                />
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={
                  isUploading || pendingFilesCount === 0 || !selectedFolder
                }
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300"
              >
                {isUploading
                  ? "Uploading..."
                  : `Upload ${pendingFilesCount} File${
                      pendingFilesCount === 1 ? "" : "s"
                    }`}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
// This code is a complete React component for an upload page that allows users to select a folder, drag and drop files, and upload them to a server. It includes error handling, progress tracking, and a logout button.
// The component uses the `useDropzone` hook for drag-and-drop functionality and manages the state of uploaded files, including their status and progress. It also provides a user-friendly interface with icons and feedback messages.
