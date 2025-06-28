"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const statuses: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const response = await fetch("/api/upload-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        });

        if (!response.ok) {
          throw new Error(`Failed to get signed URL for ${file.name}`);
        }

        const { url } = await response.json();

        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        statuses.push(`Successfully uploaded ${file.name}`);
      } catch (error) {
        console.error("Error uploading file:", error);
        statuses.push(`Failed to upload ${file.name}`);
      }
    }

    setUploadStatus(statuses);
    setUploading(false);
  };

  return (
    <div>
      <h1>Upload High-Resolution Pictures</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {uploadStatus.length > 0 && (
        <ul>
          {uploadStatus.map((status, index) => (
            <li key={index}>{status}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
