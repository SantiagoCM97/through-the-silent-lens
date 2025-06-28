import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fileName, fileType, folderName } = await request.json();

    if (!fileName || !fileType || !folderName) {
      return NextResponse.json(
        { error: "Missing fileName, fileType, or folderName" },
        { status: 400 }
      );
    }

    // Construct the full destination path for the object in the bucket.
    const filePath = `${folderName}/${fileName}`;

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });

    const bucketName = process.env.GCP_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("GCP_BUCKET_NAME environment variable not set.");
    }
    const bucket = storage.bucket(bucketName);

    const options = {
      version: "v4" as "v4",
      action: "write" as "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes validity
      contentType: fileType,
    };

    // Use the full filePath (e.g., "landscapes/photo.jpg") to get the signed URL.
    const [url] = await bucket.file(filePath).getSignedUrl(options);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to create signed URL", details: error.message },
      { status: 500 }
    );
  }
}
